export const dynamic = 'force-dynamic'

import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
export const POST = async (req: Request) => {
    try {
        const users = await prisma.user.findMany({
            take: 10,
            include: {
                followers: true,
                following: true
            }
        })
        return NextResponse.json(users)
    }
    catch (error) {
        console.error(error)
        return NextResponse.json({ message: "An error occurred." }, { status: 500 })
    }
}