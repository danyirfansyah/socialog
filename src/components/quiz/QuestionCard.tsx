import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  question: string;
  options: string[];
  correctAnswer: string;
  onAnswer: (answer: string) => void;
  answered: boolean;
}

export default function QuestionCard({
  question,
  options,
  correctAnswer,
  onAnswer,
  answered,
}: Props) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{question}</h3>
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => (
          <Button
            key={i}
            onClick={() => onAnswer(opt)}
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
          Correct Answer: {answered ? correctAnswer : "?"}
        </Badge>
      </div>
    </div>
  );
}
