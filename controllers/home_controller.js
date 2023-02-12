import db from "../database/db.js";

export const queryResults = async (req, res) => {
    try {
        const { q } = req.query;
        const posts = await db.post.findMany({ include: { author: { select: { authorName: true } } } });
        const foundPosts = posts.filter((post) => {
            return post.title.toLowerCase().includes(q.toLowerCase());
        });
        res.status(200).send(foundPosts);
    } catch (err) {
        console.log(err);
    }
};
