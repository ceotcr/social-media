import { Post } from "@prisma/client"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    try {
        const data: Post = await req.json()
        console.log(data)
        return NextResponse.json({ message: 'Post created successfully' }, { status: 201 })
    }
    catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}