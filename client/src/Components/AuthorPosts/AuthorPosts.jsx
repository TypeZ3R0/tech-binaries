import React, { useContext } from "react";
import { Link } from "react-router-dom";

import classes from "./AuthorPosts.module.css";
import SinglePost from "../SinglePost/SinglePost.jsx";
import { axiosJWT } from "../../services/axios.js";
import baseURL from "../../backend";
import { PostsContext } from "../../Contexts/PostContext";
import { UserContext } from "../../Contexts/UserContext";

const AuthorPosts = (props) => {
    const { author } = useContext(UserContext);
    const { dispatch } = useContext(PostsContext);

    const handlePostDelete = async (postId) => {
        try {
            const { data } = await axiosJWT.delete(`${baseURL}users/authors/delete-post/${postId}`);
            props.onPostDelete(data.id);
            dispatch({ type: "POST_DELETE", payload: data.id });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h3 className={classes.info}>MY POSTS:</h3>
            {props.authorPosts.length !== 0 ? (
                <div>
                    {props.authorPosts.map((singlePost) => {
                        return (
                            <div key={singlePost.id} className={classes.authorPosts}>
                                <Link
                                    style={{ textDecoration: "none", color: "black" }}
                                    to={`/posts/${singlePost.id}`}
                                    key={singlePost.id}
                                >
                                    <SinglePost
                                        key={singlePost.id}
                                        date={singlePost.updatedAt}
                                        imgUrl={singlePost.image}
                                        title={singlePost.title}
                                        authorId={singlePost.authorId}
                                    />
                                </Link>
                                {singlePost.authorId === author.id && (
                                    <div className={classes.postActions}>
                                        <Link
                                            to={`/users/authors/edit-post/${singlePost.id}`}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <button className={classes.postEditBtn}>EDIT</button>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handlePostDelete(singlePost.id);
                                            }}
                                            className={classes.postDeleteBtn}
                                        >
                                            DELETE
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div style={{ textAlign: "center" }}>No posts yet.</div>
            )}
        </div>
    );
};

export default AuthorPosts;
