// Requiring project dependencies
import express from "express";

// Importing routers from routes
import homeRouter from "./routes/home.js";
import postsRouter from "./routes/posts.js";
import categoryRouter from "./routes/posts.js";

const app = express();

// Middleware
app.use(express.json());

app.use("/", homeRouter); // Home route
app.use("/posts", postsRouter); // Posts route
app.use("/category", categoryRouter); // Category route

// Listen to dev or production server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
