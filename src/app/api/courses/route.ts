import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    // Resolve the path to the JSON file
    const filePath = path.join(
      process.cwd(),
      "src",
      "app",
      "api",
      "courses",
      "courses.json"
    );

    // Read and parse the JSON file
    const fileContents = await fs.readFile(filePath, "utf-8");
    const courses = JSON.parse(fileContents);

    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error reading courses.json:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
