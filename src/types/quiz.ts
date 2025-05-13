export type Quiz = {
  id: string;
  title: string;
  description: string;
  category: string;
  grade?: number;
};

export type QuizHistory = {
  id: string;
  quizId: string;
  score: number;
  createdAt: string;
};
