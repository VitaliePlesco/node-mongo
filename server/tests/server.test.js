const expect = require("expect");
const request = require("supertest");

const { app } = require("./../server");
const { Todo } = require("./../models/todo");
const { ObjectId } = require("mongodb");

const todos = [
  {
    _id: new ObjectId(),
    text: "First test todo",
  },
  {
    _id: new ObjectId(),
    text: "Second test todo",
    completed: true,
    completedAt: 333,
  },
];

beforeEach((done) => {
  Todo.deleteMany()
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe("POST /todos", () => {
  it("should create a new todo", (done) => {
    let text = "Test todo text";

    request(app)
      .post("/todos")
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        Todo.find({ text })
          .then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch((e) => done(e));
      });
  });
  it("should not create todo with invalid body data", (done) => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        Todo.find()
          .then((todos) => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch((e) => done(e));
      });
  });
});
describe("GET /todos", () => {
  it("should get all todos", (done) => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect((res) => {
        expect(res.body.length).toBe(2);
      })
      .end(done);
  });
});
describe("Get /todos/:id", () => {
  it("should return todo doc", (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });
  it("should return 404 if todo not found", (done) => {
    const hexId = new ObjectId().toHexString();
    request(app).get(`/todos/${hexId}`).expect(404).end(done);
  });
  it("should return 404 for non-object ids", (done) => {
    request(app).get(`/todos/123abc`).expect(404).end(done);
  });
});
describe("Delete /todos/:id", () => {
  it("should remove a todo", (done) => {
    const hexId = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        Todo.findById(hexId)
          .then((todo) => {
            expect(todo).toBeFalsy();
            done();
          })
          .catch((error) => {
            done(error);
          });
      });
  });
  it("should return 404 if todo not found", (done) => {
    const hexId = new ObjectId().toHexString();
    request(app).delete(`/todos/${hexId}`).expect(404).end(done);
  });
  it("should return 404 if object id is invalid", (done) => {
    request(app).delete(`/todos/ab45621`).expect(404).end(done);
  });
});
describe("PATCH /todos/:id", () => {
  it("should update the todo", (done) => {
    const hexId = todos[0]._id.toHexString();
    const text = "This should be the new text";

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA("number");
      })
      .end(done);
  });
  it("should clear completedAt when todo is not completed", (done) => {
    const hexId = todos[1]._id.toHexString();
    const text = "This should be another text";

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});
