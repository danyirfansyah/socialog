import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Quiz, QuizHistory } from "@/types/quiz";

export function useQuizzesWithGrades() {
  const { data: session } = useSession();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<QuizHistory[]>([]);
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
          const sortedHistory = historyData.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setHistory(sortedHistory);

          const quizzesWithGrades = await Promise.all(
            courseData.map(async (quiz) => {
              const gradeRes = await fetch(
                `/api/results?quizId=${quiz.id}&userId=${session.user.id}`
              );
              const gradeData = await gradeRes.json();
              return { ...quiz, grade: gradeData.grade ?? undefined };
            })
          );
          setQuizzes(quizzesWithGrades);
        }
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  return { quizzes, history, courseMap, loading, error };
}
