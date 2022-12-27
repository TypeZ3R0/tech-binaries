import jwt from "jsonwebtoken";

// Convert user email to JWT Token and pass it as request params
const convertEmailString = (userEmail) => {
    const emailSecret = process.env.EMAIL_VERIFICATION_SECRET;
    const preSignedEmail = { email: userEmail };
    const emailToken = jwt.sign(preSignedEmail, emailSecret, { expiresIn: "1d" });
    return emailToken;
};

// Convert the token passed in params to an object
const verifyEmailString = (userString) => {
    const emailSecret = process.env.EMAIL_VERIFICATION_SECRET;
    const jwtVerifiedEmail = jwt.verify(userString, emailSecret, (err, user) => {
        if(err) {
            console.log(err);
        }
        return user.email;
    });
    return jwtVerifiedEmail;
};

export { convertEmailString, verifyEmailString };
