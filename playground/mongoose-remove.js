const { ObjectId } = require("mongodb");
const { mongooseConnect } = require("../server/db/mongoose");
const { Todo } = require("../server/models/todo");
const { User } = require("../server/models/user");

mongooseConnect();

Todo.deleteMany().then((result) => {
  console.log(result);
});
Todo.findByIdAndRemove({ _id: "6505597e77220806919a7cc4" }).then((todo) => {});
