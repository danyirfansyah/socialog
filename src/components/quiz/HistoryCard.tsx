// components/quiz/HistoryCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HistoryCard({
  title,
  score,
  createdAt,
  quizId,
}: {
  title: string;
  score: number;
  createdAt: string;
  quizId: string;
}) {
  const date = new Date(createdAt).toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <Card className="border border-gray-300">
      <CardContent className="p-4 space-y-2">
        <p className="font-semibold text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">Skor: {score}%</p>
        <p className="text-xs text-gray-400">Waktu: {date}</p>
        <Link href={`/quiz/${quizId}`}>
          <Button className="mt-2">Coba Lagi</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
