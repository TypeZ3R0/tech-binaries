import React, { useRef, useState } from "react";
import axios from "axios";

import classes from "./RegisterModal.module.css";
import close_icon_black from "../../images/close_icon_black.svg";
import baseURL from "../../backend.js";

const RegisterModal = (props) => {
    const [msg, setMsg] = useState("");

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const user = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
        };
        try {
            const { data } = await axios.post(`${baseURL}users/register`, user);
            setMsg(data.message);
            // props.closeClick();
        } catch (error) {
            console.log(error);
            setMsg(error.response.data.message);
        }
    };

    return (
        <div className={classes.registerModal}>
            <div className={classes.backdrop} onClick={props.closeClick} />
            <div className={classes.modal}>
                <button className={classes.closeButton} onClick={props.closeClick}>
                    <img src={close_icon_black} alt="Close" />
                </button>
                <h1>Welcome!</h1>
                <p>
                    Become a <span>TECH BINARIES</span> reader today
                </p>
                {msg.length > 0 && <h4>{msg}</h4>}
                <form className={classes.registerForm} onSubmit={handleRegisterSubmit}>
                    <div className={classes.name}>
                        <input
                            type={"text"}
                            placeholder="First name"
                            ref={firstNameRef}
                            required
                            className={classes.registerInput}
                        />
                        <input
                            type={"text"}
                            placeholder="Last name"
                            ref={lastNameRef}
                            required
                            className={classes.registerInput}
                        />
                    </div>
                    <input
                        type={"email"}
                        placeholder="Email"
                        ref={emailRef}
                        required
                        className={classes.registerInput}
                    />
                    <input
                        type={"password"}
                        placeholder="Password"
                        ref={passwordRef}
                        required
                        className={classes.registerInput}
                    />
                    <button type={"submit"}>REGISTER</button>
                </form>
                <div style={{ width: "60%", height: "0.8px", backgroundColor: "#000" }} />
                <div className={classes.authOptions}>
                    <span>
                        Go to{" "}
                        <span className={classes.loginComponent} onClick={props.openLogin}>
                            Login
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
