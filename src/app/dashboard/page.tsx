"use client";

import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin"); // Redirect if not authenticated
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="mt-2 text-lg">Welcome to your dashboard!</p>
      </main>
    </>
  );
}
