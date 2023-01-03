import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NewPostForm from "../../Components/NewPostForm/NewPostForm";
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
    const handleAddPost = async (blogPost) => {
        const accessToken = getCookie("accessToken");
        try {
            const { data } = await axiosJWT.post(`${baseURL}users/authors/create-post`, blogPost, {
                headers: { authorization: `Bearer ${accessToken}` },
            });
            if (data) {
                navigate("/", { replace: true });
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {isAuthor ? (
                <div>
                    <h1 style={{ fontSize: "2rem" }}>CREATE A NEW POST</h1>
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
