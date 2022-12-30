// Requiring project dependencies
dotenv.config();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importing routers from routes
import homeRouter from "./routes/home.js";
import postsRouter from "./routes/posts.js";
import categoryRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";

const app = express();

// Middleware
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRouter); // Home route
app.use("/posts", postsRouter); // Posts route
app.use("/category", categoryRouter); // Category route
app.use("/users", userRouter); // User route

// Listen to dev or production server
const PORT = process.env.PORT || 8000;
const HOSTNAME = process.env.HOSTNAME || "localhost"
app.listen(PORT, () => {
    console.log(`Server started at http://${HOSTNAME}:${PORT}`);
});
