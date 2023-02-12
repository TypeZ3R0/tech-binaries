import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import close_icon_black from "../../images/close_icon_black.svg";
import classes from "./NewPostForm.module.css";
import axios from "axios";
import baseURL from "../../backend";
import { axiosJWT } from "../../services/axios";

const NewPostForm = (props) => {
    const [enteredImg, setEnteredImg] = useState();
    const [tags, setTags] = useState([]);
    const [deletedTags, setDeletedTags] = useState();
    const [showTagForm, setShowTagForm] = useState(false);
    const [error, setError] = useState("");
    const [addTagSuccess, setAddTagSuccess] = useState("");
    const [tagArray, setTagArray] = useState([]);

    // Get all tags
    useEffect(() => {
        const getTags = async () => {
            try {
                const { data } = await axios.get(`${baseURL}category/tags`);
                if (data) setTags(data);
            } catch (err) {
                console.log(err);
            }
        };
        getTags();
    }, [addTagSuccess, deletedTags]);

    const createTagRef = useRef();

    // Post contents
    const titleInputRef = useRef();
    const imgInputRef = useRef();
    const descriptionInputRef = useRef();

    // Toggle add tag form
    const handleCreateTagToggle = (e) => {
        e.preventDefault();
        setShowTagForm((prevState) => {
            return !prevState;
        });
    };

    // Check if entered tag is valid
    const isTagValid = (tag) => {
        if (tag[0] === "#") {
            return true;
        } else {
            return false;
        }
    };

    // Handle create tag form submit
    const handleTagCreate = async (e) => {
        e.preventDefault();
        const enteredTag = createTagRef.current.value;
        const lowerTag = enteredTag.toLowerCase();
        const validTag = isTagValid(lowerTag);
        if (validTag) {
            try {
                const { data } = await axios.post(`${baseURL}category/tags/create-tag`, { tag: lowerTag });
                setAddTagSuccess(data.id);
                if (data) {
                    createTagRef.current.value = "";
                }
            } catch (err) {
                if (err) {
                    setError(err.response.data.error);
                }
            }
        } else {
            setError("Not a valid tag, tags must start with #");
        }
    };

    // Add tag to array when checked and remove when unchecked
    const handleTagInputChange = (e) => {
        if (e.target.checked)
            setTagArray((prevTagArrayState) => {
                return [...prevTagArrayState, e.target.value];
            });
        else
            setTagArray((prevTagArrayState) => {
                return prevTagArrayState.filter((tag) => {
                    return tag !== e.target.value;
                });
            });
    };

    // Handle tag delete
    const handleTagDelete = async (tagId) => {
        try {
            const { data } = await axiosJWT.delete(`${baseURL}category/tags/${tagId}`);
            if (data.deleteTagSuccess) {
                setDeletedTags(data.deletedTagId);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Convert image data to url format
    const handleImageUpload = () => {
        const file = imgInputRef.current.files[0];
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setEnteredImg(reader.result);
            };
        }
    };

    // Handle create post form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.getContent();

        const blogPost = {
            title: enteredTitle,
            image: enteredImg,
            description: enteredDescription,
            tags: tagArray,
        };
        // console.log(blogPost);
        await props.onAddPost(blogPost);
    };

    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit}>
                <textarea name="title" className={classes.titleArea} ref={titleInputRef} required placeholder="Title" />
                <div className={classes.imgUrl}>
                    <input type={"file"} ref={imgInputRef} onChange={handleImageUpload} className={classes.imgInput} />
                </div>
                <Editor
                    apiKey={process.env.REACT_APP_TINY_API_KEY}
                    onInit={(evt, editor) => {
                        descriptionInputRef.current = editor;
                    }}
                    initialValue="<p style='font-size: 1.2rem';>Press<strong> Ctrl + Shift + F </strong>to make the description box fullscreen.</p><p>PLEASE DELETE THIS CONTENT</P>"
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
                <div className={classes.tags}>
                    {tags ? (
                        <>
                            <div className={classes.tagBoxes}>
                                {tags.map((tag) => {
                                    return (
                                        <div key={tag.id} style={{ display: "flex", alignItems: "center" }}>
                                            <input
                                                type={"checkbox"}
                                                value={tag.tag}
                                                id={tag.id}
                                                key={tag.id}
                                                className={classes.tagInput}
                                                onInput={handleTagInputChange}
                                            />
                                            <label htmlFor={tag.id}>{tag.tag}</label>
                                            <img
                                                src={close_icon_black}
                                                alt="close_icon"
                                                height={"20px"}
                                                className={classes.tagDeleteBtn}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleTagDelete(tag.id);
                                                }}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <button className={classes.createTagToggleBtn} onClick={handleCreateTagToggle}>
                                Add Tag
                            </button>
                        </>
                    ) : (
                        <p>There's no tags, create one.</p>
                    )}
                </div>
                {tagArray.length !== 0 ? (
                    <div className={classes.selectedTags}>
                        {tagArray.map((selectedTag) => {
                            return (
                                <div className={classes.selectedTag} key={selectedTag}>
                                    {selectedTag}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={classes.selectedTags}>
                        <p className={classes.tagMsg}>Please select at least one tag.</p>
                    </div>
                )}
                <button type={"submit"} className={classes.createButton}>
                    CREATE
                </button>
            </form>
            {showTagForm && (
                <div>
                    <form onSubmit={handleTagCreate} className={classes.tagCreateForm}>
                        <input
                            type={"text"}
                            ref={createTagRef}
                            className={classes.tagInputField}
                            placeholder={"Type a tag #"}
                            required
                        />
                        <button type={"submit"} className={classes.tagCreateBtn}>
                            #
                        </button>
                    </form>
                    {error && <p>{error}</p>}
                </div>
            )}
        </>
    );
};

export default NewPostForm;
