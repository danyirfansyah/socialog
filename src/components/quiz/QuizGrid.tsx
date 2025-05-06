import QuizCard from "./QuizCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuizGrid({
  loading,
  error,
  quizzes,
}: {
  loading: boolean;
  error: string | null;
  quizzes: any[];
}) {
  if (loading) {
    return (
      <>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-36 w-full rounded-xl" />
        ))}
      </>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 text-center col-span-full">
        {error || "Terjadi kesalahan saat memuat data kuis."}
      </p>
    );
  }

  if (quizzes.length === 0) {
    return (
      <p className="text-gray-600 text-center col-span-full">
        Tidak ada kuis yang tersedia.
      </p>
    );
  }

  return quizzes.map((quiz) => <QuizCard key={quiz.id} {...quiz} />);
}
