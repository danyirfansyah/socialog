// filepath: c:\Users\LENOVO\Documents\PT\New folder\socialog\src\app\api\results\route.ts
import { PrismaClient } from "../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const quizId = searchParams.get("quizId");
  const userId = searchParams.get("userId");

  if (!quizId || !userId) {
    console.error("Missing quizId or userId:", { quizId, userId });
    return NextResponse.json(
      { error: "Missing quizId or userId" },
      { status: 400 }
    );
  }

  try {
    console.log("Fetching result for quizId:", quizId, "userId:", userId);

    const result = await prisma.quizResult.findFirst({
      where: {
        quizId,
        userId,
      },
      orderBy: {
        score: "desc",
      },
    });

    console.log("Query result:", result);

    if (!result) {
      return NextResponse.json({ grade: null }, { status: 200 });
    }

    return NextResponse.json({ grade: result.score }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quiz result:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, quizId, score } = body;

    if (!userId || !quizId || score === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await prisma.quizResult.create({
      data: {
        userId,
        quizId,
        score,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error saving quiz result:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
