import React, { useEffect, createContext, useReducer } from "react";
import UserReducer from "../Reducers/UserReducer.js";
import { axiosJWT } from "../services/axios.js";
import baseURL from "../backend.js";

const INITIAL_STATE = {
    user: null,
    author: null,
    loggedInUserId: null,
    rerender: "",
};
export const UserContext = createContext(INITIAL_STATE);

export const UserProvider = (props) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
    // Get user
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await axiosJWT.get(`${baseURL}users/get-user`);
                if (data) {
                    dispatch({ type: "SET_USER", payload: data.user });
                    if (data.user.authorProfile && data.user.isAuthor)
                        dispatch({ type: "SET_AUTHOR", payload: data.user.authorProfile });
                }
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [axiosJWT, state.loggedInUserId, state.rerender]);

    return (
        <UserContext.Provider
            value={{
                user: state.user,
                author: state.author,
                dispatch,
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
};
