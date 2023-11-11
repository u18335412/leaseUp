import { cn } from "lib";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("bg-primary/10 block animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
