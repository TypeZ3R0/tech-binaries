// Import dependencies
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// Local imports
import { createTransport } from "nodemailer";

export const sendVerificationEmail = (userEmail, emailToken) => {
    const Transporter = createTransport({
        service: "Gmail",
        host: process.env.EMAIL_SMTP_HOST,
        port: process.env.EMAIL_SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_SMTP_AUTH_USER,
            pass: process.env.EMAIL_SMTP_AUTH_PASS,
        },
    });
    let mailOptions = {
        from: "Tech Binaries",
        to: userEmail,
        subject: "EMAIL VERIFICATION",
        html: `<p>Please click this link to verify your email<p><br><a href=http://localhost:3000/users/verify/${emailToken}>Click this link</a>`,
    };
    Transporter.sendMail(mailOptions, (err, response) => {
        if (err) console.log(err);
        console.log("Email Sent (from verify_email.js)");
    });
};

export const sendEmailUpdateEmail = (userEmail, emailToken) => {
    const Transporter = createTransport({
        service: "Gmail",
        host: process.env.EMAIL_SMTP_HOST,
        port: process.env.EMAIL_SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_SMTP_AUTH_USER,
            pass: process.env.EMAIL_SMTP_AUTH_PASS,
        },
    });
    let mailOptions = {
        from: "Tech Binaries",
        to: userEmail,
        subject: "EMAIL UPDATE",
        html: `<p>Please click this link to update email form<p><br><a href=http://localhost:3000/users/update-email/${emailToken}>Click this link</a>`,
    };
    Transporter.sendMail(mailOptions, (err, response) => {
        if (err) console.log(err);
        console.log("Email Sent (from verify_email.js)");
    });
};

export const sendResetPassEmail = (userEmail, resetPassToken) => {
    const Transporter = createTransport({
        service: "Gmail",
        host: process.env.EMAIL_SMTP_HOST,
        port: process.env.EMAIL_SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_SMTP_AUTH_USER,
            pass: process.env.EMAIL_SMTP_AUTH_PASS,
        },
    });
    let mailOptions = {
        from: "Tech Binaries",
        to: userEmail,
        subject: "RESET PASSWORD",
        html: `<p>Please click this link to redirect to reset password page.<p><br><a href=http://localhost:3000/users/reset-password/${resetPassToken}>RESET PASSWORD</a>`,
    };
    Transporter.sendMail(mailOptions, (err, response) => {
        if (err) console.log(err);
        console.log("Email Sent (from verify_email.js)");
    });
};
