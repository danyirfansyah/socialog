"use client";

import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import ProfileForm from "./ProfileForm";
import HistorySection from "@/components/quiz/HistorySection";
import { useQuizzesWithGrades } from "@/hooks/useQuizzesWithGrades";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { history, courseMap, loading, error } = useQuizzesWithGrades();

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Skeleton className="w-1/2 h-8" />
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Alert variant="destructive">
          <AlertTitle>Akses Ditolak</AlertTitle>
          <AlertDescription>
            Silakan login untuk melihat profil Anda.
          </AlertDescription>
        </Alert>
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-afacad">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Profil Pengguna</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm session={session} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Riwayat Kuis</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-3/4 h-6" />
                <Skeleton className="w-1/2 h-6" />
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertTitle>Terjadi Kesalahan</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : (
              <HistorySection history={history} courseMap={courseMap} />
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
