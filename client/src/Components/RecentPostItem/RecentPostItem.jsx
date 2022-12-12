import React from "react";

import classes from "./RecentPostItem.module.css";

const RecentPostItem = (props) => {
    return (
        <div className={classes.recentPostItem}>
            <img src={props.imgUrl} alt="" className={classes.img} />
            <div className={classes.postDetails}>
                <div className={classes.postInfo}>
                    <h4>04-Dec-2022</h4>
                    <p className={classes.postTitle}>{props.title}</p>
                </div>
                <div className={classes.extraInfo}>
                    <h4>{props.author}</h4>
                    <h4>{props.category}</h4>
                </div>
            </div>
        </div>
    );
};

export default RecentPostItem;
