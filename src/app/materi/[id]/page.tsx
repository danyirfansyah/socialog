"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

export default function MateriDetail() {
  const { id } = useParams();
  const [html, setHtml] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/courses/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Materi tidak ditemukan");
        return res.text();
      })
      .then(setHtml)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div
            className="prose bg-white p-6 rounded shadow max-w-3xl w-full"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
