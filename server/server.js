// Requiring project dependencies
const express = require("express");

// Initializing the app with express main function
const app = express();


// Importing Routes
// Home route
const homeRoute = require("./routes/home.js");
app.use("/", homeRoute);

// Posts route
const postsRoute = require("./routes/posts.js");
app.use("/posts", postsRoute);

// Category route
const categoryRoute = require("./routes/category.js");
app.use("/category", categoryRoute);

// Listen to dev or production server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
