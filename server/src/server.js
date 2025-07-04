import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import dotenv from "dotenv"; // Importing dotenv to manage environment variables
import path from "path";

import notesRoutes from "./routes/notesRoutes.js"; // 
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config(); // Loading environment variables from .env file



const app = express();
const PORT = process.env.PORT || 5001; // Setting the port from environment variables or defaulting to 5001
const __dirname = path.resolve();


// Middleware to parse JSON request bodies
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json()); // This middleware allows the server to parse JSON data in incoming requests
app.use(rateLimiter);

app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`); // Logging the HTTP method and URL of incoming requests
  next(); // Calling the next middleware in the stack
}); // <-- Add this closing parenthesis and brace

app.use("/api/notes", notesRoutes); // Mounting the notes routes on the /api/notes path


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// What is an endpoint?
 // An endpoint is a combination of a URL and an HTTP method (like GET, POST, PUT, DELETE) that defines where a client can access resources on a server. It is essentially a specific path on the server that responds to requests. 

 connectDB().then(() => {
app.listen(PORT, () => {
  console.log("Server is running on port ", PORT); // Starting the server and logging the port number
});
 });