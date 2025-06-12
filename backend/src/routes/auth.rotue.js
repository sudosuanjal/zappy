import express from "express";
import { login } from "../controllers/auth/login.controller.js";
import { verifyAuth } from "../middleware/verify.middleware.js";
import { ProtectRoute } from "../middleware/protect.middleware.js";
import { username } from "../controllers/auth/username.controller.js";

const router = express.Router();

router.post("/login", verifyAuth, login);
router.put("/username", ProtectRoute, username);

export default router;
