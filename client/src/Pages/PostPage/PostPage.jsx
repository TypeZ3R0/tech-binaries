import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import classes from "./PostPage.module.css";
import axios from "axios";
import baseURL from "../../backend.js";

const PostPage = () => {

    const [post, setPost] = useState({});
    const { postId } = useParams();

    useEffect(() => {
        const getUniquePost = async () => {
            try {
                const { data } = await axios.get(`${baseURL}posts/${postId}`)
                setPost(data);
            } catch (err) {
                console.log(err);
            }
        }
        getUniquePost();
    }, []);

    return (
        <div className={classes.postPage}>
            <div className={classes.post}>
                <h4 className={classes.date}>{post.updatedAt}</h4>
                <h1 className={classes.postTitle}>{post.title}</h1>
                <img src={post.image} className={classes.postImage} alt="Post" />
                <div className={classes.postDesc} dangerouslySetInnerHTML={{__html: post.description}}></div>
            </div>
            <div className={classes.extras}></div>
        </div>
    );
};

export default PostPage;
