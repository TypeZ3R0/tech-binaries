import jwt from "jsonwebtoken";
import db from "../database/db.js";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const createAccessToken = (userCred) => {
    const { email, first_name, last_name } = userCred;
    const userTokenObj = { email, first_name, last_name };
    const accessToken = jwt.sign(userTokenObj, accessTokenSecret, { expiresIn: "5m" });
    return accessToken;
};

const createRefreshToken = async (userCred) => {
    const { email, first_name, last_name } = userCred;
    const userTokenObj = { email, first_name, last_name };
    const refreshToken = jwt.sign(userTokenObj, refreshTokenSecret, { expiresIn: "45d" });
    try {
        await db.refreshToken.create({ data: { token: refreshToken, userEmail: email } });
    } catch (err) {
        if (err) {
            await db.refreshToken.update({ where: { userEmail: email }, data: { token: refreshToken } });
        }
    }
    return refreshToken;
};

const verifyRefreshToken = async (oldRefreshToken) => {
    const payload = jwt.verify(oldRefreshToken, refreshTokenSecret, async (err, user) => {
        if (err) {
            await db.refreshToken.deleteMany({ where: { token: oldRefreshToken } });
            return null;
        }
        const accessToken = createAccessToken(user);
        await db.refreshToken.deleteMany({ where: { token: oldRefreshToken } });
        const refreshToken = await createRefreshToken(user);
        return { accessToken, refreshToken };
    });
    return payload;
};
export { createAccessToken, createRefreshToken, verifyRefreshToken };
