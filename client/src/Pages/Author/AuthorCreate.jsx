import React, { useContext, useState } from "react";

import classes from "./AuthorCreate.module.css";
import { axiosJWT } from "../../services/axios";
import baseURL from "../../backend";
import { UserContext } from "../../Contexts/UserContext";

const AuthorCreate = () => {
    const { dispatch } = useContext(UserContext);

    const [authorName, setAuthorName] = useState("");
    const [authorBio, setAuthorBio] = useState("");

    const handleAuthorCreation = async (e) => {
        e.preventDefault();
        const { data } = await axiosJWT.post(`${baseURL}users/authors/author-create`, { authorName, authorBio });
        dispatch({ type: "SET_RERENDER_STRING", payload: data.authorId });
    };

    return (
        <div>
            <h1 className={classes.title}>CREATE AUTHOR PROFILE</h1>
            <form className={classes.authorProfileForm}>
                <p>
                    You don't have any author profile. <br /> Create one and be a <strong>TECH BINARIES</strong> writer
                    today!
                </p>
                <input
                    type={"text"}
                    onInput={(e) => setAuthorName(e.target.value)}
                    value={authorName}
                    placeholder="Author name."
                    required
                />
                <textarea
                    onInput={(e) => setAuthorBio(e.target.value)}
                    value={authorBio}
                    placeholder="Write about yourself."
                    required
                />
                <button className={classes.createAuthorBtn} type={"submit"} onClick={handleAuthorCreation}>
                    CREATE PROFILE
                </button>
            </form>
        </div>
    );
};

export default AuthorCreate;
