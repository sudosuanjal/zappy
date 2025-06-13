import express from express;
import { getUsers } from "../controllers/message/getUser.controller.js";
import { ProtectRoute } from "../middleware/protect.middleware.js";

const router = express.Router();


router.get("/",ProtectRoute, getUsers);