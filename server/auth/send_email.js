import { createTransport } from "nodemailer";

export const sendVerificationEmail = (userEmail, emailToken) => {
    const Transporter = createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "sampletestemail666@gmail.com",
            pass: "smdegowonsisfxfr",
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
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "sampletestemail666@gmail.com",
            pass: "smdegowonsisfxfr",
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
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "sampletestemail666@gmail.com",
            pass: "smdegowonsisfxfr",
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
