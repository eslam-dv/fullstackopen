import { test, after, beforeEach, describe } from "node:test";
import assert from "node:test";
import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";
import UserModel from "../models/user.js";

const api = supertest(app);

beforeEach(async () => {
  await UserModel.deleteMany({});

  const user = new UserModel({
    username: "test",
    password: "test",
    name: "Test User",
  });
  await user.save();
});

describe("creating a new user", () => {
  test("returns and error and statuscode 400 if username or password is missing", async () => {
    const user = {
      username: "fawzy",
      name: "invalid user",
    };

    await api
      .post("/api/users")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .expect({ error: "username and password are required" });
  });
});

after(async () => {
  await mongoose.connection.close();
});
