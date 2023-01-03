import React from "react";

import classes from "./AuthorPosts.module.css";

const AuthorPosts = () => {
    return (
        <div>
            <h3 className={classes.info}>MY POSTS:</h3>
            <div style={{ textAlign: "center" }}>No posts yet.</div>
        </div>
    );
};

export default AuthorPosts;
