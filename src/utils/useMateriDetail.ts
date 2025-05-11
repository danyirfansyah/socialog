import { useEffect, useState } from "react";

export function useMateriDetail(id: string | undefined) {
  const [html, setHtml] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMetadata = fetch("/api/courses")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil daftar materi");
        return res.json();
      })
      .then((data) => {
        const course = data.find((c: any) => String(c.id) === String(id));
        if (!course) throw new Error("Materi tidak ditemukan");
        setTitle(course.title || "");
        setCategory(course.category || "");
      });

    const fetchHtml = fetch(`/api/courses/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil isi materi");
        return res.text();
      })
      .then(setHtml);

    Promise.all([fetchMetadata, fetchHtml])
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { html, title, category, error, loading };
}
