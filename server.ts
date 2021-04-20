import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import redis from "redis";

import appRoutes from "./routes";
import connectDb from "./db";

// Set configuration to allow parsing of .env variables
dotenv.config();

// connect to mongo database
connectDb();

const PORT = process.env.PORT || 5000;

// setup redis server

export const client = redis.createClient({ port: 51235 });

// start express app
const app = express();

// setup express to parse request body
app.use(express.json());

// Allow any origin for now
// FIXME: restrict for security purposes
app.use(
  cors({
    origin: "*",
  })
);

// Test route to see if application is running
app.get("/api", (req, res) => {
  res.status(200).json({ message: `Application is running` });
});

// routes for the application
app.use("/api", appRoutes);

// TODO: add error handling middlewares for later

// listen to port
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
