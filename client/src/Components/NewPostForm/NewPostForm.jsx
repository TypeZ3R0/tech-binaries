import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import classes from "./NewPostForm.module.css";

const NewPostForm = (props) => {

    const [enteredImg, setEnteredImg] = useState();

    const titleInputRef = useRef();
    const imgInputRef = useRef();
    const descriptionInputRef = useRef();
    const categoryInputRef = useRef();

    const handleImageUpload = () => {
        const file = imgInputRef.current.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setEnteredImg(reader.result);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const enteredTitle = titleInputRef.current.value;
        const enteredDescription = descriptionInputRef.current.getContent();
        const enteredCategory = categoryInputRef.current.value;

        const blogPost = {
            title: enteredTitle,
            image: enteredImg,
            description: enteredDescription,
            category: enteredCategory,
        };
        // console.log(blogPost);
        await props.onAddPost(blogPost);
    };

    return (
        <>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h3>Title</h3>
                <textarea name="title" className={classes.textarea} ref={titleInputRef} required />
                <input type={"file"} className={classes.imgUrl} ref={imgInputRef} onChange={handleImageUpload} />
                <h3>Description</h3>
                <Editor
                    apiKey="ld08s775ryflbkkw2shnt0cnfr0l69y7q5gc80hl3k9ik3de"
                    onInit={(evt, editor) => {
                        descriptionInputRef.current = editor;
                    }}
                    initialValue="<p style='font-size: 1.2rem';>Press<strong> Ctrl + Shift + F </strong>to make the description box fullscreen.</p><p>PLEASE DELETE THIS CONTENT</P>"
                    init={{
                        height: 800,
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
                <select name="category" id="category" required ref={categoryInputRef}>
                    <option value="Gadgets And Apps">Gadgets And Apps</option>
                    <option value="Gaming And Entertainment">Gaming and Entertainment</option>
                    <option value="Mobile Phones">Mobile Phones</option>
                    <option value="Science And Technology">Science And Technology</option>
                    <option value="PCs And Laptops">PCs And Laptops</option>
                </select>
                <button type={"submit"} className={classes.createButton}>
                    CREATE
                </button>
            </form>
        </>
    );
};

export default NewPostForm;
