import jwt from "jsonwebtoken";

// Convert user email to JWT Token and pass it as request params
export const convertEmailString = (userEmail) => {
    const emailSecret = process.env.EMAIL_VERIFICATION_SECRET;
    const preSignedEmail = { email: userEmail };
    const emailToken = jwt.sign(preSignedEmail, emailSecret, { expiresIn: "1min" });
    return emailToken;
};

// Convert the token passed in params to an object
export const verifyEmailString = (userString) => {
    const emailSecret = process.env.EMAIL_VERIFICATION_SECRET;
    const jwtVerifiedEmail = jwt.verify(userString, emailSecret, (err, user) => {
        if (err) {
            return null;
        }
        return user.email;
    });
    return jwtVerifiedEmail;
};

export const createResetPassToken = (foundUser) => {
    const resetPassTokenSecret = process.env.FORGOT_PASS_SECRET;
    const resetPassToken = jwt.sign(foundUser, resetPassTokenSecret, { expiresIn: "30min" });
    return resetPassToken;
};

export const verifyResetPassToken = (userString) => {
    const forgotPassTokenSecret = process.env.FORGOT_PASS_SECRET;
    const jwtVerifyUser = jwt.verify(userString, forgotPassTokenSecret, (err, user) => {
        if (err) {
            console.log(err);
            return { valid: false, user: null };
        } else return { valid: true, user };
    });
    return jwtVerifyUser;
};
