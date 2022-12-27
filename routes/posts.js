// Requiring project dependencies
import express from "express";

// Initializing router with express router app
const router = express.Router();


// Routes
// New post route (get and post method)
router.route("/new")
    .get((req, res) => {
        res.send("New post");
    })
    .post();

export default router