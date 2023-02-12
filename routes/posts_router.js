// Requiring project dependencies
import express from "express";
import { uniquePost, postComments, createPostComment, deletePostComment, getPosts } from "../controllers/posts_controller.js";
import isAuthenticated from "../middleware/auth.js";

// Initializing router with express router app
const router = express.Router();

// Routes
router.get("/", getPosts);
router.get("/:id", uniquePost);
router.get("/:id/comments", postComments);
router.delete("/:postId/delete-comment/:commentId", isAuthenticated, deletePostComment);
router.post("/:id/create-comment", isAuthenticated, createPostComment);

export default router;
