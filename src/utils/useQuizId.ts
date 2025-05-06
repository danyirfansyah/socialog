"use client";

export function useQuizId(): string | null {
  if (typeof window === "undefined") return null;
  return window.location.pathname.split("/").pop() || null;
}
