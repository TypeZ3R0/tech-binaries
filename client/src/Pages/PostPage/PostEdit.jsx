import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

import classes from "./PostEdit.module.css";
import { axiosJWT } from "../../services/axios";
import baseURL from "../../backend";
import { PostsContext } from "../../Contexts/PostContext";
import { UserContext } from "../../Contexts/UserContext";

const PostEdit = () => {
    const { postId } = useParams();

    const { user } = useContext(UserContext);
    const { dispatch } = useContext(PostsContext);

    const [postAuthorId, setPostAuthorId] = useState();
    const [description, setDescription] = useState();
    const [title, setTitle] = useState();
    const [image, setImage] = useState();
    const [updatedImage, setUpdatedImage] = useState();
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const getUniquePost = async () => {
            try {
                const { data } = await axiosJWT.get(`${baseURL}users/authors/edit-post/${postId}`);
                if (data.foundPost) {
                    setTitle(data.foundPost.title);
                    setDescription(data.foundPost.description);
                    setPostAuthorId(data.foundPost.authorId);
                    setImage(data.foundPost.image);
                }
            } catch (err) {
                console.log(err);
            }
        };
        getUniquePost();
    }, [axiosJWT]);

    // Image input handler
    const handleImageInput = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
                setUpdatedImage(reader.result);
            };
        }
    };

    // Post edit handler
    const handlePostEdit = async (e) => {
        e.preventDefault();
        if (user.authorProfile.id === postAuthorId)
            try {
                const { data } = await axiosJWT.patch(`${baseURL}users/authors/edit-post/${postId}`, {
                    title,
                    description,
                    image: updatedImage || null,
                });
                if (data.success) {
                    dispatch({ type: "POST_UPDATE", payload: data.updatedPostId });
                    navigate(`/posts/${postId}`, { replace: true });
                }
            } catch (err) {
                console.log(err);
            }
        else setError("You are not the author of this post");
    };

    return (
        <div className={classes.postEditPage}>
            {error.length === 0 ? (
                <div>
                    <img src={image} alt="post_pic" className={classes.postImage} />
                    <form onSubmit={handlePostEdit}>
                        <input type={"file"} onChange={handleImageInput} />
                        <br />
                        <br />
                        <textarea
                            value={title || ""}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            className={classes.postTitleArea}
                        />
                        <Editor
                            apiKey={process.env.REACT_APP_TINY_API_KEY}
                            onEditorChange={(newValue, editor) => {
                                return setDescription(newValue);
                            }}
                            value={description}
                            init={{
                                height: 600,
                                width: "100%",
                                menubar: true,
                                /* enable title field in the Image dialog*/
                                image_title: true,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "image",
                                    "code",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar:
                                    "undo redo | formatselect | " +
                                    "bold italic backcolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                        <button type={"submit"} className={classes.saveChangesBtn}>
                            SAVE
                        </button>
                    </form>
                </div>
            ) : (
                <p>{error}</p>
            )}
        </div>
    );
};

export default PostEdit;
