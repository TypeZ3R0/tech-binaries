import React from "react";

import classes from "./SinglePost.module.css";

const SinglePost = (props) => {
    return (
        <div className={classes.recentPostItem}>
            <img src={props.imgUrl} alt="" className={classes.img} />
            <div className={classes.postDetails}>
                <div className={classes.postInfo}>
                    <h4>{new Date(props.date).toDateString() || null}</h4>
                    <p className={classes.postTitle}>{props.title}</p>
                </div>
                <div className={classes.extraInfo}>
                    <h4>{props.author || null}</h4>
                </div>
            </div>
        </div>
    );
};

export default SinglePost;
