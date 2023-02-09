import React, { useState, useEffect, useContext } from "react";

import classes from "./AuthorProfile.module.css";
import { axiosJWT } from "../../services/axios.js";
import baseURL from "../../backend.js";
import AuthorStatistics from "../../Components/AuthorStatistics/AuthorStatistics";
import AuthorPosts from "../../Components/AuthorPosts/AuthorPosts";
import { UserContext } from "../../Contexts/UserContext";
import AuthorCreate from "./AuthorCreate";

const AuthorProfile = () => {
    const [authorName, setAuthorName] = useState("");
    const [authorBio, setAuthorBio] = useState("");
    const [authorPosts, setAuthorPosts] = useState([]);
    const [deletedPostId, setDeletedPostId] = useState("");

    const { user, author } = useContext(UserContext);

    const rerenderPostsOnDelete = (postId) => {
        setDeletedPostId(postId);
    };

    useEffect(() => {
        const getAuthorPosts = async () => {
            try {
                const { data } = await axiosJWT.get(`${baseURL}users/authors/author-posts`);
                setAuthorPosts(data.authorPosts);
            } catch (err) {
                console.log(err);
            }
        };
        getAuthorPosts();
    }, [axiosJWT, deletedPostId]);

    console.log({ authorName, authorBio });

    return (
        <div>
            {user && (
                <div>
                    {user.isAuthor && !author && <AuthorCreate />}
                    {user.isAuthor && author && (
                        <div>
                            <h1 className={classes.title}>AUTHOR PROFILE AND DASHBOARD</h1>
                            <div className={classes.authorDashboard}>
                                <AuthorStatistics
                                    key={author.id}
                                    authorName={author.authorName}
                                    authorBio={author.bio}
                                    postCount={authorPosts.length}
                                />
                                <AuthorPosts authorPosts={authorPosts} onPostDelete={rerenderPostsOnDelete} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AuthorProfile;
