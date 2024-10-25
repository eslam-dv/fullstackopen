import { Router } from "express";
import bcrypt from "bcrypt";

import UserModel from "../models/user.js";

const userRouter = Router();

// GET /api/users
// get all users
userRouter.get("/", async (_, res, next) => {
  try {
    const users = await UserModel.find({}).populate("blogs", { title: 1 });
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// POST /api/users
// add user to db
userRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;
  try {
    // username and password are required
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "username and password are required" });
    }
    // username and password must be atleast 3 characters long
    if (username.length < 3 || password.lenght < 3) {
      return res
        .status(400)
        .json({ error: "username and password must be at least 3 characters" });
    }
    // username must be unique
    const userExist = await UserModel.findOne({ username });
    if (userExist) {
      return res.status(400).json({ error: "username already exists" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new UserModel({ username, name, password: hashedPassword });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

export default userRouter;
