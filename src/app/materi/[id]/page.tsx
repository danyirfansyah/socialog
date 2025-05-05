"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

type Course = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
};

export default function MateriDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        if (!res.ok) throw new Error("Materi tidak ditemukan.");
        const data: Course = await res.json();
        setCourse(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        {loading ? (
          <Skeleton className="w-full max-w-2xl h-48 rounded-lg" />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : course ? (
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  {course.content || "Konten materi akan ditampilkan di sini."}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <p className="text-gray-600">Materi tidak ditemukan.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
