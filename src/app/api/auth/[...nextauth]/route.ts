export const dynamic = "force-dynamic";
import { authOptions } from "@/libs/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };