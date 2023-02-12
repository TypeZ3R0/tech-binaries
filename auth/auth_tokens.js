import jwt from "jsonwebtoken";
import db from "../database/db.js";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

// Create access token (expires in 5 minutes)
const createAccessToken = (userCred) => {
    const { email, first_name, last_name, id } = userCred;
    const userTokenObj = { email, first_name, last_name, id };
    const accessToken = jwt.sign(userTokenObj, accessTokenSecret, { expiresIn: "5m" });
    return accessToken;
};

// Create refresh token (expires in 45 days)
const createRefreshToken = async (userCred) => {
    const { email, first_name, last_name, id } = userCred;
    const userTokenObj = { email, first_name, last_name, id };
    const refreshToken = jwt.sign(userTokenObj, refreshTokenSecret, { expiresIn: "1d" });
    try {
        await db.refreshToken.upsert({
            where: { userEmail: email },
            update: { token: refreshToken },
            create: { token: refreshToken, userEmail: email },
        });
    } catch (err) {
        console.log(err);
    }
    return refreshToken;
};

// Verify refresh token and regenerate access and refresh tokens
const verifyRefreshToken = async (oldRefreshToken) => {
    const payload = jwt.verify(oldRefreshToken, refreshTokenSecret, async (err, user) => {
        if (err) {
            await db.refreshToken.deleteMany({ where: { token: oldRefreshToken } });
            return null;
        }
        const accessToken = createAccessToken(user);
        const refreshToken = await createRefreshToken(user);
        return { accessToken, refreshToken };
    });
    return payload;
};
export { createAccessToken, createRefreshToken, verifyRefreshToken };
