import React, { useRef } from "react";
import { Link } from "react-router-dom";

import classes from "./LoginModal.module.css";
import close_icon_black from "../../images/close_icon_black.svg";

const LoginModal = (props) => {
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        // Create login object with provided credentials
        const loginUser = { email, password };
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
                <form className={classes.loginForm} onSubmit={handleLoginSubmit}>
                    <input type={"email"} placeholder="Email" required />
                    <input type={"password"} placeholder="Password" required />
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
                        <Link style={{ textDecoration: "none", color: "#126466" }}>Forgot Password?</Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
