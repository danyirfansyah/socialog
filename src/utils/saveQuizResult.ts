interface QuizResult {
  userId: string;
  quizId: string;
  score: number;
}

export async function saveQuizResult(result: QuizResult): Promise<void> {
  try {
    const response = await fetch("/api/results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });

    if (!response.ok) {
      throw new Error("Failed to save quiz result");
    }
  } catch (error) {
    console.error("Error saving quiz result:", error);
  }
}
