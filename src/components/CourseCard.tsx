// components/CourseCard.tsx
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  category: string;
  coverImage: string; // new prop for the image
};

export default function CourseCard({
  id,
  title,
  description,
  category,
  coverImage,
}: CourseCardProps) {
  return (
    <Link href={`/materi/${id}`}>
      <Card className="transition hover:shadow-lg hover:scale-[1.02] duration-200 cursor-pointer font-afacad">
        <CardHeader className="p-0">
          <img
            src={coverImage}
            alt={`${title} cover`}
            className="w-full h-40 object-cover rounded-t-md"
          />
          <div className="p-4">
            <CardTitle>{title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-2 capitalize">
            Kategori: {category}
          </p>
          <p className="text-sm text-blue-600 underline">Lihat Materi</p>
        </CardContent>
      </Card>
    </Link>
  );
}
