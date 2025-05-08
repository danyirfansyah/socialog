"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

import QuizNavigation from "@/components/quiz/QuizNavigation";
import QuestionCard from "@/components/quiz/QuestionCard";
import QuizResult from "@/components/quiz/QuizResult";
import { useQuizId } from "@/utils/useQuizId";
import { saveQuizResult } from "@/utils/saveQuizResult";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [rawScore, setRawScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const { data: session } = useSession();
  const quizId = useQuizId();
  const finalScore = ((rawScore / questions.length) * 100).toFixed(2);

  useEffect(() => {
    if (!quizId) return;
    fetch(`/api/${quizId}/questions`)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, [quizId]);

  const handleAnswer = (selected: string) => {
    if (answered) return;
    setAnswered(true);
    if (selected === questions[current].answer) {
      setRawScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setShowResult(true);
      }
      setAnswered(false);
    }, 600);
  };

  const restartQuiz = () => {
    setCurrent(0);
    setRawScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  useEffect(() => {
    if (showResult && session?.user?.id && quizId) {
      saveQuizResult({
        userId: session.user.id,
        quizId,
        score: parseFloat(finalScore),
      });
    }
  }, [showResult]);

  if (!questions.length) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 px-4 mb-10">
        <QuizNavigation />
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">
              {showResult
                ? "Quiz Result"
                : `Question ${current + 1} of ${questions.length}`}
            </CardTitle>
            {!showResult && (
              <Progress
                value={((current + 1) / questions.length) * 100}
                className="mt-2"
              />
            )}
          </CardHeader>
          <Separator />
          <CardContent className="pt-4 pb-6">
            {showResult ? (
              <QuizResult score={finalScore} onRetry={restartQuiz} />
            ) : (
              <QuestionCard
                question={questions[current].question}
                options={questions[current].options}
                correctAnswer={questions[current].answer}
                onAnswer={handleAnswer}
                answered={answered}
              />
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
