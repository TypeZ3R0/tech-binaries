// Requiring project dependencies
import express from "express";

import isAuthenticated from "../middleware/auth.js";

// Initializing router with express router app
const router = express.Router();

// Importing controllers
import { getHome } from "../controllers/home_controller.js";

// Routes
// Home route (get method)
router.get("/", getHome);

export default router;
