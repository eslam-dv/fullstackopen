import { Router } from "express";

import BlogModel from "../models/blog.js";

const blogRouter = Router();

// GET /api/blogs
// get all blogs
blogRouter.get("/", async (_, res, next) => {
  try {
    const blogs = await BlogModel.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    res.status(200).json(blogs);
  } catch (err) {
    next(err);
  }
});

// POST /api/blogs
// require authorization
// add blog to db, ex: { title, author, url, likes }
blogRouter.post("/", async (req, res, next) => {
  const { title, url } = req.body;
  try {
    if (!title || !url) {
      return res.status(400).json({ error: "title and author are required" });
    }
    const user = req.user;
    if (!user) return res.status(401).json({ error: "unauthorized" });
    const newBlog = new BlogModel({
      title,
      author: user.name,
      url,
      user: user._id,
    });
    await newBlog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();
    res.status(201).json(newBlog);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/blogs/:id
// require authorization
// delete a blog with it's id
blogRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await BlogModel.findById(id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    const user = req.user;
    if (!user) return res.status(401).json({ error: "unauthorized" });
    if (blog.user.toString() !== user._id.toString()) {
      return res.status(401).json({ error: "unauthorized" });
    }
    await BlogModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// PUT /api/blogs/:id
// require authorization
// update a blog with it's id
blogRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { title, author, url, likes } = req.body;
  try {
    // const blog = await BlogModel.findById(id);
    // if (!blog) return res.status(404).json({ error: "Blog not found" });
    // const user = req.user;
    // if (!user) return res.status(401).json({ error: "unauthorized" });
    // if (blog.user.toString() !== user._id.toString()) {
    //   return res.status(401).json({ error: "unauthorized" });
    // }
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, author, url, likes },
      { new: true },
    );
    res.status(200).json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

export default blogRouter;
