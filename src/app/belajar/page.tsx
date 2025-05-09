"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Head from "next/head";
import Link from "next/link";

// Define course type
type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
};

export default function MateriAll() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("semua");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data: Course[] = await res.json();
        setCourses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    if (selectedCategory === "semua") return true;
    return course.category.toLowerCase() === selectedCategory;
  });

  return (
    <>
      <Head>
        <title>Materi | YourApp</title>
        <meta name="description" content="Kumpulan materi pembelajaran." />
      </Head>

      <Navbar />
      <main className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-4">Materi</h1>

        <div className="w-full max-w-6xl mb-6">
          <Select onValueChange={setSelectedCategory} defaultValue="semua">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua">Semua</SelectItem>
              <SelectItem value="ips">IPS</SelectItem>
              <SelectItem value="ppkn">PPKN</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading &&
            [...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-36 w-full rounded-xl" />
            ))}

          {error && (
            <p className="text-red-500 text-center col-span-full">
              {error || "Terjadi kesalahan saat memuat data."}
            </p>
          )}

          {!loading && !error && filteredCourses.length === 0 && (
            <p className="text-gray-600 text-center col-span-full">
              Tidak ada materi yang tersedia.
            </p>
          )}

          {!loading &&
            !error &&
            filteredCourses.map((course) => (
              <Link key={course.id} href={`/materi/${course.id}`} passHref>
                <Card className="transition hover:shadow-lg hover:scale-[1.02] duration-200 cursor-pointer">
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-2 capitalize">
                      Kategori: {course.category}
                    </p>
                    <p className="text-sm text-blue-600 underline">
                      Lihat Materi
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
