// Importing project dependencies
import express from "express";

import {
    userRegister,
    userVerifyEmail,
    userLogin,
    userResendEmailVerification,
    tokenRefresh,
    userDelete,
    getUserById,
    userLogout,
    userForgotPassword,
    userResetPassword,
    userSaveNewPassword,
    userUpdateName,
    userVerifyPassword,
    userUpdateEmail,
    userNewEmail,
} from "../controllers/user_controller.js";
import {
    authorPosts,
    authorCreatePost,
    authorDeletePost,
    authorEditPost,
    authorUpdatedPost,
    authorCreate,
} from "../controllers/author_controller.js";
import isAuthenticated from "../middleware/auth.js";
import isAuthor from "../middleware/author.js";

// Initializing router with express router app
const router = express.Router();

// All routes (/users)
// User auth
router.post("/register", userRegister);
router.get("/verify/:userString", userVerifyEmail);
router.post("/resend-email-verification", userResendEmailVerification);
router.post("/login", userLogin);
router.get("/token-refresh", tokenRefresh);
router.get("/logout", isAuthenticated, userLogout);
router.delete("/delete-user", isAuthenticated, userDelete);

// Get user
router.get("/get-user", isAuthenticated, getUserById);

// User actions and updates
router.post("/update-name", isAuthenticated, userUpdateName);
router.post("/forgot-password", userForgotPassword);
router.get("/reset-password/:userString", userResetPassword);
router.post("/reset-password/:userString", userSaveNewPassword);
router.post("/verify-password", isAuthenticated, userVerifyPassword);
router.get("/update-email/:userString", userUpdateEmail);
router.patch("/update-email/:userString", userNewEmail);

// Author
router.post("/authors/author-create", isAuthenticated, authorCreate);
router.get("/authors/author-posts", isAuthenticated, isAuthor, authorPosts);

// Author posts action
router.post("/authors/create-post", isAuthenticated, isAuthor, authorCreatePost);
router.get("/authors/edit-post/:postId", isAuthenticated, isAuthor, authorEditPost);
router.patch("/authors/edit-post/:postId", isAuthenticated, isAuthor, authorUpdatedPost);
router.delete("/authors/delete-post/:postId", isAuthenticated, isAuthor, authorDeletePost);

export default router;
