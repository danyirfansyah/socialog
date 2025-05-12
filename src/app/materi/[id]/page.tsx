"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import MateriBreadcrumb from "@/components/breadcrumbs/MateriBreadcrumb";
import { useMateriDetail } from "@/utils/useMateriDetail";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function MateriDetailPage() {
  const { id } = useParams();
  const { html, title, category, error, loading } = useMateriDetail(
    id as string
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
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
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
}
