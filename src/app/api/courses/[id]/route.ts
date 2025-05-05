// File: /app/api/courses/[id]/route.ts
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const filePath = path.join(
    process.cwd(),
    "public",
    "materi-html",
    `${id}.html`
  );

  try {
    const htmlContent = await fs.readFile(filePath, "utf-8");

    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (error) {
    return new NextResponse("Materi tidak ditemukan.", { status: 404 });
  }
}
