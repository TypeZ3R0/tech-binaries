// Requiring project dependencies
import express from "express";
import { postsId, uniquePost } from "../controllers/posts_controller.js";

// Initializing router with express router app
const router = express.Router();

// Routes
router.get("/posts-id", postsId);
router.get("/:id", uniquePost)

export default router;
