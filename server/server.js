// Requiring project dependencies
import express from "express";

// Importing routers from routes
import homeRouter from "./routes/home.js";
import postsRouter from "./routes/posts.js";
import categoryRouter from "./routes/posts.js";

const app = express();

// Middleware
app.use(express.json());

// Importing Routes
// Home route
app.use("/", homeRouter);

// Posts route
app.use("/posts", postsRouter);

// Category route
app.use("/category", categoryRouter);

// Listen to dev or production server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
