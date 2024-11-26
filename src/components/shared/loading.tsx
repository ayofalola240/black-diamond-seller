import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Loading = ({ className, ...rest }: IProps) => {
  return (
    <div className={cn("w-full max-w-3xl py-[100px] mx-auto p-4 space-y-4", className)} {...rest}>
      <Skeleton className="h-10 w-full" />

      <div className="grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="w-full h-[200px]" />
        ))}
      </div>
    </div>
  );
};
