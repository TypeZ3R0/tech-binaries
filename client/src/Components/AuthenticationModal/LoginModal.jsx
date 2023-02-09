import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import classes from "./LoginModal.module.css";
import close_icon_black from "../../images/close_icon_black.svg";

import baseURL from "../../backend.js";
import { UserContext } from "../../Contexts/UserContext";

const LoginModal = (props) => {
    const { dispatch } = useContext(UserContext);
    const [message, setMessage] = useState("");
    const [userNotVerified, setUserNotVerified] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // Create login object with provided credentials
        const loginUser = { email, password };

        try {
            const { data } = await axios.post(`${baseURL}users/login`, loginUser);
            dispatch({ type: "LOGIN_USER", payload: data.userId });
            props.closeClick();
        } catch (err) {
            console.log(err);
            if (err.response.data.userNotVerified) {
                setUserNotVerified(err.response.data.userNotVerified);
                setMessage(err.response.data.message);
            } else {
                setMessage(err.response.data.message);
            }
        }
    };

    return (
        <div className={classes.registerModal}>
            <div className={classes.backdrop} onClick={props.closeClick} />
            <div className={classes.modal}>
                <button className={classes.closeButton} onClick={props.closeClick}>
                    <img src={close_icon_black} alt="Close" />
                </button>
                <h1>Welcome back!</h1>
                <p>How's your day going today?</p>
                {message && <h4>{message}</h4>}
                {userNotVerified && (
                    <Link style={{ textDecoration: "none", color: "#207879" }} to={"users/resend-verification-email"}>
                        RESEND VERIFICATION LINK
                    </Link>
                )}
                <form className={classes.loginForm} onSubmit={handleLoginSubmit}>
                    <input type={"email"} placeholder="Email" required ref={emailRef} className={classes.loginInput} />
                    <input
                        type={"password"}
                        placeholder="Password"
                        required
                        ref={passwordRef}
                        className={classes.loginInput}
                    />
                    <button type={"submit"}>LOGIN</button>
                </form>
                <div style={{ width: "60%", height: "0.8px", backgroundColor: "#000" }} />
                <div className={classes.authOptions}>
                    <span>
                        Go to{" "}
                        <span className={classes.registerComponent} onClick={props.openRegister}>
                            Register
                        </span>
                    </span>
                    <span>
                        <Link style={{ textDecoration: "none", color: "#126466" }} to={"/users/forgot-password"}>
                            Forgot Password?
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
