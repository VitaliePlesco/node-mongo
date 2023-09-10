const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);

const dbName = "TodoApi";

async function main() {
  await client.connect();
  console.log("Connected successfully");
  const db = client.db(dbName);
  // const todos = await db.collection("Todos").countDocuments();
  const res = await db
    .collection("Users")
    .findOneAndDelete({ _id: new ObjectId("64fdfb7f9e23edaddad762f6") });
  // const res = await db.collection("Todos").deleteOne({ text: "Eat lunch" });
  // const res = await db
  //   .collection("Todos")
  //   .findOneAndDelete({ completed: false });

  console.log(res);
  return console.log("done.");
}

main()
  .then(console.log())
  .catch((error) => console.log(error))
  .finally(() => client.close());
