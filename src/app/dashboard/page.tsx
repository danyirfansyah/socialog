"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

const BoxCard = ({ href, title }: { href: string; title: string }) => (
  <Link
    href={href}
    className="flex items-center justify-center p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition"
  >
    <h2 className="text-xl font-semibold">{title}</h2>
  </Link>
);

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <svg
          className="animate-spin h-6 w-6 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <p className="ml-2 text-lg">Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <p className="text-lg">Redirecting to sign in...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | YourApp</title>
        <meta name="description" content="Selamat datang di Dashboard!" />
      </Head>

      <Navbar />

      <main
        role="main"
        className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100"
      >
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-lg">Selamat datang di Dashboard!</p>

        {/* Box Grid Section */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <BoxCard href="/profile" title="IPS" />
          <BoxCard href="/settings" title="PPKn" />
        </div>
      </main>

      <Footer />
    </>
  );
}
