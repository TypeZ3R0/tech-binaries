// Requiring project dependencies
const express = require("express");

// Initializing router with express router app
const router = express.Router();


// Routes 
router.get("/gadgets-and-apps", (req, res) => {
    res.send("PCs And Laptops");
})

router.get("/gaming-and-entertainment", (req, res) => {
    res.send("Gaming And Entertainment");
})

router.get("/mobile-phones", (req, res) => {
    res.send("Mobile Phones");
})

router.get("/science-and-technology", (req, res) => {
    res.send("Science And Technology");
})

router.get("/pcs-and-laptops", (req, res) => {
    res.send("PCs And Laptops");
})

module.exports = router