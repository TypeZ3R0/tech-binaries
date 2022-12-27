import { createTransport } from "nodemailer";

const sendEmail = (userEmail, emailToken) => {
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
        html: `<p>Please click this link to verify your email<p><br><a href=http://localhost:8000/users/verify/${emailToken}>Click this link</a>`,
    };
    Transporter.sendMail(mailOptions, (err, response) => {
        if (err) console.log(err);
        console.log("Email Sent (from verify_email.js)");
    });
};

export default sendEmail;
