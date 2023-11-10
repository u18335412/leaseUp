import { Skeleton } from "ui";

export default function Loading() {
  return (
    <div>
      {new Array(5).fill(0).map((_, i) => (
        <div key={_} aria-hidden="true" className="flex justify-between gap-4">
          <Skeleton className="mt-4 h-10 flex-1" />
          <Skeleton className="mt-4 h-10 flex-1" />
          <Skeleton className="mt-4 hidden h-10 flex-1 md:flex" />
          <Skeleton className="mt-4 hidden h-10 flex-1 md:flex" />
        </div>
      ))}
      <p className="sr-only">Loading</p>
    </div>
  );
}
