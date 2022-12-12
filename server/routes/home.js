// Requiring project dependencies
import express from "express";

// Initializing router with express router app
const router = express.Router();

// Importing controllers
import { getHome } from "../controllers/homeController.js";

// Routes
// Home route (get method)
router.get("/", getHome);

export default router;
