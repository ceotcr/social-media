export const dynamic = "force-dynamic";

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GitHubProvider from "next-auth/providers/github";
import { prisma } from "@/libs/prisma";
import NextAuth from "next-auth";
const authOptions = {
    adapter: PrismaAdapter(prisma),

    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };