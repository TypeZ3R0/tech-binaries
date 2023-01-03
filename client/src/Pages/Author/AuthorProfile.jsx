import React, { useState, useEffect } from "react";

import classes from "./AuthorProfile.module.css";
import { axiosJWT } from "../../services/axios.js";
import baseURL from "../../backend.js";
import { getCookie } from "../../services/cookie.js";
import AuthorStatistics from "../../Components/AuthorStatistics/AuthorStatistics";
import AuthorPosts from "../../Components/AuthorPosts/AuthorPosts";

const AuthorProfile = () => {
    const [author, setAuthor] = useState({});
    const [authorPosts, setAuthorPosts] = useState([])

    useEffect(() => {
        const getAuthor = async () => {
            const accessToken = getCookie("accessToken");
            try {
                const { data } = await axiosJWT.get(`${baseURL}users/authors/author-dashboard`, {
                    headers: { authorization: `Bearer ${accessToken}` },
                });
                setAuthor(data.authorObject);
                setAuthorPosts(data.authorPosts);
            } catch (err) {
                console.log(err);
            }
        };
        getAuthor();
    }, [axiosJWT]);

    return (
        <div>
            {author ? (
                <div>
                    <h1 className={classes.title}>AUTHOR PROFILE AND DASHBOARD</h1>
                    <div className={classes.authorDashboard}>
                        <AuthorStatistics key={author.id} authorName={author.authorName} authorBio={author.bio} postCount={authorPosts.length} />
                        <AuthorPosts />
                    </div>
                </div>
            ) : (
                <h1>404</h1>
            )}
        </div>
    );
};

export default AuthorProfile;
