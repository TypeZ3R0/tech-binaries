import React, { useState } from "react";
import axios from "axios";

import classes from "./ForgotPassword.module.css";
import baseURL from "../../backend.js";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const handleForgotPass = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${baseURL}users/forgot-password`, { email });
            if (data.success) {
                setEmail("");
                setMessage(data.message);
            }
        } catch (err) {
            if (!err.response.data.success) {
                setSuccess(err.response.data.success);
                setMessage(err.response.data.message);
            }
        }
    };

    return (
        <div className={classes.forgotPassDiv}>
            <form className={classes.forgotPassForm} onSubmit={handleForgotPass}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#2c3531" }}>FORGOT PASSWORD?</h1>
                <div>
                    <input
                        type={"email"}
                        placeholder="Enter your email."
                        className={classes.emailField}
                        onInput={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email || ""}
                        required
                    />
                    <button type={"submit"}>SUBMIT</button>
                </div>
                {!success ? (
                    <p>{message || "Enter your valid email. We will send you a reset password form link."}</p>
                ) : (
                    <p>{message || "Enter your valid email. We will send you a reset password form link."}</p>
                )}
            </form>
        </div>
    );
};

export default ForgotPassword;
