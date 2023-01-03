import React, { useState, useEffect } from "react";

import classes from "./Feed.module.css";
import RecentPostItem from "../../Components/RecentPostItem/RecentPostItem";
// import posts from "../../blog_posts.js";
import { Link } from "react-router-dom";
import axios from "axios";
import baseURL from "../../backend.js";

const Feed = () => {
    const [feedPosts, setFeedPosts] = useState([]);

    useEffect(() => {
        const getFeedPosts = async () => {
            try {
                const { data } = await axios.get(`${baseURL}`);
                setFeedPosts(data);
            } catch (err) {
                console.log(err);
            }
        };
        getFeedPosts();
    }, []);

    return (
        <div className={classes.feed}>
            <div className={classes.popular}></div>
            <div className={classes.weekly}>
                <h1>THIS WEEK IN TIME</h1>
            </div>
            <div className={classes.recent}>
                <h1>RECENT POSTS</h1>
                {feedPosts
                    ? feedPosts.map((feedPost) => {
                          return (
                              <Link style={{ textDecoration: "none", color: "black" }} to={`posts/${feedPost.id}`}>
                                  <RecentPostItem
                                      key={feedPost.id}
                                      imgUrl={feedPost.image}
                                      title={feedPost.title}
                                      author={feedPost.author.authorName}
                                      category={feedPost.category}
                                  />
                              </Link>
                          );
                      })
                    : <h1>No posts</h1>}
            </div>
            <div></div>
        </div>
    );
};
export default Feed;
