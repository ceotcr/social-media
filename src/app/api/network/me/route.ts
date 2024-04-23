import { authOptions } from "@/libs/authOptions"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
export const GET = async (req: Request) => {
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
        const me = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                followers: true,
                following: true,
            }
        })
        if (!me) {
            return NextResponse.json({ message: "User not found." }, { status: 404 })
        }
        return NextResponse.json(me)
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "An error occurred." }, { status: 500 })
    }
}