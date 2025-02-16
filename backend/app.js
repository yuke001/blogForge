import express from "express";
import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import {rateLimit} from "express-rate-limit";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import  helmet from "helmet";


db();

let app = express();

let limiter=rateLimit({
  windowMs:15*60*1000,
  limit:100,
  standardHeaders:'draft-8',
  legacyHeaders:false
})

//middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(limiter);
app.use(helmet())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//base route
app.use("/api/users", userRoutes);
app.use("/api/blog", blogRoutes);

//global error handler
app.use(errorMiddleware)

export default app;
