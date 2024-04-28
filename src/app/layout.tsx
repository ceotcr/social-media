import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { SessionProvider } from "@/providers/SessionProvider";
import { authOptions } from "@/libs/authOptions";
import ClientProviders from "./providers";
import Sidebar from "@/components/Layout/Sidebar";
import Snackbar from "@/components/Layout/Snackbar";

const font = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "DevBoard",
  description: "A Developers' social media platform.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(
    authOptions
  );
  return (
    <html lang="en">
      <body className={font.className + " bg-black text-white"}
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.65) 100%), url("/bg.jpg") center/cover fixed',
        }}
      >
        <SessionProvider session={session}
          basePath="/api/auth"
        >
          <ClientProviders>
            <main className='flex h-screen w-full gap-4'>
              <Sidebar />
              <Snackbar />
              <div className="flex flex-col items-center justify-center w-full h-screen overflow-y-auto">{children}</div>
            </main>
          </ClientProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
