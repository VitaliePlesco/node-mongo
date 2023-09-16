const mongoose = require("mongoose");

async function mongooseConnect() {
  await mongoose.connect("mongodb://127.0.0.1:27017/TodoApp");
  // await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to mdb");
}
module.exports.mongooseConnect = mongooseConnect;
