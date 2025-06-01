"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground px-6 py-20 flex flex-col items-center font-afacad">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Selamat Datang di <span className="text-primary">Dashboard</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Jelajahi materi IPS dan PPKN, ikuti kuis untuk menguji pemahamanmu.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/belajar">
              <Button className="px-6">Semua Materi</Button>
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 w-full max-w-4xl">
          <Card className="bg-muted/20">
            <CardHeader>
              <CardTitle>Interaktif & Visual</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Materi pembelajaran hadir dalam bentuk infografis, animasi, dan
                video yang menarik. Pelajari sesuai gaya belajarmu!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/20">
            <CardHeader>
              <CardTitle>Kuis & Evaluasi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Ikuti kuis interaktif dengan berbagai jenis soal, dapatkan skor
                langsung, dan lihat riwayat hasilmu untuk terus berkembang.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
