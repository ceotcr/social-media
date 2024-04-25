import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
import { authOptions } from "@/libs/authOptions"
import { getServerSession } from "next-auth"
// create
export const POST = async (req: Request) => {
    const session = await getServerSession(
        authOptions,
    )
    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
    }
    try {
        if (!session.user.email) {
            return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 })
        }

        const { title, content, published }: { title: string, content: string, published: boolean } = await req.json()
        const post = await prisma.post.create(
            {
                data: {
                    title,
                    content,
                    author: {
                        connect: {
                            id: user.id
                        }
                    },
                    published
                }
            }

        )
        if (!post) {
            return NextResponse.json({ message: "Error creating post." }, { status: 500 })
        }
        return NextResponse.json({ message: "Post created." }, {
            status: 201
        })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "An error occurred." }, { status: 500 })
    }
}

export const DELETE = async (req: Request) => {
    const session = await getServerSession(
        authOptions,
    )
    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
    }
    try {
        if (!session.user.email) {
            return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 })
        }
        const { id }: { id: string } = await req.json()
        const post = await prisma.post.findFirst({
            where: {
                id,
                authorId: user.id
            }
        })
        if (!post) {
            return NextResponse.json({ message: "Post not found." }, { status: 404 })
        }
        await prisma.post.delete({
            where: {
                id
            }
        })
        return NextResponse.json({ message: "Post deleted." }, {
            status: 200
        })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "An error occurred." }, { status: 500 })
    }
}

export const PUT = async (req: Request) => {
    const session = await getServerSession(
        authOptions,
    )
    if (!session?.user) {
        return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
    }
    try {
        if (!session.user.email) {
            return NextResponse.json({ message: "Unauthorized." }, { status: 401 })
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 })
        }
        const { id, title, content, published }: { id: string, title: string, content: string, published: boolean } = await req.json()
        const post = await prisma.post.findFirst({
            where: {
                id,
                authorId: user.id
            }
        })
        if (!post) {
            return NextResponse.json({ message: "Post not found." }, { status: 404 })
        }
        await prisma.post.update({
            where: {
                id
            },
            data: {
                title,
                content,
                published
            }
        })
        return NextResponse.json({ message: "Post updated." }, {
            status: 200
        })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "An error occurred." }, { status: 500 })
    }
}
