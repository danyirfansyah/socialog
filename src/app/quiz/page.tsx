"use client";

import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import CategorySelect from "@/components/quiz/CategorySelect";
import HistorySection from "@/components/quiz/HistorySection";
import QuizGrid from "@/components/quiz/QuizGrid";
import { useState } from "react";
import { useQuizzesWithGrades } from "@/hooks/useQuizzesWithGrades";

export default function QuizSelectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const { quizzes, history, courseMap, loading, error } =
    useQuizzesWithGrades();

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

      <main className="flex flex-col items-center min-h-screen p-4 bg-gray-100 font-afacad">
        <h1 className="text-3xl font-bold text-center mb-4">
          Pilih Latihan Soal
        </h1>

        {!loading && history.length > 0 && (
          <div className="w-full max-w-6xl mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Riwayat Pengerjaan Terakhir
              </h2>
              <HistorySection history={history} courseMap={courseMap} />
            </div>
          </div>
        )}

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
