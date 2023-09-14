const express = require("express");
const bodyParser = require("body-parser");

const { mongooseConnect } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

const app = express();
const port = 3000;
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
  console.log(req.body);
});

app.get("/todos", (req, res) => {
  // Todo.find({}).then(
  //   (todos) => {
  //     res.send({ todos });
  //   },
  //   (error) => {
  //     res.status(400).send(error);
  //   }
  // );
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

app.listen(port, () => {
  console.log("Started on port 3000");
});

module.exports = { app };
