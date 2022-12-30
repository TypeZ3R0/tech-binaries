import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NewPostForm from "../../Components/NewPostForm/NewPostForm";

import posts from "../../blog_posts";
import { axiosJWT } from "../../services/axios.js";
import baseURL from "../../backend.js";
import { getCookie } from "../../services/cookie";

// New post component
const NewPost = () => {
    const [isAuthor, setIsAuthor] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const getAuthor = async () => {
            const accessToken = getCookie("accessToken");
            try {
                const { data } = await axiosJWT.get(`${baseURL}users/authors/create-post`, {
                    headers: { authorization: `Bearer ${accessToken}` },
                });
                setIsAuthor(data.authorId);
            } catch (err) {
                console.log(err);
            }
        };
        getAuthor();
    }, [axiosJWT]);

    // Function which adds the post to Posts Collection
    const handleAddPost = (blogPost) => {
        posts.push(blogPost);
        navigate("/", { replace: true });
    };

    return (
        <div>
            {isAuthor ? (
                <div>
                    <h1 style={{ fontSize: "2rem" }}>Create a new post</h1>
                    {/* New post form which gives the post object on form submission */}
                    <NewPostForm onAddPost={handleAddPost} />
                </div>
            ) : (
                <h1>NOT FOUND</h1>
            )}
        </div>
    );
};

export default NewPost;
