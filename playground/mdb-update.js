const { MongoClient, ObjectId } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);

const dbName = "TodoApi";

async function main() {
  await client.connect();
  console.log("Connected successfully");
  const db = client.db(dbName);
  // const todos = await db.collection("Todos").countDocuments();

  // const res = await db.collection("Todos").findOneAndUpdate(
  //   { _id: new ObjectId("64fdc96d0f00d7d17f49b42e") },
  //   {
  //     $set: {
  //       completed: true,
  //     },
  //   },
  //   { returnDocument: "after" }
  // );
  const res = await db.collection("Users").findOneAndUpdate(
    { _id: new ObjectId("64fe031d0f00d7d17f49b443") },
    {
      $set: {
        name: "Vitalie",
      },
      $inc: {
        age: 1,
      },
    },
    { returnDocument: "after" }
  );

  console.log(res);
  return console.log("done.");
}

main()
  .then(console.log())
  .catch((error) => console.log(error))
  .finally(() => client.close());
