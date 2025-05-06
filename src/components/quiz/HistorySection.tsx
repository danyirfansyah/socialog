import { Card, CardHeader } from "@/components/ui/card";
import HistoryCard from "./HistoryCard";
import { Separator } from "@/components/ui/separator";

export default function HistorySection({
  history,
  courseMap,
}: {
  history: { id: string; quizId: string; score: number; createdAt: string }[];
  courseMap: Record<string, string>;
}) {
  if (history.length === 0) return null;

  const latestThree = history
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <Card className="w-full max-w-6xl mb-8 bg-white shadow-sm">
      <CardHeader>
        <h2 className="text-xl font-semibold">Riwayat Pengerjaan</h2>
      </CardHeader>
      <Separator />
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {latestThree.map((entry) => (
          <HistoryCard
            key={entry.id}
            title={courseMap[entry.quizId] || "Kuis Tidak Diketahui"}
            score={entry.score}
            createdAt={entry.createdAt}
            quizId={entry.quizId}
          />
        ))}
      </div>
    </Card>
  );
}
