import React from "react";
import { useNavigate } from "react-router-dom";

import NewPostForm from "../../Components/NewPostForm/NewPostForm";

import posts from "../../blog_posts";

// New post component
const NewPost = () => {
    const navigate = useNavigate();

    // Function which adds the post to Posts Collection
    const handleAddPost = (blogPost) => {
        posts.push(blogPost);
        navigate("/", { replace: true });
    };

    return (
        <div>
            <h1 style={{ fontSize: "2rem" }}>Create a new post</h1>

            {/* New post form which gives the post object on form submission */}
            <NewPostForm onAddPost={handleAddPost} />
        </div>
    );
};

export default NewPost;
