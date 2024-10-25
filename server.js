import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import recipeRoute from "./Routers/recipeRoute.js";
import connectDB from './Database/dbConfig.js';

// Initialise dotenv
dotenv.config();

// create app
const app = express();

// cors middleware
app.use(cors());

// request body middleware
app.use(express.json());

// Connect to the Database;
connectDB();

// Default route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to My recipe API");
});

// custom route
app.use("/api/recipe", recipeRoute);

// Declare Port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log("server started and running on the port");
});
