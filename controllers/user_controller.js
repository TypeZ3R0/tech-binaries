import bcrypt from "bcrypt";
import crypto from "crypto";

import db from "../database/db.js";
import { sendVerificationEmail, sendResetPassEmail, sendEmailUpdateEmail } from "../auth/send_email.js";
import {
    convertEmailString,
    verifyEmailString,
    createResetPassToken,
    verifyResetPassToken,
} from "../auth/email_string.js";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../auth/auth_tokens.js";

// Register a user and send a verification email
export const userRegister = async (req, res) => {
    // Get user details from registration form body
    const { first_name, last_name, email, password } = req.body;
    const userExists = await db.user.findUnique({ where: { email } });
    // Check whether a user with the given info present or not
    if (userExists) {
        return res.status(400).send({ message: "User with this email already exists" });
    }
    // Create user if it does not exists
    try {
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
        sendVerificationEmail(userEmail, emailToken);
        res.status(200).send({ message: "User successfully created, Please check your email to verify yourself!" });
    } catch (err) {
        console.log(err);
    }
};

// Email verification
export const userVerifyEmail = async (req, res) => {
    //Get email from params
    const { userString } = req.params;
    const userEmail = verifyEmailString(userString);
    // If invalid user email or null send a link with resend verification email
    if (!userEmail) {
        return res.status(403).send({ message: "Link expired", verifySuccess: false });
    }
    // Get user based on verified email token
    const existingUser = await db.user.findUnique({ where: { email: userEmail } });
    // Check whether a user with existing email exists or not
    if (existingUser) {
        try {
            await db.user.update({ where: { email: existingUser.email }, data: { isVerified: true } });
            res.status(200)
                .cookie("refreshToken", "", { expires: new Date("Thu, Jan 01 1970 00:00:00 UTC") })
                .cookie("accessToken", "", { expires: new Date("Thu, Jan 01 1970 00:00:00 UTC") })
                .send({ message: "Email verified successfully", verifySuccess: true });
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(404).send("User not found");
    }
};

// Resend email verification link through email if the previous one expires
export const userResendEmailVerification = async (req, res) => {
    const { email: enteredEmail } = req.body;
    const existingUser = await db.user.findUnique({ where: { email: enteredEmail } });
    if (!existingUser)
        return res.status(404).send({ message: "No user exists with this email address.", success: false });
    const emailToken = convertEmailString(enteredEmail);
    // Resend verification email
    sendVerificationEmail(enteredEmail, emailToken);
    res.status(200).send({ message: `Verification link sent to ${enteredEmail}.`, success: true });
};

// Login existing user provided the user is verified
export const userLogin = async (req, res) => {
    // Get user credentials from login form body
    const { email, password } = req.body;
    try {
        const existingUser = await db.user.findUnique({
            where: { email },
            include: { authorProfile: { select: { id: true } } },
        });
        // Check whether user with provided email exists or not
        if (!existingUser) return res.status(403).send({ message: "Invalid Credentials" });
        // Check whether user with provided email is verified or not
        if (!existingUser.isVerified)
            return res.status(403).send({ message: "Can't login, your email is not verified", userNotVerified: true });
        // Check for valid credentials
        const isCorrectPassword = await bcrypt.compare(password, existingUser.password);
        if (!isCorrectPassword) return res.status(403).send({ message: "Invalid Credentials" });
        // Create JWT Tokens
        const userCred = existingUser;
        let authorId;
        if (userCred.authorProfile) authorId = userCred.authorProfile.id;
        let accessToken = createAccessToken(userCred);
        let refreshToken = await createRefreshToken(userCred);
        res.status(201)
            .cookie("accessToken", accessToken, { httpOnly: true, path: "/", sameSite: "strict" })
            .cookie("refreshToken", refreshToken, { httpOnly: true, path: "/", sameSite: "strict" })
            .send({ userId: existingUser.id });
    } catch (err) {
        console.log(err);
    }
};

// Create access token and refresh token by posting the refresh token
export const tokenRefresh = async (req, res) => {
    // Get refresh token from request body
    const { refreshToken } = req.cookies;
    const refreshTokenInDb = await db.refreshToken.findFirst({ where: { token: refreshToken } });
    if (!refreshToken || !refreshTokenInDb) {
        return res.status(403).send("You have no old tokens");
    }
    const generatedTokens = await verifyRefreshToken(refreshToken);
    if (!generatedTokens) return res.status(403).send("You have been logged out for inactivity");
    res.status(201)
        .cookie("accessToken", generatedTokens.accessToken, { httpOnly: true, path: "/", sameSite: "strict" })
        .cookie("refreshToken", generatedTokens.refreshToken, { httpOnly: true, path: "/", sameSite: "strict" })
        .send("Tokens refreshed");
};

// Get logged in user's id and set it to navbar
export const getUserById = async (req, res) => {
    const user = req.user;
    try {
        const foundUser = await db.user.findUnique({
            where: { id: user.id },
            include: { authorProfile: { select: { id: true, authorName: true, bio: true } } },
        });
        res.status(200).send({ user: foundUser });
    } catch (err) {
        if (err) return res.status(403).send("Please login");
    }
};

// Logout user
export const userLogout = async (req, res) => {
    const user = req.user;
    try {
        await db.refreshToken.deleteMany({ where: { userEmail: user.email } });
        res.status(200)
            .cookie("refreshToken", "", { expires: new Date("Thu, Jan 01 1970 00:00:00 UTC") })
            .cookie("accessToken", "", { expires: new Date("Thu, Jan 01 1970 00:00:00 UTC") })
            .send({ logoutSuccess: true, userId: user.id });
    } catch (err) {
        console.log(err);
    }
};

// Handle forgot password
export const userForgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const foundUser = await db.user.findUnique({ where: { email }, select: { id: true, email: true } });
        if (foundUser) {
            const userEmail = foundUser.email;
            const resetPassToken = createResetPassToken(foundUser);
            sendResetPassEmail(userEmail, resetPassToken);
            res.send({ success: true, message: `Reset password email sent to ${userEmail}` });
        } else return res.status(404).send({ success: false, message: "No user found with that email" });
    } catch (err) {
        console.log(err);
    }
};

