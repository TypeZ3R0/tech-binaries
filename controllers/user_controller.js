import bcrypt from "bcrypt";

import db from "../database/db.js";
import sendEmail from "../auth/send_email.js";
import { convertEmailString, verifyEmailString } from "../auth/email_string.js";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../auth/auth_tokens.js";

// Register a user and send a verification email
export const userRegister = async (req, res) => {
    // Get user details from registration form body
    const { first_name, last_name, email, password } = req.body;
    const userExists = await db.user.findUnique({ where: { email } });
    // Check whether a user with the giver info present or not
    if (userExists) {
        return res.status(400).send({ message: "User with this email already exists" });
    }
    // Create user if it does not exists
    const hashedPassword = await bcrypt.hash(password, 12);
    await db.user.create({
        data: {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: hashedPassword,
        },
    });
    const userEmail = email;
    const emailToken = convertEmailString(userEmail);
    // Send verification email
    sendEmail(userEmail, emailToken);
    res.status(200).send({ message: "User successfully created, Please check your email to verify yourself!" });
};

// Email verification
export const userVerifyEmail = async (req, res) => {
    //Get email from params
    const { userString } = req.params;
    const userEmail = verifyEmailString(userString);
    // Get user based on verified email token
    const existingUser = await db.user.findUnique({ where: { email: userEmail } });
    // Check whether a user with existing email exists or not
    if (existingUser) {
        try {
            await db.user.update({ where: { email: existingUser.email }, data: { isVerified: true } });
            res.status(200).send("Email Verified!");
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(404).send("User not found");
    }
};

// Login existing user provided the user is verified
export const userLogin = async (req, res) => {
    // Get user credentials from login form body
    const { email, password } = req.body;
    const existingUser = await db.user.findUnique({ where: { email } });
    // Check whether user with provided email exists or not
    if (!existingUser) return res.status(404).send({ message: "No user exists with provided email address" });
    // Check whether user with provided email is verified or not
    if (!existingUser.isVerified) return res.status(403).send({ message: "Can't login, your email is not verified" });
    // Check for valid credentials
    const isCorrectPassword = await bcrypt.compare(password, existingUser.password);
    if (!isCorrectPassword) return res.status(403).send({ message: "Invalid Credentials" });
    // Create JWT Tokens
    const userCred = existingUser;
    let accessToken = createAccessToken(userCred);
    let refreshToken = await createRefreshToken(userCred);
    return res.status(201).send({ accessToken, refreshToken });
};

// Create access token and refresh token by posting the refresh token
export const tokenRefresh = async (req, res) => {
    // Get refresh token from request body
    const oldRefreshToken = req.body.token;
    if (!oldRefreshToken) {
        return res.status(403).send("Unauthorized");
    }
    const generatedTokens = await verifyRefreshToken(oldRefreshToken);
    if (!generatedTokens) return res.status(403).send("You have been logged out for inactivity");
    res.status(201).send(generatedTokens);
};

// Get logged in user's id and set it to navbar
export const userNavProfile = async (req, res) => {
    const user = req.user;
    const foundUser = await db.user.findUnique({ where: { email: user.email } });
    res.status(200).send({ userId: foundUser.id });
};

// Get full user profile
export const userProfile = async (req, res) => {
    const user = req.user;
    const foundUser = await db.user.findUnique({ where: { email: user.email } });
    res.status(200).send({
        userEmail: foundUser.email,
        userFirstName: foundUser.first_name,
        userLastName: foundUser.last_name,
    });
};

// Get refresh token and access token from body and headers and delete cookie as a result of success
export const userLogout = async (req, res) => {
    const existingRefreshToken = req.body.token;
    try {
        await db.refreshToken.deleteMany({ where: { token: existingRefreshToken } });
        res.status(200).send({ successfullyLoggedOut: true });
    } catch (err) {
        console.log(err);
    }
};
