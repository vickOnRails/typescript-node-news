import express from "express";
// import cors from "cors";
import dotenv from "dotenv";

import appRoutes from "./routes";
import connectDb from "./db";

// Set configuration to allow parsing of .env variables
dotenv.config();

// connect database
connectDb();

const PORT = process.env.PORT || 5000;

// start express app
const app = express();

// setup express to parse request body
app.use(express.json());

app.use("/api", appRoutes);

// Test route
app.get("/api", (req, res) => {
  res.status(200).json({ message: `Welcome to the API` });
});

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
