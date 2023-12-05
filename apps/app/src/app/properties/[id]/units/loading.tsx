import { Loader2 } from "lucide-react";
import { Skeleton } from "ui";

export default function Loading() {
  return (
    <div className="grid h-96 place-content-center">
      <Loader2
        className="text-black h-5 w-5 animate-spin"
        aria-hidden="true"
      />
      <p className="sr-only">Loading</p>
    </div>
  );
}
