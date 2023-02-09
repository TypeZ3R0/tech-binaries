import React, { useEffect, useState } from "react";

import classes from "./Comments.module.css";
import axios from "axios";
import baseURL from "../../backend";
import CommentComponent from "./CommentComponent";

const Comments = (props) => {
    const [comments, setComments] = useState([]);
    const [commentId, setCommentId] = useState([]);
    const [totalComments, setTotalComments] = useState();

    useEffect(() => {
        const getPostComments = async () => {
            try {
                const { data } = await axios.get(`${baseURL}posts/${props.postId}/comments`);
                setComments(data);
                setTotalComments(data.length);
            } catch (err) {
                console.log(err);
            }
        };
        getPostComments();
    }, [props.commentAdded, commentId]);

    const handleDeletedComment = async (success) => {
        setCommentId(success)
    }

    return (
        <div className={classes.commentsDiv}>
            <h2 className={classes.title}> {totalComments} Comments:</h2>
            {comments.length === 0 ? (
                <p style={{ color: "#0000006b", textAlign: "center", fontSize: "0.8rem" }}>Be the first to comment.</p>
            ) : (
                comments.map((comment) => {
                    return (
                        <CommentComponent
                            key={comment.id}
                            commentId={comment.id}
                            commentString={comment.userComment}
                            first_name={comment.user.first_name}
                            last_name={comment.user.last_name}
                            postId={props.postId}
                            userId={comment.user.id}
                            commentDeleted={handleDeletedComment}
                        />
                    );
                })
            )}
        </div>
    );
};

export default Comments;
