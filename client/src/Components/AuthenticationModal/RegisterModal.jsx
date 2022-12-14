import React from "react";
import { Link } from "react-router-dom";

import classes from "./RegisterModal.module.css";
import close_icon_black from "../../images/close_icon_black.svg"

const Register = (props) => {
    return (
        <div className={classes.registerModal}>
            <div className={classes.backdrop} onClick={props.closeClick} />
            <div className={classes.modal}>
                <button className={classes.closeButton} onClick={props.closeClick}>
                    <img src={close_icon_black} alt="Close" />
                </button>
				<h1>Welcome!</h1>
                <p>Become a <span>TECH BINARIES</span> reader today</p>
                <form className={classes.registerForm}>
                    <div className={classes.name}>
                        <input type={"text"} placeholder="First name" className={classes.firstName} required />
                        <input type={"text"} placeholder="Last name" required />
                    </div>
                    <input type={"email"} placeholder="Email" required />
                    <input type={"password"} placeholder="Password" required />
                    <button type={"submit"}>REGISTER</button>
                </form>
                <div style={{ width: "60%", height: "0.8px", backgroundColor: "#000"}} />
                <div className={classes.authOptions}>
                    <span>Go to <span className={classes.loginComponent} onClick={props.openLogin}>Login</span></span>
                    <span><Link style={{textDecoration: "none", color: "#126466"}}>Forgot Password?</Link></span>
                </div>
            </div>
        </div>
    );
};

export default Register;
