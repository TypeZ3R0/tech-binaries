import React from "react";
import { Link } from "react-router-dom";

import classes from "./AuthorStatistics.module.css";

const AuthorStatistics = (props) => {
    return (
        <div className={classes.authorStatisticsDiv}>
            <h1 className={classes.authorName}>{props.authorName}</h1>
            <p className={classes.authorBio}>{props.authorBio}</p>
            <p className={classes.postCount}>TOTAL POSTS: {props.postCount}</p>
            <Link style={{ textDecoration: "none" }} to={"/users/authors/create-post"}>
                <div className={classes.createPostLink}>CREATE POST</div>
            </Link>
        </div>
    );
};

export default AuthorStatistics;
