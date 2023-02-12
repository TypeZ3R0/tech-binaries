// Requiring project dependencies
import express from "express";
import {
    getPostTags,
    createTag,
    getCategoryPosts,
    deleteTag,
    getCategories,
} from "../controllers/category_controller.js";
import isAuthenticated from "../middleware/auth.js";
import isAuthor from "../middleware/author.js";

// Initializing router with express router app
const router = express.Router();

// Routes
router.get("/", getCategories);
router.get("/tags", getPostTags);
router.post("/tags/create-tag", createTag);
router.get("/:tag", getCategoryPosts);
router.delete("/tags/:tagId", isAuthenticated, isAuthor, deleteTag);

export default router;
