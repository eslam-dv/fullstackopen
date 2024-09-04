import { Schema, model } from "mongoose";

const blogSchema = new Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

const BlogModel = model("blog", blogSchema);

export default BlogModel;
