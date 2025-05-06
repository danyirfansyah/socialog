import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  grade?: number; // Optional
}

export default function QuizCard({
  id,
  title,
  description,
  category,
  grade,
}: QuizCardProps) {
  const isFailing = grade !== undefined && grade < 60;
  const isPassing = grade !== undefined && grade >= 60;

  return (
    <Link href={`/quiz/${id}`} passHref>
      <Card
        className={cn(
          "transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.01] cursor-pointer border",
          isFailing
            ? "border-red-400 bg-red-50/40"
            : isPassing
            ? "border-green-400 bg-green-50/40"
            : "border-muted"
        )}
      >
        <CardHeader>
          <CardTitle className="text-base sm:text-lg font-semibold">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-sm">
          <p className="text-muted-foreground mb-2">
            Kategori: <span className="capitalize">{category}</span>
          </p>

          {grade !== undefined && (
            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant={isFailing ? "destructive" : "default"}
                className="text-xs"
              >
                Grade: {grade}%
              </Badge>

              {isFailing && (
                <span className="flex items-center text-red-600 text-xs">
                  <AlertCircle size={14} className="mr-1" />
                  Perlu perbaikan
                </span>
              )}
              {isPassing && (
                <span className="flex items-center text-green-600 text-xs">
                  <CheckCircle size={14} className="mr-1" />
                  Bagus!
                </span>
              )}
            </div>
          )}

          <p className="text-blue-600 underline hover:text-blue-800 transition">
            Mulai Kuis
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
