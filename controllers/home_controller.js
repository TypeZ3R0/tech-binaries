import { PrismaClient } from "@prisma/client";

const { post } = new PrismaClient();

export const getHome = async (req, res) => {
    const allPosts = await post.findMany({
        select: {
            title: true,
            description: true,
            category: true,
            updatedAt: true,
            author: true,
        }
    })

    res.json(allPosts);
};