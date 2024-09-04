import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { logInfo, logError } from "./utils/logger.js";
import blogRouter from "./controllers/blogs.js";
import { MONGODB_URI } from "./utils/config.js";

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

app.use("/api/blogs", blogRouter);

export default app;
