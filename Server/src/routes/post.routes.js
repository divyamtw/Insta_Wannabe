import express from "express";
import {
  createPost,
  getAllPost,
  getPostDetails,
  likePost,
  unLikePost,
  getFeed,
} from "../controllers/post.controller.js";
import multer from "multer";
import verifyUser from "../middlewares/auth.middlewar.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", verifyUser, upload.single("post-img"), createPost);
router.get("/", verifyUser, getAllPost);
router.get("/details/:postId", verifyUser, getPostDetails);
router.get("/feed", getFeed);

// like , unlike router
router.post("/like/:postId", verifyUser, likePost);
router.post("/unlike/:postId", verifyUser, unLikePost);

export default router;
