import { PrismaClient } from "../../../../generated/prisma";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { quizId: string } }
) {
  const { quizId } = params;

  if (!quizId) {
    return new Response("Quiz ID is required", { status: 400 });
  }

  try {
    const questions = await prisma.question.findMany({
      where: { quizId },
    });

    return new Response(JSON.stringify(questions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
