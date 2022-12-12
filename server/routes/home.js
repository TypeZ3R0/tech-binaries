// Requiring project dependencies
const express = require("express");

const posts = require("../sample_data/sampledata.js");

// Initializing router with express router app
const router = express.Router();

// Routes
// Home route (get method)
router.get("/", (req, res) => {
    res.json(posts);
});

module.exports = router;
