import db from "../database/db.js";
import cloudinary from "../config/cloudinary_config.js";

// Create author profile
export const authorCreate = async (req, res) => {
    const { email: userEmail } = req.user;
    const { authorName, authorBio } = req.body;
    try {
        const { isAuthor } = await db.user.findUnique({ where: { email: userEmail }, select: { isAuthor: true } });
        if (isAuthor) {
            const authorId = await db.author.create({
                data: { authorName, bio: authorBio, userEmail },
                select: { id: true },
            });
            return res.status(201).send({ authorId });
        } else return res.status(403).send({ message: "You are not an author" });
    } catch (err) {
        console.log(err);
    }
};

// Create a new post (on by an author)
export const authorCreatePost = async (req, res) => {
    const author = req.author;
    const { title, image, description, tags } = req.body;
    const tagsArray = tags.map((tag) => {
        return { tag: tag };
    });
    try {
        const uploaded = await cloudinary.uploader.upload(image, {
            upload_preset: "devtest",
            public_id: `blog_image_${Date.now()}`,
        });
        const addedPostId = await db.post.create({
            data: { title, image: uploaded.secure_url, description, authorId: author.id, tags: { connect: tagsArray } },
            select: { id: true },
        });
        res.status(200).send({ postId: addedPostId, success: true });
    } catch (err) {
        console.log(err);
    }
};

// Get author posts
export const authorPosts = async (req, res) => {
    const author = req.author;
    try {
        const authorPosts = await db.post.findMany({ where: { authorId: author.id } });
        res.status(200).send({ authorPosts });
    } catch (err) {
        console.log(err);
    }
};

// Get post to be edited and set as input values in the frontend (only by an author)
export const authorEditPost = async (req, res) => {
    const { postId } = req.params;
    try {
        const foundPost = await db.post.findUnique({
            where: { id: postId },
            select: { title: true, description: true, image: true, authorId: true },
        });
        res.status(200).send({ foundPost });
    } catch (err) {
        console.log(err);
    }
};

// Update post (only by an author)
export const authorUpdatedPost = async (req, res) => {
    const { postId } = req.params;
    const { title, image, description } = req.body;
    if (image) {
        try {
            const foundPost = await db.post.findUnique({ where: { id: postId }, select: { image: true } });
            const oldImage = foundPost.image.split("/").slice(-1)[0].split(".").slice(0)[0];
            const uploaded = await cloudinary.uploader.upload(image, {
                upload_preset: "devtest",
                public_id: oldImage,
            });
            const updatedPost = await db.post.update({
                where: { id: postId },
                data: { title, description, image: uploaded.secure_url },
                select: { id: true },
            });
            return res.status(201).send({ success: true, updatedPostId: updatedPost.id });
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            const updatedPost = await db.post.update({
                where: { id: postId },
                data: { title, description },
                select: { id: true },
            });
            return res.status(201).send({ success: true, updatedPostId: updatedPost.id });
        } catch (err) {
            console.log(err);
        }
    }
};

// Delete post by id (only by an author)
export const authorDeletePost = async (req, res) => {
    const { postId: deletePostId } = req.params;
    try {
        const foundPost = await db.post.findUnique({ where: { id: deletePostId }, select: { image: true } });
        const foundImage = foundPost.image.split("/").slice(-1)[0].split(".").slice(0)[0];
        await cloudinary.uploader.destroy(`image/${foundImage}`, {
            resource_type: "image",
        });
        const deletedPostId = await db.post.delete({ where: { id: deletePostId }, select: { id: true } });
        res.status(200).send(deletedPostId);
    } catch (err) {
        console.log(err);
    }
};
