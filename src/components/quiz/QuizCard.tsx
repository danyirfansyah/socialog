import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure this utility exists in your project

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

  return (
    <Link href={`/quiz/${id}`} passHref>
      <Card
        className={cn(
          "transition duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer border",
          isFailing ? "border-red-500 bg-red-50" : "border-gray-200"
        )}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex flex-col gap-1">
            <p className="text-sm text-gray-500 capitalize">
              Kategori: {category}
            </p>

            {grade !== undefined && (
              <div className="flex items-center gap-2">
                <Badge
                  variant={isFailing ? "destructive" : "success"}
                  className="text-sm"
                >
                  Grade: {grade}%
                </Badge>

                {isFailing && (
                  <span className="flex items-center text-red-600 text-xs">
                    <AlertCircle size={14} className="mr-1" />
                    Coba lagi untuk hasil lebih baik
                  </span>
                )}
              </div>
            )}
          </div>

          <p className="text-sm text-blue-600 underline">Mulai Kuis</p>
        </CardContent>
      </Card>
    </Link>
  );
}
