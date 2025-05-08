"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { useSession } from "next-auth/react";
import ProfileForm from "./ProfileForm";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated")
    return <p>You need to log in to view this page.</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <ProfileForm session={session} />
      </main>
      <Footer />
    </div>
  );
}
