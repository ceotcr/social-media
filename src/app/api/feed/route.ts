import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
export const GET = async (req: Request) => {
    try {
        const posts = await prisma.post.findMany({
            take: 20,
            include: {
                author: {
                    select: {
                        image: true,
                        name: true,
                        email: true
                    }
                }
            }
        })
        if (!posts) {
            return NextResponse.json({ message: "No posts found." }, { status: 404 })
        }
        return NextResponse.json(posts)
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "An error occurred." }, { status: 500 })
    }
}
