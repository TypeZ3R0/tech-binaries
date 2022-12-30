import React, { useEffect, useState } from "react";

import classes from "./UserProfile.module.css";
import { axiosJWT } from "../../services/axios.js";
import baseURL from "../../backend.js";
import { getCookie } from "../../services/cookie.js";

const UserProfile = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        const getUserProfile = async () => {
            const accessToken = getCookie("accessToken");
            try {
                const { data } = await axiosJWT.get(`${baseURL}users/profile`, {
                    headers: { authorization: `Bearer ${accessToken}` },
                });
                setUser(data);
            } catch (err) {
                console.log(err);
            }
        };
        getUserProfile();
    }, [axiosJWT]);

    return (
        <div>
            {user ? (
                <div>
                    <h1 className={classes.name}>
                        {user.userFirstName} {user.userLastName}
                    </h1>
                    <p className={classes.email}>{user.userEmail}</p>
                </div>
            ) : (
                <h1>Please Login</h1>
            )}
        </div>
    );
};

export default UserProfile;
