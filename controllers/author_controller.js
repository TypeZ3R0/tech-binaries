import db from "../database/db.js";
import cloudinary from "../config/cloudinary_config.js";

export const getAuthorById = async (req, res) => {
    const author = req.author;
    res.status(200).send({ authorId: author.id });
};

export const authorProfile = async (req, res) => {
    const author = req.author;
    const authorObject = await db.author.findUnique({ where: { userEmail: author.userEmail } });
    const authorPosts = await db.post.findMany({ where: { authorId: author.id } });
    res.status(200).send({ authorObject, authorPosts });
};

export const authorCreatePost = async (req, res) => {
    const author = req.author;
    const { title, image, description, category } = req.body;
    try {
        const uploaded = await cloudinary.uploader.upload(image, {
            upload_preset: "devtest",
            public_id: `blog_image_${Date.now()}`,
        });
        await db.post.create(({ data: { title, image: uploaded.secure_url, description, category, authorId: author.id} }));
        console.log("Post Created!")
        res.status(200).send(true)
    } catch (err) {
        console.log(err);
    }
};
