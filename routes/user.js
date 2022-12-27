// Requiring project dependencies
import express from "express";

import { userRegister, userVerifyEmail, userLogin } from "../controllers/user_controller.js";

// Initializing router with express router app
const router = express.Router();

router.post("/register", userRegister);
router.get("/verify/:userString", userVerifyEmail);
router.post("/login", userLogin);

export default router;
