"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Head from "next/head";
import Link from "next/link";

// Define quiz type
type Quiz = {
  id: string;
  title: string;
  description: string;
  category: string;
};

export default function QuizSelectionPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("semua");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch("/api/courses"); // Ganti dengan endpoint kuis yang sesuai
        if (!res.ok) throw new Error("Gagal memuat data kuis");
        const data: Quiz[] = await res.json();
        setQuizzes(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
    if (selectedCategory === "semua") return true;
    return quiz.category.toLowerCase() === selectedCategory;
  });

  return (
    <>
      <Head>
        <title>Pilih Kuis | YourApp</title>
        <meta name="description" content="Pilih kuis sesuai kategori." />
      </Head>

      <Navbar />
      <main className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-4">Pilih Kuis</h1>

        <div className="w-full max-w-6xl mb-6">
          <Select onValueChange={setSelectedCategory} defaultValue="semua">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua</SelectItem>
              <SelectItem value="ips">IPS</SelectItem>
              <SelectItem value="ppkn">PPKN</SelectItem>
              <SelectItem value="umum">Umum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading &&
            [...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-36 w-full rounded-xl" />
            ))}

          {error && (
            <p className="text-red-500 text-center col-span-full">
              {error || "Terjadi kesalahan saat memuat data kuis."}
            </p>
          )}

          {!loading && !error && filteredQuizzes.length === 0 && (
            <p className="text-gray-600 text-center col-span-full">
              Tidak ada kuis yang tersedia.
            </p>
          )}

          {!loading &&
            !error &&
            filteredQuizzes.map((quiz) => (
              <Link key={quiz.id} href={`/quiz/${quiz.id}`} passHref>
                <Card className="transition hover:shadow-lg hover:scale-[1.02] duration-200 cursor-pointer">
                  <CardHeader>
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {quiz.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2 capitalize">
                      Kategori: {quiz.category}
                    </p>
                    <p className="text-sm text-blue-600 underline">
                      Mulai Kuis
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
