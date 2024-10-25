import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, minLength: 3 },
  name: { type: String },
  password: { type: String, required: true },
  blogs: [{ type: Schema.Types.ObjectId, ref: "blog" }],
});

userSchema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id.toString();
    ret._id = undefined;
    ret.password = undefined;
    ret.__v = undefined;
  },
});

const UserModel = model("user", userSchema);

export default UserModel;
