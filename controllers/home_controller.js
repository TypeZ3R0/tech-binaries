import { PrismaClient } from "@prisma/client";

const { post } = new PrismaClient();

export const getHome = async (req, res) => {
    try {
        const feedPosts = await post.findMany({
            select: {
                id: true,
                title: true,
                image: true,
                description: true,
                category: true,
                updatedAt: true,
                author: {
                    select: {
                        authorName: true,
                    },
                },
            },
            orderBy: {
                updatedAt: "desc"
            }
        });
    
        res.status(200).send(feedPosts);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error")
    }
};
