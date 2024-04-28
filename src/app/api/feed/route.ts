import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
export const GET = async (req: Request) => {
    const page = new URL(req.url).searchParams.get("page")
    const size = 2
    try {
        const posts = await prisma.post.findMany({
            take: size,
            skip: page ? (parseInt(page) - 1) * size : 0,
            include: {
                author: {
                    select: {
                        image: true,
                        name: true,
                        email: true
                    }
                },
                likes: {
                    select: {
                        userId: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            },
        })
        const totalPosts = await prisma.post.count()
        if (!posts) {
            return NextResponse.json({ message: "No posts found." }, { status: 404 })
        }
        return NextResponse.json({ posts, totalPosts })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "An error occurred." }, { status: 500 })
    }
}
