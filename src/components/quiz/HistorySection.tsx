import HistoryCard from "./HistoryCard";

export default function HistorySection({
  history,
  courseMap,
}: {
  history: { id: string; quizId: string; score: number; createdAt: string }[];
  courseMap: Record<string, string>;
}) {
  if (history.length === 0)
    return <p className="text-muted-foreground">Belum ada riwayat kuis.</p>;

  const latestThree = history
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {latestThree.map((entry) => (
        <HistoryCard
          key={entry.id}
          title={courseMap[entry.quizId] ?? "Kuis Tidak Diketahui"}
          score={entry.score}
          createdAt={entry.createdAt}
          quizId={entry.quizId}
        />
      ))}
    </div>
  );
}
