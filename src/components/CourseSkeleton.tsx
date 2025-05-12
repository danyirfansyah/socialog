// components/CourseSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  count?: number;
};

export default function CourseSkeleton({ count = 3 }: Props) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Skeleton key={i} className="h-36 w-full rounded-xl" />
      ))}
    </>
  );
}
