import express from "express";
import { createPost } from "../controllers/post.controller.js";
import multer from "multer";
import verifyUser from "../middlewares/auth.middlewar.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", verifyUser, upload.single("post-img"), createPost);

export default router;
