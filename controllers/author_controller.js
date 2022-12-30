export const authorCreatePost = async (req, res) => {
    const author = req.author;
    res.status(200).send({ authorId: author.id });
};
