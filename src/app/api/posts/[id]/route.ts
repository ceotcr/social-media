export const dynamic = 'force-dynamic'
import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const { id } = params
    const post = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            likes: {
                select: {
                    userId: true
                }
            },
            author: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            }
        }
    })
    if (!post) {
        return NextResponse.json({ message: "Post not found." }, { status: 404 })
    }
    return NextResponse.json(post)
}