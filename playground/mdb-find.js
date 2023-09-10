const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);

const dbName = "TodoApi";

async function main() {
  await client.connect();
  console.log("Connected successfully");
  const db = client.db(dbName);
  // const todos = await db.collection("Todos").countDocuments();
  const users = await db
    .collection("Users")
    .find({ name: "Vitalie" })
    .toArray();

  console.log(users);
  return console.log("done.");
}

main()
  .then(console.log())
  .catch((error) => console.log(error))
  .finally(() => client.close());
