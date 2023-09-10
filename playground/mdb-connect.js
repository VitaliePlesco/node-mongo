const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);

const dbName = "TodoApi";

async function main() {
  await client.connect();
  console.log("Connected successfully");
  const db = client.db(dbName);
  const todos = db.collection("Todos");
  // const res = await todos.insertOne({
  //   text: "Something to do",
  //   completed: false,
  // });
  // console.log(`a document was inserted with the _id: ${res.insertedId}`);

  const users = db.collection("Users");
  const res2 = await users.insertOne({
    name: "Vitalie",
    age: 38,
    location: "Rezina",
  });
  console.log(
    `a document was inserted with the _id: ${res2.insertedId.getTimestamp()}`
  );

  return console.log("done.");
}

main()
  .then(console.log())
  .catch((error) => console.log(error))
  .finally(() => client.close());
