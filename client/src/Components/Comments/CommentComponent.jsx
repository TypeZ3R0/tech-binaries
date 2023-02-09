import React, { useContext } from "react";

import { axiosJWT } from "../../services/axios";
import classes from "./CommentComponent.module.css";
import baseURL from "../../backend";
import { UserContext } from "../../Contexts/UserContext";

const CommentComponent = (props) => {
    const { user } = useContext(UserContext);

    const handleCommentDelete = async () => {
        const { data } = await axiosJWT.delete(`${baseURL}posts/${props.postId}/delete-comment/${props.commentId}`);
        props.commentDeleted(data.success);
    };

    return (
        <div className={classes.commentDiv}>
            <div>
                <h3 className={classes.commentUser}>
                    {props.first_name} {props.last_name}
                </h3>
                <p className={classes.commentString}>{props.commentString}</p>
            </div>
            <div>
                {user && props.userId === user.id && (
                    <button onClick={handleCommentDelete} className={classes.deleteBtn}>
                        DELETE
                    </button>
                )}
            </div>
        </div>
    );
};

export default CommentComponent;
