import db from "../database/db.js";

// Get all posts and divide it into 25 per pages
export const getPosts = async (req, res) => {
    const { page_no } = req.query;
    try {
        const allPosts = await db.post.findMany({
            select: {
                id: true,
                title: true,
                image: true,
                description: true,
                updatedAt: true,
                author: {
                    select: {
                        authorName: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const postsPerPage = 25; // posts per page
        if (allPosts.length === 0) {
            return res.status(200).send({ postsArray: allPosts });
        } else {
            const resultPosts = allPosts.reduce((resultArray, item, index) => {
                const chunkIndex = Math.floor(index / postsPerPage);

                if (!resultArray[chunkIndex]) {
                    resultArray[chunkIndex] = []; // start a new chunk
                }

                resultArray[chunkIndex].push(item);

                return resultArray;
            }, []);
            return res.status(200).send({ postsArray: resultPosts[page_no], maxPages: resultPosts.length });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

// Get a particular post based on it's id
export const uniquePost = async (req, res) => {
    const { id: requestedPostId } = req.params;
    try {
        const uniquePost = await db.post.findUnique({
            where: { id: requestedPostId },
            include: { author: true, tags: true },
        });
        res.status(200).send(uniquePost);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

// Get comments of a particular post
export const postComments = async (req, res) => {
    const { id: requestedPostId } = req.params;
    try {
        const uniquePostComments = await db.post.findUnique({
            where: { id: requestedPostId },
            select: {
                comments: {
                    select: {
                        id: true,
                        userComment: true,
                        user: {
                            select: { id: true, first_name: true, last_name: true },
                        },
                    },
                },
            },
        });
        res.status(200).send(uniquePostComments.comments);
    } catch (err) {
        if (err) res.status(500).send({ error: "Internal Server Error" });
    }
};

// Create a comment of a particular post
export const createPostComment = async (req, res) => {
    const { id: requestedPostId } = req.params;
    const foundUser = await db.user.findUnique({ where: { email: req.user.email } });
    try {
        const addedCommentId = await db.comment.create({
            data: {
                userComment: req.body.userComment,
                postId: requestedPostId,
                userId: foundUser.id,
            },
            select: {
                id: true,
            },
        });
        console.log("comment added");
        res.status(200).send({ commentAdded: addedCommentId });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

// Delete a comment of a particular post
export const deletePostComment = async (req, res) => {
    const { commentId: requestedCommentId } = req.params;
    // console.log(requestedCommentId);
    const deleteComment = await db.comment.delete({ where: { id: requestedCommentId }, select: { id: true } });
    console.log(deleteComment);
    res.status(200).send({ success: deleteComment.id });
};
