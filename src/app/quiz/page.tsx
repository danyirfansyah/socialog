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
import HistoryCard from "@/components/quiz/HistoryCard";
import HistorySection from "@/components/quiz/HistorySection";
import QuizGrid from "@/components/quiz/QuizGrid";

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
  const [history, setHistory] = useState<
    { id: string; quizId: string; score: number; createdAt: string }[]
  >([]);
  const [courseMap, setCourseMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Gagal memuat data kuis");
        const courseData: Quiz[] = await res.json();

        const courseMapData: Record<string, string> = {};
        courseData.forEach((course) => {
          courseMapData[course.id] = course.title;
        });
        setCourseMap(courseMapData);

        if (session?.user?.id) {
          const historyRes = await fetch(
            `/api/history?userId=${session.user.id}`
          );
          const historyData = await historyRes.json();

          // Sort by date DESC
          const sortedHistory = historyData.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setHistory(sortedHistory);

          // Also load quiz data with grades
          const quizzesWithGrades = await Promise.all(
            courseData.map(async (quiz) => {
              const gradeRes = await fetch(
                `/api/results?quizId=${quiz.id}&userId=${session?.user?.id}`
              );
              const gradeData = await gradeRes.json();
              return { ...quiz, grade: gradeData.grade ?? undefined };
            })
          );
          setQuizzes(quizzesWithGrades);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        <h1 className="text-3xl font-bold text-center mb-4">
          Pilih Latihan Soal
        </h1>

        {!loading && <HistorySection history={history} courseMap={courseMap} />}

        <div className="w-full max-w-6xl mb-6">
          <CategorySelect
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuizGrid loading={loading} error={error} quizzes={filteredQuizzes} />
        </section>
      </main>

      <Footer />
    </>
  );
}
