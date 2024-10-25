import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { logInfo, logError } from "./utils/logger.js";
import { MONGODB_URI } from "./utils/config.js";
import {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  getToken,
  userExtractor,
} from "./utils/middleware.js";
import blogRouter from "./controllers/blogs.js";
import userRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    logInfo("Connected to MongoDB");
  })
  .catch((err) => {
    logError("Error connecting to MongoDB:", err);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(getToken);

app.use("/api/blogs", userExtractor, blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

export default app;
