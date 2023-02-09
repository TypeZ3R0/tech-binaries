import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import classes from "./ResetPassword.module.css";
import baseURL from "../../backend.js";
import axios from "axios";
import { axiosJWT } from "../../services/axios";
import { UserContext } from "../../Contexts/UserContext";

const UpdateEmail = () => {
    const { userString } = useParams();

    const { dispatch } = useContext(UserContext);

    const [newEmail, setNewEmail] = useState();
    const [linkValid, setLinkValid] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getUpdateEmailPage = async () => {
            try {
                const { data } = await axios.get(`${baseURL}users/update-email/${userString}`);
                if (!data.linkExpired) setLinkValid(true);
            } catch (err) {
                console.log(err);
            }
        };
        getUpdateEmailPage();
    });

    // Handle email update
    const handleEmailUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.patch(`${baseURL}users/update-email/${userString}`, { newEmail });
            if (data.emailUpdateSuccess) {
                setMessage(data.message);
                dispatch({ type: "REMOVE_USER" });
                dispatch({ type: "REMOVE_AUTHOR" });
            }
        } catch (err) {
            setMessage(err.response.data.message);
        }
    };

    return (
        <div className={classes.forgotPassDiv}>
            <div>
                {linkValid ? (
                    <form className={classes.forgotPassForm} onSubmit={handleEmailUpdateSubmit}>
                        <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#2c3531" }}>ENTER NEW EMAIL</h1>
                        <div>
                            <input
                                type={"email"}
                                placeholder="Enter your new email."
                                className={classes.emailField}
                                onInput={(e) => {
                                    setNewEmail(e.target.value);
                                }}
                                value={newEmail || ""}
                                required
                            />
                            <button type={"submit"}>SUBMIT</button>
                        </div>
                        {message.length !== 0 && <p>{message}</p>}
                    </form>
                ) : (
                    <p>Link expired</p>
                )}
            </div>
        </div>
    );
};

export default UpdateEmail;