// Get user reset password page by bool value
export const userResetPassword = async (req, res) => {
    const { userString } = req.params;
    const isRequestValid = verifyResetPassToken(userString);
    if (!isRequestValid.valid) return res.status(403).send({ valid: isRequestValid.valid });
    res.status(200).send({ valid: isRequestValid.valid });
};

// Create new password and save it to database
export const userSaveNewPassword = async (req, res) => {
    const { userString } = req.params;
    const { password } = req.body;
    const getUser = verifyResetPassToken(userString);
    if (getUser.user) {
        try {
            const updatedPassword = await bcrypt.hash(password, 12);
            await db.user.update({ where: { id: getUser.user.id }, data: { password: updatedPassword } });
            res.status(201).send({ success: true });
        } catch (err) {
            console.log(err);
        }
    }
};

// Update user name
export const userUpdateName = async (req, res) => {
    const { email } = req.user;
    const { firstName, lastName } = req.body;
    try {
        await db.user.update({
            where: { email },
            data: { first_name: firstName, last_name: lastName },
            select: { id: true },
        });
        res.status(201).send({ success: true, randString: crypto.randomUUID() });
    } catch (err) {
        console.log(err);
    }
};

// Verify user password
export const userVerifyPassword = async (req, res) => {
    const { id: userId, email: userEmail } = req.user;
    const { enteredPass, email: isEmail, pass: isPass } = req.body;
    // Find password with user email
    const userPassword = await db.user.findUnique({ where: { id: userId }, select: { password: true } });
    console.log(userPassword);
    const isCorrectPassword = await bcrypt.compare(enteredPass, userPassword.password);
    // If correct pass do either password update or email update
    if (!isCorrectPassword) res.status(403).send({ message: "Invalid credentials" });
    else if (isCorrectPassword && isEmail) {
        const emailToken = convertEmailString(userEmail);
        // Send email update email link to current email id
        sendEmailUpdateEmail(userEmail, emailToken);
        res.status(200).send({ message: `Email update link sent to ${userEmail}`, isValid: true, emailMessage: true });
    } else if (isCorrectPassword && isPass) {
        try {
            const foundUser = await db.user.findUnique({
                where: { email: userEmail },
                select: { id: true, email: true },
            });
            const resetPassToken = createResetPassToken(foundUser);
            sendResetPassEmail(userEmail, resetPassToken);
            res.status(200).send({
                message: `Password update link sent to ${userEmail}`,
                isValid: true,
                passMessage: true,
            });
        } catch (err) {
            console.log(err);
        }
    }
};

// Update email
export const userUpdateEmail = async (req, res) => {
    const { userString } = req.params;
    const verifiedEmailString = verifyEmailString(userString);
    if (verifiedEmailString) {
        try {
            return res.status(200).send({ linkExpired: false });
        } catch (err) {
            console.log(err);
        }
    } else return res.status(403).send({ message: "Link expired.", linkExpired: true });
};

// Handle new email submit and update
export const userNewEmail = async (req, res) => {
    const { userString } = req.params;
    const { newEmail } = req.body;
    const verifiedOldEmailString = verifyEmailString(userString);
    try {
        // Check if the new email is the same of current email or it belongs to others else update
        const existingUser = await db.user.findUnique({ where: { email: newEmail } });
        if (existingUser) {
            if (existingUser.email === verifiedOldEmailString) {
                return res.status(403).send({ message: "This is your current email" });
            } else if (existingUser.email === newEmail) {
                return res.status(403).send({ message: "Can't update email. Provided email belongs to someone else." });
            }
        } else {
            const updatedUser = await db.user.update({
                where: { email: verifiedOldEmailString },
                data: { email: newEmail, isVerified: false },
                select: { email: true },
            });
            const userEmail = updatedUser.email;
            const emailToken = convertEmailString(userEmail);
            // Send verification email to new email
            sendVerificationEmail(userEmail, emailToken);
            res.status(201)
                .cookie("refreshToken", "", { expires: new Date("Thu, Jan 01 1970 00:00:00 UTC") })
                .cookie("accessToken", "", { expires: new Date("Thu, Jan 01 1970 00:00:00 UTC") })
                .send({
                    message: `Email updated, a verification link has been sent to your new email ${userEmail}`,
                    emailUpdateSuccess: true,
                });
        }
    } catch (err) {
        console.log(err);
    }
};

// Delete user
export const userDelete = async (req, res) => {
    const user = req.user;
    try {
        await db.user.delete({ where: { id: user.id } });
        res.status(200).send({ userDeleteSuccess: true });
    } catch (err) {
        console.log(err);
    }
};
