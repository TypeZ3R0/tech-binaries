import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import sendEmail from "../auth/send_email.js";
import { convertEmailString, verifyEmailString } from "../auth/email_string.js";

const { user } = new PrismaClient();

// Register a user and send a verification email
export const userRegister = async (req, res) => {
    // Get user details from registration form body
    const { first_name, last_name, email, password } = req.body;
    const userExists = await user.findUnique({ where: { email: email } });
    // Check whether a user with the giver info present or not
    if (userExists) {
        return res.status(400).send({ message: "User with this email already exists" });
    }
    // Create user if it does not exists
    const hashedPassword = await bcrypt.hash(password, 12);
    await user.create({
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
    const existingUser = await user.findUnique({ where: { email: userEmail } });
    // Check whether a user with existing email exists or not
    if (existingUser) {
        try {
            await user.update({ where: { email: existingUser.email }, data: { isVerified: true } });
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
};
