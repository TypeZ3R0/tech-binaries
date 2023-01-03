// Requiring project dependencies
import express from "express";

import {
    userRegister,
    userVerifyEmail,
    userLogin,
    tokenRefresh,
    userNavProfile,
    userLogout,
    userProfile,
} from "../controllers/user_controller.js";
import { getAuthorById, authorProfile, authorCreatePost } from "../controllers/author_controller.js";
import isAuthenticated from "../middleware/auth.js";
import isAuthor from "../middleware/author.js";

// Initializing router with express router app
const router = express.Router();

router.post("/register", userRegister);
router.get("/verify/:userString", userVerifyEmail);
router.post("/login", userLogin);
router.post("/token-refresh", tokenRefresh);
router.get("/nav-profile", isAuthenticated, userNavProfile);
router.get("/profile", isAuthenticated, userProfile);
router.get("/authors/create-post", isAuthenticated, isAuthor, getAuthorById);
router.get("/authors/nav-author", isAuthenticated, isAuthor, getAuthorById);
router.get("/authors/author-dashboard", isAuthenticated, isAuthor, authorProfile);
router.post("/authors/create-post", isAuthenticated, isAuthor, authorCreatePost);
router.post("/logout", isAuthenticated, userLogout);

export default router;
