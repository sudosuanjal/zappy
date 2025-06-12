import express from "express";
import { login } from "../controllers/auth/login.controller.js";
import { verifyAuth } from "../middleware/verify.middleware.js";
import { ProtectRoute } from "../middleware/protect.middleware.js";
import { username } from "../controllers/auth/username.controller.js";
import { checkAuth } from "../controllers/auth/checkAuth.controller.js";

const router = express.Router();

router.post("/login", verifyAuth, login);
router.put("/username", ProtectRoute, username);
router.get("/check-auth", ProtectRoute, checkAuth);

export default router;
