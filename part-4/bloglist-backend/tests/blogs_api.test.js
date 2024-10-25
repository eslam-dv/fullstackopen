import { test, after, beforeEach, describe } from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";
import BlogModel from "../models/blog.js";
import { blogsInDb, initialBlogs } from "./test_helpers.js";

const api = supertest(app);

// for user test
const token_1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTE5ZjE0NDBmZDg4NjFjMWY1NzE4MiIsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTcyNjA2MjM2MiwiZXhwIjoxNzI2NjY3MTYyfQ.R-JZ5bQUfdlJI2ZN9gh1BVoCu6UZ3KWIi6QYdT1xCzY";
// for user test-2
const token_2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTFhMmIzOGRjYTg1YmU1ZTMwYWZjMiIsInVzZXJuYW1lIjoidGVzdC0yIiwiaWF0IjoxNzI2MDYzMjkzLCJleHAiOjE3MjY2NjgwOTN9.2lVENChEYJWEeI_UF0_d7fZNfHuHssAErmGC211Opns";

beforeEach(async () => {
  await BlogModel.deleteMany({});

  for (const blog of initialBlogs) {
    const blogObject = new BlogModel(blog);
    await blogObject.save();
  }
});

describe("when there are initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("correct number of blogs is returned", async () => {
    const response = await api.get("/api/blogs");
    assert(response.body.length, initialBlogs.length);
  });
  test("unique identifier property of the blog posts is named id", async () => {
    const response = await blogsInDb();
    for (const blog of response) {
      assert(blog.id);
    }
  });
});

describe("adding a new blog", () => {
  test("succeds with valid data", async () => {
    const newBlog = {
      title: "Post request creates a new blog",
      author: "backend dev",
      url: "www.urmom.com",
      likes: 69,
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token_1}` })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await blogsInDb();
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blogs) => blogs.title);
    assert.strictEqual(titles.includes(newBlog.title), true);
  });

  test("fails if user is not logged in (unauthorized)", async () => {
    const newBlog = {
      title: "Post request creates a new blog",
      author: "backend dev",
      url: "www.urmom.com",
      likes: 69,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });

  test("if likes property is missing, default to 0", async () => {
    const newBlog = {
      title: "like defualt to 0",
      author: "backend dev",
      url: "www.urmom.com",
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token_1}` })
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await blogsInDb();
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1);
    assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0);
  });

  test("if title or url property is missing, return 400", async () => {
    const newBlog = {
      author: "backend dev",
    };

    await api
      .post("/api/blogs")
      .set({ Authorization: `Bearer ${token_1}` })
      .send(newBlog)
      .expect(400);
  });
});

describe("deleting a blog", () => {
  test("with valid id", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${token_1}` })
      .expect(204);
  });
  test("for another user is unauthorized", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set({ Authorization: `Bearer ${token_2}` })
      .expect(401);
  });
});

describe("updating a blog", () => {
  test("with valid id", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set({ Authorization: `Bearer ${token_1}` })
      .send({
        likes: 69,
      })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await blogsInDb();
    assert.strictEqual(blogsAtEnd.length, initialBlogs.length);
    assert.strictEqual(blogsAtEnd[0].likes, 69);
  });
  test("for another user is unauthorized", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set({ Authorization: `Bearer ${token_2}` })
      .send({
        likes: 69,
      })
      .expect(401);
  });
});

after(async () => {
  await mongoose.connection.close();
});
