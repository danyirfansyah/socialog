// app/quiz/page.tsx or pages/quiz/index.tsx
"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";
import QuizCard from "@/components/quiz/QuizCard";
import CategorySelect from "@/components/quiz/CategorySelect";
import { useSession } from "next-auth/react";

type Quiz = {
  id: string;
  title: string;
  description: string;
  category: string;
  grade?: number; // Optional property for grade
};

export default function QuizSelectionPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const { data: session } = useSession();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Gagal memuat data kuis");
        const data: Quiz[] = await res.json();

        // Fetch grades for each quiz
        const quizzesWithGrades = await Promise.all(
          data.map(async (quiz) => {
            if (session?.user?.id) {
              const gradeRes = await fetch(
                `/api/results?quizId=${quiz.id}&userId=${session?.user?.id}`
              );
              const gradeData = await gradeRes.json();

              return { ...quiz, grade: gradeData.grade ?? undefined };
            }
            return { ...quiz, grade: undefined };
          })
        );

        setQuizzes(quizzesWithGrades);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [session]);

  const filteredQuizzes = quizzes.filter((quiz) =>
    selectedCategory === "semua"
      ? true
      : quiz.category.toLowerCase() === selectedCategory
  );

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
          <CategorySelect
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
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
            filteredQuizzes.map((quiz) => <QuizCard key={quiz.id} {...quiz} />)}
        </section>
      </main>

      <Footer />
    </>
  );
}
