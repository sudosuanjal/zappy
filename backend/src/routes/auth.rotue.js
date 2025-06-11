import express from "express";
import { login } from "../controllers/auth/login.controller.js";

const router = express.Router();

router.post("/login", login);

export default router;
