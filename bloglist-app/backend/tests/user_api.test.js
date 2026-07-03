const { test, beforeEach, after, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const helper = require("./test_helper");
const User = require("../models/user");

const api = supertest(app);

describe("when there are initially some users saved", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const saltRounds = 10;
    const users = [];

    for (const { username, name, password } of helper.initialUsers) {
      const passwordHash = await bcrypt.hash(password, saltRounds);

      users.push({
        username,
        name,
        passwordHash,
      });
    }

    await User.insertMany(users);
  });

  test("a valid user is created successfully", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "cena",
      name: "John Cena",
      password: "cena12345",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    const usernames = usersAtEnd.map((user) => user.username);

    assert(usernames.includes(newUser.username));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);
  });

  test("creation fails if password is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "cena",
      name: "John Cena",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(response.body.error, "password required");
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails if password is shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "cena",
      name: "John Cena",
      password: "ce",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();

    assert.strictEqual(
      response.body.error,
      "password must be at least 3 characters",
    );
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails if username is missing", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: "John Cena",
      password: "cena12345",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();

    assert.ok(
      response.body.error.includes(
        "User validation failed: username: Path `username` is required.",
      ),
    );
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails if username is shorter than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ce",
      name: "John Cena",
      password: "cena12345",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();

    assert.ok(
      response.body.error.includes(
        "User validation failed: username: Path `username`",
        "is shorter than the minimum allowed length",
      ),
    );
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });

  test("creation fails if username already exists", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "orton",
      name: "Randy Orton",
      password: "orton12345",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();

    assert.ok(response.body.error.includes("expected `username` to be unique"));
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  mongoose.connection.close();
});
