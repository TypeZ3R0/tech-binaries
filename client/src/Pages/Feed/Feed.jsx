import React, { useContext } from "react";

import classes from "./Feed.module.css";
import SinglePost from "../../Components/SinglePost/SinglePost";
import { Link } from "react-router-dom";
import { PostsContext } from "../../Contexts/PostContext.jsx";

const Feed = () => {
    const { posts } = useContext(PostsContext);

    return (
        <div className={classes.feed}>
            <div className={classes.popular}></div>
            <div className={classes.recent}>
                <h1>RECENT POSTS</h1>
                {posts ? (
                    <>
                        {posts.slice(0, 5).map((singlePost) => {
                            return (
                                <Link
                                    style={{ textDecoration: "none", color: "black" }}
                                    to={`posts/${singlePost.id}`}
                                    key={singlePost.id}
                                >
                                    <SinglePost
                                        key={singlePost.id}
                                        date={singlePost.updatedAt}
                                        imgUrl={singlePost.image}
                                        title={singlePost.title}
                                        author={singlePost.author.authorName}
                                    />
                                </Link>
                            );
                        })}
                        <Link to={"posts"} className={classes.allPostsLink}>
                            All Posts
                        </Link>
                    </>
                ) : (
                    <h1>No posts</h1>
                )}
            </div>
            <div></div>
        </div>
    );
};
export default Feed;
