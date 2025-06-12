import express from "express";
import { login } from "../controllers/auth/login.controller.js";
import { verifyAuth } from "../middleware/verify.middleware.js";

const router = express.Router();

router.post("/login", verifyAuth, login);

export default router;
