import db from "../database/db.js";

const isAuthor = async (req, res, next) => {
    const user = req.user;
    const userIsAlsoAuthor = await db.user.findFirst({ where: { email: user.email, isAuthor: true } });
    const author = await db.author.findUnique({ where: { userEmail: user.email } });
    if (userIsAlsoAuthor && author) {
        req.author = author;
        req.user = user;
        next();
    } else {
        res.send(403).send("Unauthorized");
    }
};

export default isAuthor;
