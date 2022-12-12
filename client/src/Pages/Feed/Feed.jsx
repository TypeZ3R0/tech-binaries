import React from "react";

import classes from "./Feed.module.css";
import RecentPostItem from "../../Components/RecentPostItem/RecentPostItem";
import posts from "../../blog_posts.js";
import { Link } from "react-router-dom";

const Feed = () => {
    return (
        <div className={classes.feed}>
            <div className={classes.popular}></div>
            <div className={classes.weekly}>
                <h1>THIS WEEK IN TIME</h1>
            </div>
            <div className={classes.recent}>
                <h1>RECENT POSTS</h1>
                {posts.slice(0).reverse().map((post) => {
                    return (
                        <Link style={{textDecoration: "none", color: "black"}} to={`posts/${post.id}`}>
                            <RecentPostItem
                                key={post.id}
                                imgUrl={post.imgUrl}
                                title={post.title}
                                author={post.author}
                                category={post.category}
                            />
                        </Link>
                    );
                })}
            </div>
            <div></div>
        </div>
    );
};

export default Feed;
