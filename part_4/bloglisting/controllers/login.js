import { Router } from "express";
import bcrypt from "bcrypt";

import UserModel from "../models/user.js";
import { createToken } from "../utils/config.js";

const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "invalid username or password" });
    }
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({ error: "invalid password or password" });
    }
    const token = createToken(user);
    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default loginRouter;
