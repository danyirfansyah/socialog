import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function QuizNavigation() {
  const router = useRouter();

  return (
    <Button onClick={() => router.back()} variant="outline" className="mb-4">
      Go Back
    </Button>
  );
}
