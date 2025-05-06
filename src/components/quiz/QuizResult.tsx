import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface Props {
  score: string;
  onRetry: () => void;
}

export default function QuizResult({ score, onRetry }: Props) {
  return (
    <Alert className="text-center">
      <AlertTitle className="text-2xl font-semibold mb-2">
        Quiz Completed!
      </AlertTitle>
      <AlertDescription className="text-lg">
        Your Score: <span className="font-bold">{score} / 100</span>
      </AlertDescription>
      <Button className="mt-4" onClick={onRetry}>
        Retake Quiz
      </Button>
    </Alert>
  );
}
