"use client";

import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "lib";
import { CloudOff, LayoutDashboard, RefreshCcw } from "lucide-react";
import {
  EmptyState,
  EmptyStateDescription,
  EmptyStateFooter,
  EmptyStatePrimaryAction,
  EmptyStateSecondaryAction,
  EmptyStateTitle,
  buttonVariants,
} from "ui";

const Error: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <EmptyState>
        <span className="flex justify-center py-4">
          <CloudOff
            aria-hidden="true"
            className="text-muted-foreground h-5 w-5"
          />
        </span>
        <EmptyStateTitle>500</EmptyStateTitle>
        <EmptyStateDescription>
          An error has occurred, please try again later.
        </EmptyStateDescription>
        <EmptyStateFooter>
          <Link
            href="/"
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "flex cursor-pointer items-center gap-x-2",
            )}
          >
            <LayoutDashboard aria-hidden="true" className="h-4 w-4" />
            Dashboard
          </Link>
          <EmptyStatePrimaryAction
            className="flex cursor-pointer items-center gap-x-2"
            onClick={() => router.refresh()}
          >
            <RefreshCcw aria-hidden="true" className="h-4 w-4" />
            Reload
          </EmptyStatePrimaryAction>
        </EmptyStateFooter>
      </EmptyState>
    </div>
  );
};

export default Error;
