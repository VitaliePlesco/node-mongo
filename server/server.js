const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
require("dotenv").config();

const { mongooseConnect } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");
const { ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;
mongooseConnect();
app.use(bodyParser.json());

app.post("/todos", (req, res) => {
  let todo = new Todo({
    text: req.body.text,
  });

  const saveTodo = async () => {
    try {
      const result = await todo.save();
      res.send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  saveTodo();
});

app.get("/todos", (req, res) => {
  const findTodos = async () => {
    try {
      const result = await Todo.find();
      res.send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  findTodos();
});

app.get("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch((error) => {
      res.status(404).send();
    });
});
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findByIdAndDelete(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch((error) => {
      res.status(404).send();
    });
});
app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ["text", "completed"]);
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Started on port${port}`);
});

module.exports = { app };
