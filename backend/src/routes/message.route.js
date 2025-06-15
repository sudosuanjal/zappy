import express from "express";
import { getUsers } from "../controllers/message/getUser.controller.js";
import { ProtectRoute } from "../middleware/protect.middleware.js";
import { getMessage } from "../controllers/message/getMessage.controller.js";
import { sendMessage } from "../controllers/message/sendMesssage.controller.js";

const router = express.Router();

router.get("/users", ProtectRoute, getUsers);
router.get("/:id", ProtectRoute, getMessage);

router.post("/send/:id", ProtectRoute, sendMessage);

export default router;
