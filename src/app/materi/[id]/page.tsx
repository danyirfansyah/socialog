"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import MateriBreadcrumb from "@/components/breadcrumbs/MateriBreadcrumb";
import { useMateriDetail } from "@/utils/useMateriDetail";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CourseCard from "@/components/CourseCard";
import CourseSkeleton from "@/components/CourseSkeleton";
import { Course } from "@/types/course";

export default function MateriDetailPage() {
  const { id } = useParams();
  const { html, title, category, error, loading } = useMateriDetail(
    id as string
  );

  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedCourses = async () => {
      setRelatedLoading(true);
      try {
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data: Course[] = await res.json();
        const filtered = data.filter((course) => course.id !== id);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setRelatedCourses(shuffled.slice(0, 3));
      } catch (err) {
        console.error("Error fetching related courses:", err);
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelatedCourses();
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center font-afacad">
        <div className="w-full max-w-3xl mb-4">
          <MateriBreadcrumb category={category} title={title} />
        </div>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div
            className="prose bg-white p-6 rounded shadow max-w-3xl w-full font-afacad"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}

        {/* Materi Lainnya Section */}
        <section className="mt-12 w-full max-w-6xl">
          <h2 className="text-2xl font-semibold mb-4">Materi Lainnya</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedLoading
              ? [...Array(3)].map((_, i) => <CourseSkeleton key={i} />)
              : relatedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    category={course.category}
                  />
                ))}
          </div>
        </section>
      </main>

      <ScrollToTopButton />
      <Footer />
    </>
  );
}
