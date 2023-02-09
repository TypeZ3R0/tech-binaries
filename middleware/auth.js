import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

// Get access token from cookies on request and verify if it is valid
const isAuthenticated = (req, res, next) => {
    let { accessToken } = req.cookies;
    if (!accessToken) return res.status(403).send("You have no tokens");
    jwt.verify(accessToken, accessTokenSecret, (err, user) => {
        if (!err) {
            req.user = user;
            next();
        } else {
            return res.status(401).send("Access token expired");
        }
    });
};

export default isAuthenticated;
