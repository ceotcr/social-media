import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"
export const POST = async (req: NextRequest) => {
    const { ids } = await req.json();
    try {
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                followers: true,
                following: true
            },
        });
        return NextResponse.json({ users: users || [] }, { status: 200 });
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ message: "An error occurred." }, { status: 500 });
    }
}