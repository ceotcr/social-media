
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/libs/prisma";
export const authOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
};