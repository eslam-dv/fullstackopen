import jwt from "jsonwebtoken";

import { logInfo } from "./logger.js";
import UserModel from "../models/user.js";

const requestLogger = (req, _, next) => {
  logInfo("Method:", req.method);
  logInfo("Path:", req.path);
  logInfo("Body:", req.body);
  logInfo("---");
  next();
};

const errorHandler = (err, _, res, next) => {
  if (err.name.includes("CastError")) {
    return res.status(400).send({ error: "malformatted id" });
  }
  if (err.name.includes("ValidationError")) {
    return res.status(400).json({ error: err.message });
  }
  if (err.name.includes("JsonWebTokenError")) {
    return res.status(401).json({ error: "invalid token" });
  }
  if (err.name.includes("TokenExpiredError")) {
    return res.status(401).json({ error: "token expired" });
  }
  next(err);
};

const unknownEndpoint = (_, res) => {
  res.status(404).json({ error: "unknow endpoint" });
};

const getToken = (req, _, next) => {
  const authorization = req.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (req, _, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    const user = await UserModel.findById(decodedToken.id);
    req.user = user;
  }
  next();
};

export {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  getToken,
  userExtractor,
};
