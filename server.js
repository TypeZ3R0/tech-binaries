// Requiring project dependencies
dotenv.config();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importing routers from routes
import homeRouter from "./routes/home_router.js";
import postsRouter from "./routes/posts_router.js";
import categoryRouter from "./routes/category_router.js";
import userRouter from "./routes/user_router.js";

const app = express();

// Middleware
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use("/", homeRouter); // Home route
app.use("/posts", postsRouter); // Posts route
app.use("/category", categoryRouter); // Category route
app.use("/users", userRouter); // User route

// Listen to dev or production server
const PORT = process.env.PORT || 8000;
const HOSTNAME = "localhost"
app.listen(PORT, () => {
    console.log(`Server started at http://${HOSTNAME}:${PORT}`);
});
