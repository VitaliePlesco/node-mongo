const { ObjectId } = require("mongodb");
const { mongooseConnect } = require("./../server/db/mongoose");
const { Todo } = require("./../server/models/todo");
const { User } = require("./../server/models/user");

mongooseConnect();
// const id = "65033c6b4bc22c0a00f5b2b5";

// if (!ObjectId.isValid(id)) {
//   console.log("ID not valid");
// }

// Todo.findById(id)
//   .then((todo) => {
//     if (!todo) {
//       return console.log("Id not found");
//     }
//     console.log("Todo", todo);
//   })
//   .catch((error) => console.log(error));

const userId = "650351689ff821865af82409";

User.findById(userId)
  .then((user) => {
    if (!user) {
      return console.log("User not found");
    }
    console.log("User: ", user);
  })
  .catch((error) => console.log(error));
