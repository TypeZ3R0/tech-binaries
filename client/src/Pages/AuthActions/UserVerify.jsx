import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import baseURL from "../../backend";
import { UserContext } from "../../Contexts/UserContext";

const UserVerify = () => {
    const { userString } = useParams();

    const { dispatch } = useContext(UserContext);

    const [message, setMessage] = useState("");
    const [emailResend, setEmailResend] = useState(false);

    useEffect(() => {
        const getUserVerifyPage = async () => {
            try {
                const { data } = await axios.get(`${baseURL}users/verify/${userString}`);
                if (data.verifySuccess) {
                    dispatch({ type: "REMOVE_USER" });
                    dispatch({ type: "REMOVE_AUTHOR" });
                    setMessage(data.message);
                }
            } catch (err) {
                console.log(err);
                if (!err.response.data.verifySuccess) {
                    setEmailResend(true);
                    setMessage(err.response.data.message);
                }
            }
        };
        getUserVerifyPage();
    });
    return (
        <div>
            {message.length !== 0 && <p>{message}</p>}
            {emailResend && <Link to={"/users/resend-verification-email"}>RESEND EMAIL</Link>}
            <br />
            <Link to={"/"}>GO HOME</Link>
        </div>
    );
};

export default UserVerify;
