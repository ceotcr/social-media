import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/libs/authOptions"
export const POST = async (req: Request, res: Response) => {
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
        const { followId } = await req.json()
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        if (!user) {
            return NextResponse.json({ message: "User not found." }, { status: 404 })
        }

        const alreadyFollowing = await prisma.follow.findFirst({
            where: {
                followerId: user.id,
                followingId: followId
            }
        })

        if (alreadyFollowing) {
            return NextResponse.json({ message: "User already followed." }, { status: 404 })
        }

        const result = await prisma.follow.create({
            data: {
                follower: {
                    connect: {
                        id: user.id
                    }
                },
                following: {
                    connect: {
                        id: followId
                    }
                }
            }
        })

        if (!result) {
            return NextResponse.json({ message: "An error occurred." }, { status: 500 })
        }
        return NextResponse.json({ message: "Followed" })
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "An error occurred." }, { status: 500 })
    }
}