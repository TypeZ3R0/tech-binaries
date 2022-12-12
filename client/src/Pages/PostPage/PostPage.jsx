import React from "react";

import classes from "./PostPage.module.css";

const PostPage = (props) => {
    return (
        <div className={classes.postPage}>
            <div className={classes.post}>
                <h4 className={classes.date}>Published on 07 Dec 2022</h4>
                <h1 className={classes.postTitle}>{props.title}</h1>
                <img src={props.imgUrl} className={classes.postImage} alt="Post" />
                <p className={classes.postDesc}>{props.description}</p>
            </div>
            <div className={classes.extras}></div>
        </div>
    );
};

export default PostPage;
