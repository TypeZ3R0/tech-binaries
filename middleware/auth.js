import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const isAuthenticated = (req, res, next) => {
    let token = req.headers["authorization"];
    if (!token) res.status(403).send("Unauthorized");
    token = token.split(" ")[1];
    jwt.verify(token, accessTokenSecret, (err, user) => {
        if (!err) {
            req.user = user;
            next();
        } else {
            return res.status(403).send("Unauthorized");
        }
    });
};

export default isAuthenticated;
