import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  grade?: number; // Add grade property (optional)
}

export default function QuizCard({
  id,
  title,
  description,
  category,
  grade,
}: QuizCardProps) {
  //   console.log("QuizCard props:", { id, title, description, category, grade }); // Debugging

  return (
    <Link href={`/quiz/${id}`} passHref>
      <Card className="transition hover:shadow-lg hover:scale-[1.02] duration-200 cursor-pointer">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-2 capitalize">
            Kategori: {category}
          </p>
          {grade !== undefined && (
            <p className="text-sm text-green-600 font-semibold">
              Grade: {grade}%
            </p>
          )}
          <p className="text-sm text-blue-600 underline">Mulai Kuis</p>
        </CardContent>
      </Card>
    </Link>
  );
}
