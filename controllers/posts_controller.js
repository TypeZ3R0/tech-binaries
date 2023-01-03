import db from "../database/db.js";

export const postsId = async (req, res) => {
    try {
        const postsId = await db.post.findMany({  
            select: {
                id: true
            }
        });
        res.status(200).send(postsId);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

export const uniquePost = async (req, res) => {
    const requestedPostId = req.params.id;
    try {
        const uniquePost = await db.post.findUnique({ where: { id: requestedPostId}, include: { author: true } });
        res.status(200).send(uniquePost);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error")
    }
}
