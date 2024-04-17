import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      Welcome To Home
      <Link href="/auth"
        className="text-blue-500 hover:text-blue-600 transition-colors mt-4"
      >
        Visit Profile
      </Link>
    </main>
  );
}
