// Requiring project dependencies
import express from "express";

// Initializing router with express router app
const router = express.Router();

// Importing controllers
import { queryResults } from "../controllers/home_controller.js";

// Routes
// Home route (get method)
router.get("/search", queryResults);

export default router;
