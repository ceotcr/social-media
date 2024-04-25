import { NextResponse } from "next/server"

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
    return NextResponse.json({ message: `Post ${params.id}` })
}