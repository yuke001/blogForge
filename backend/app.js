import express from "express";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

db();

let app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//base route
app.use("/api/users", userRoutes);
app.use("/api/blog", blogRoutes);

//global error handler
app.use((err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || "Something went wrong!!Please try again Later";
  return res.status(statusCode).json(message);
});

export default app;
