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

  // todo.save().then(
  //   (doc) => {
  //     res.send(doc);
  //   },
  //   (e) => {
  //     res.status(400).send(e);
  //   }
  // );
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

app.listen(port, () => {
  console.log("Started on port 3000");
});

module.exports = { app };
