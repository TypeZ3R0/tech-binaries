import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import classes from "./ResetPassword.module.css";
import baseURL from "../../backend.js";

const ResetPassword = () => {
    const { userString } = useParams();
    const [password, setPassword] = useState();
    const [linkValid, setLinkValid] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const getResetPassPage = async () => {
            try {
                const { data } = await axios.get(`${baseURL}users/reset-password/${userString}`);
                if (data.valid) setLinkValid(data.valid);
            } catch (err) {
                console.log(err);
            }
        };
        getResetPassPage();
    });

    const handleResetPassFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${baseURL}users/reset-password/${userString}`, { password });
            if (data.success) setSuccess(data.success);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={classes.forgotPassDiv}>
            {!success ? (
                <div>
                    {linkValid ? (
                        <form className={classes.forgotPassForm} onSubmit={handleResetPassFormSubmit}>
                            <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#2c3531" }}>
                                ENTER NEW PASSWORD
                            </h1>
                            <div>
                                <input
                                    type={"password"}
                                    placeholder="Enter your new password."
                                    className={classes.emailField}
                                    onInput={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    value={password || ""}
                                    required
                                />
                                <button type={"submit"}>SUBMIT</button>
                            </div>
                        </form>
                    ) : (
                        <p>Link expired</p>
                    )}
                </div>
            ) : (
                <Link to={"/"}>GO HOME</Link>
            )}
        </div>
    );
};

export default ResetPassword;
