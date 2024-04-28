import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma"
import { authOptions } from "@/libs/authOptions";
import { getServerSession } from "next-auth";
export const POST = async (req: NextRequest) => {
    try {
        const { postId } = await req.json()
        const session = await getServerSession(
            authOptions,
        )
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
        }
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })
        if (!post) {
            return NextResponse.json({ message: "Post not found." }, { status: 404 })
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        })
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 })
        }
        const like = await prisma.like.findFirst({
            where: {
                userId: user.id,
            }
        })

        if (like) {
            await prisma.like.delete({
                where: {
                    id: like.id
                }
            })
            return NextResponse.json({ message: "Like removed." }, { status: 200 })
        }

        await prisma.like.create({
            data: {
                userId: user.id,
                postId: post.id
            }
        })

        return NextResponse.json({ message: "Like added." }, { status: 200 })

    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "An error occurred." }, { status: 500 })
    }
}