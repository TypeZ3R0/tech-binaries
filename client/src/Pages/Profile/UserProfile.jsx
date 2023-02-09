import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import classes from "./UserProfile.module.css";
import { axiosJWT } from "../../services/axios.js";
import baseURL from "../../backend.js";
import { UserContext } from "../../Contexts/UserContext";

const UserProfile = () => {
    const { user, dispatch } = useContext(UserContext);

    const navigate = useNavigate();

    const [name, setName] = useState({ firstName: "", lastName: "" });
    const [editMode, setEditMode] = useState(false);
    const [togglePass, setTogglePass] = useState({ enterPassField: false, email: false, pass: false });
    const [enteredPass, setEnteredPass] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (user) {
            setName((prevState) => {
                return { ...prevState, firstName: user.first_name, lastName: user.last_name };
            });
        }
    }, [user]);

    // Update name
    const handleNameUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosJWT.post(`${baseURL}users/update-name`, name);
            if (data.success) {
                setEditMode(false);
                dispatch({ type: "SET_RERENDER_STRING", payload: data.randString });
            }
        } catch (err) {
            console.log(err);
        }
    };

    console.log(name);

    // Verify password before changing email or password
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const { data } = await axiosJWT.post(`${baseURL}users/verify-password`, {
                enteredPass,
                email: togglePass.email,
                pass: togglePass.pass,
            });
            if (data.isValid && data.emailMessage) {
                setMessage(data.message);
            } else if (data.isValid && data.passMessage) {
                setMessage(data.message);
            }
        } catch (err) {
            console.log(err);
            setMessage(err.response.data.message);
        }
    };

    // Handle user delete
    const handleUserDelete = async (e) => {
        e.preventDefault();
        const { data } = await axiosJWT.delete(`${baseURL}users/delete-user`);
        if (data.userDeleteSuccess) {
            dispatch({ type: "REMOVE_USER" });
            navigate("/", { replace: true });
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <div className={classes.nameDiv}>
                        {editMode ? (
                            <form onSubmit={handleNameUpdate} className={classes.nameChangeForm}>
                                <input
                                    value={name.firstName}
                                    type={"text"}
                                    onChange={(e) => {
                                        setName((prevState) => {
                                            return { ...prevState, firstName: e.target.value };
                                        });
                                    }}
                                />
                                <input
                                    value={name.lastName}
                                    type={"text"}
                                    onChange={(e) => {
                                        setName((prevState) => {
                                            return { ...prevState, lastName: e.target.value };
                                        });
                                    }}
                                />
                                <button type={"submit"} className={classes.nameSaveBtn}>
                                    SAVE
                                </button>
                            </form>
                        ) : (
                            <h1 className={classes.name}>
                                {user.first_name} {user.last_name}
                            </h1>
                        )}
                        <button
                            className={classes.changeNameBtn}
                            onClick={() => {
                                setEditMode((prevState) => {
                                    return !prevState;
                                });
                            }}
                        >
                            Change name
                        </button>
                    </div>
                    <p className={classes.email}>{user.email}</p>
                    <button
                        className={classes.authActionsBtn}
                        onClick={() => {
                            setTogglePass((prevState) => {
                                return {
                                    ...prevState,
                                    enterPassField: !prevState.enterPassField,
                                    email: !prevState.email,
                                    pass: false,
                                };
                            });
                        }}
                    >
                        Change email
                    </button>
                    <button
                        className={classes.authActionsBtn}
                        onClick={() => {
                            setTogglePass((prevState) => {
                                return {
                                    ...prevState,
                                    enterPassField: !prevState.enterPassField,
                                    email: false,
                                    pass: !prevState.pass,
                                };
                            });
                        }}
                    >
                        Change password
                    </button>
                    <br />
                    <br />
                    {togglePass.enterPassField && (
                        <form onSubmit={handlePasswordSubmit} className={classes.passForm}>
                            <input
                                type={"password"}
                                placeholder="Please enter your password."
                                onChange={(e) => {
                                    setEnteredPass(e.target.value);
                                }}
                                value={enteredPass || ""}
                                required
                            />
                            <button type={"submit"} className={classes.passSubmitBtn}>
                                SUBMIT
                            </button>
                            {message.length !== 0 && <p>{message}</p>}
                        </form>
                    )}
                    <button className={classes.deleteUserBtn} onClick={handleUserDelete}>
                        Delete account
                    </button>
                </div>
            ) : (
                <h1>Please Login</h1>
            )}
        </div>
    );
};

export default UserProfile;
