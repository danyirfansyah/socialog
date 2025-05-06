"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import { useSession } from "next-auth/react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [rawScore, setRawScore] = useState(0);
  const { data: session } = useSession();
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const quizId = window.location.pathname.split("/").pop();
    fetch(`/api/${quizId}/questions`)
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

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

  const finalScore = ((rawScore / questions.length) * 100).toFixed(2);

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  const saveResult = async () => {
    const userId = session?.user?.id;
    const quizId = window.location.pathname.split("/").pop();

    try {
      await fetch("/api/results", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          quizId,
          score: parseFloat(finalScore),
        }),
      });
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
  };

  useEffect(() => {
    if (showResult) {
      saveResult();
    }
  }, [showResult]);

  if (!questions.length) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <Button
          onClick={() => router.back()} // Go back to the previous page
          variant="outline"
          className="mb-4"
        >
          Go Back
        </Button>
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
              <Alert className="text-center">
                <AlertTitle className="text-2xl font-semibold mb-2">
                  Quiz Completed!
                </AlertTitle>
                <AlertDescription className="text-lg">
                  Your Score:{" "}
                  <span className="font-bold">{finalScore} / 100</span>
                </AlertDescription>
                <Button className="mt-4" onClick={restartQuiz}>
                  Retake Quiz
                </Button>
              </Alert>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-4">
                  {questions[current].question}
                </h3>
                <div className="flex flex-col gap-3">
                  {questions[current].options.map((opt, i) => (
                    <Button
                      key={i}
                      onClick={() => handleAnswer(opt)}
                      variant="outline"
                      disabled={answered}
                      className="justify-start"
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
                <div className="mt-4">
                  <Badge variant="secondary">
                    Correct Answer: {answered ? questions[current].answer : "?"}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
