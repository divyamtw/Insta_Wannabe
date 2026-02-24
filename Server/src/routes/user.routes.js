import express from "express";
import { followUser, unfollowUser } from "../controllers/user.controller.js";
import verifyUser from "../middlewares/auth.middlewar.js";

const router = express.Router();

router.post("/follow/:userId", verifyUser, followUser);
router.post("/unfollow/:userId", verifyUser, unfollowUser);

export default router;
