import React, { useState } from "react";

import classes from "./AddComment.module.css";
import { axiosJWT } from "../../services/axios";
import baseURL from "../../backend";

const AddComment = (props) => {
    const [inputComment, setInputComment] = useState("");

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const commentValue = inputComment;
        try {
            const { data } = await axiosJWT.post(`${baseURL}posts/${props.postId}/create-comment`, {
                userComment: commentValue,
            });
            if (data.commentAdded) {
                props.success(data.commentAdded);
                setInputComment("");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <form className={classes.addComment} onSubmit={handleCommentSubmit}>
                <textarea
                    className={classes.commentInput}
                    placeholder={"Add a comment..."}
                    onChange={(e) => {
                        setInputComment(e.target.value);
                    }}
                    value={inputComment}
                    required
                />
                <button type={"submit"} className={classes.commentPostBtn}>
                    POST
                </button>
            </form>
        </>
    );
};

export default AddComment;
