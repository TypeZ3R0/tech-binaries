import React, { useRef } from "react";

import classes from "./NewPostForm.module.css";

const NewPostForm = (props) => {
    const titleInputRef = useRef();
    const imgUrlInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredImgUrl = imgUrlInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.value;
        const enteredCategory = categoryInputRef.current.value;

        const blogPost = {
            title: enteredTitle,
            imgUrl: enteredImgUrl,
            description: enteredDescription,
            category: enteredCategory,
        };
        props.onAddPost(blogPost);
    };

    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h3>Title</h3>
                <textarea name="title" className={classes.textarea} ref={titleInputRef} required />
                <h3>Image URL</h3>
                <input
                    type={"text"}
                    id="img-url"
                    name="imgUrl"
                    className={classes.input}
                    ref={imgUrlInputRef}
                    required
                />
                <h3>Description</h3>
                <textarea className={classes.textarea} name="description" ref={descriptionInputRef} required />
                <select name="category" id="category" required ref={categoryInputRef}>
                    <option value="Gadgets And Apps">
                        Gadgets And Apps
                    </option>
                    <option value="Gaming And Entertainment">Gaming and Entertainment</option>
                    <option value="Mobile Phones">Mobile Phones</option>
                    <option value="Science And Technology">Science And Technology</option>
                    <option value="PCs And Laptops">PCs And Laptops</option>
                </select>
                <button type={"submit"} className={classes.createButton}>
                    Create
                </button>
            </form>
        </>
    );
};

export default NewPostForm;
