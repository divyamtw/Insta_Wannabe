import express from "express";
import { followUser } from "../controllers/user.controller.js";
import verifyUser from "../middlewares/auth.middlewar.js";

const router = express.Router();

router.post("/follow/:userId", verifyUser, followUser);

export default router;
