import { Schema, model } from "mongoose";

const blogSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  author: { type: String },
  likes: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

blogSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    ret._id = undefined;
    ret.__v = undefined;
  },
});

const BlogModel = model("blog", blogSchema);

export default BlogModel;
