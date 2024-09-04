import { Router } from "express";

import BlogModel from "../models/blog.js";

const blogRouter = Router();

// GET /api/blogs
// get all blogs
blogRouter.get("/", (_, res) => {
	BlogModel.find({}).then((blogs) => res.json(blogs));
});

// POST /api/blogs
// add blog to db, ex: { title, author, url, likes }
blogRouter.post("/", (req, res) => {
	const blog = new BlogModel(req.body);
	blog.save().then((result) => res.status(201).json(result));
});

export default blogRouter;
