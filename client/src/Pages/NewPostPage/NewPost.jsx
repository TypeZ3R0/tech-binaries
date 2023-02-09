import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import NewPostForm from "../../Components/NewPostForm/NewPostForm";
import { axiosJWT } from "../../services/axios.js";
import baseURL from "../../backend.js";
import { UserContext } from "../../Contexts/UserContext";
import { PostsContext } from "../../Contexts/PostContext";

// New post component
const NewPost = () => {

    const { user } = useContext(UserContext);
    const { dispatch } = useContext(PostsContext);

    const navigate = useNavigate();

    // Function which adds the post to Posts array
    const handleAddPost = async (blogPost) => {
        try {
            const { data } = await axiosJWT.post(`${baseURL}users/authors/create-post`, blogPost);
            if (data.success) {
                dispatch({ type: "POST_ADDED", payload: data.postId })
                navigate("/", { replace: true });
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {user && user.authorProfile ? (
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
