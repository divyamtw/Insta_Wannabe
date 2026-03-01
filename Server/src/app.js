import "dotenv/config";
import cookieParser from "cookie-parser";
import express from "express";

const app = express();

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173", // your frontend URL
  credentials: true, // 👈 important if you're using cookies
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, Dev!");
});

// Routes ----> import
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

export default app;
