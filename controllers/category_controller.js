import db from "../database/db.js";

// Get all the tags from db
export const getPostTags = async (req, res) => {
    try {
        const allTags = await db.tag.findMany();
        res.status(200).send(allTags);
    } catch (err) {
        console.log(err);
    }
};

// Create a post tag
export const createTag = async (req, res) => {
    const { tag } = req.body;
    try {
        const createdTag = await db.tag.create({ data: { tag }, select: { id: true } });
        res.status(201).send(createdTag);
    } catch (err) {
        if (err) {
            res.status(406).send({ error: "Tag already exists" });
        }
    }
};

// Get all category (tags)
export const getCategories = async (req, res) => {
    try {
        const allCategories = await db.tag.findMany();
        res.status(200).send({ categories: allCategories });
    } catch (err) {
        console.log(err);
    }
};

// Get all posts by category
export const getCategoryPosts = async (req, res) => {
    let { tag } = req.params;
    tag = `#${tag}`;
    try {
        const getPostsByTag = await db.post.findMany({
            where: {
                tags: {
                    some: {
                        tag: {
                            contains: tag,
                        },
                    },
                },
            },
            include: {
                author: {
                    select: {
                        authorName: true,
                    },
                },
            },
        });
        res.status(200).send(getPostsByTag);
    } catch (err) {
        console.log(err);
    }
};

// Delete tag
export const deleteTag = async (req, res) => {
    const { tagId } = req.params;
    console.log(tagId);
    try {
        const deletedTagId = await db.tag.delete({ where: { id: tagId }, select: { id: true } });
        res.status(200).send({ deletedTagId, deleteTagSuccess: true });
    } catch (err) {
        console.log(err);
    }
};
