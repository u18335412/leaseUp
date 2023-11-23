/* eslint-disable react/function-component-definition -- This is expected */
import type { FC } from "react";
import { buttonVariants } from "./button";
import { cn } from "lib";

const EmptyState: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn("grid md:h-96 h-52 place-content-center text-center", className)}
    {...props}
  />
);

const EmptyStateTitle: FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h2
    className={cn(
      "text-base md:text-lg font-medium leading-10 tracking-tight text-black",
      className,
    )}
    {...props}
  >
    {children}
  </h2>
);

const EmptyStateDescription: FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p
    className={cn(
      "text-muted-foreground max-w-xs text-sm md:text-base font-light leading-6",
      className,
    )}
    {...props}
  />
);

const EmptyStatePrimaryAction: FC<
  React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ...props }) => (
  <p
    className={cn(
      buttonVariants({
        variant: "default",
      }),
      className,
    )}
    {...props}
  />
);

const EmptyStateSecondaryAction: FC<
  React.HTMLAttributes<HTMLButtonElement>
> = ({ className, ...props }) => (
  <button
    className={cn(
      buttonVariants({
        variant: "outline",
      }),
      className,
    )}
    type="button"
    {...props}
  />
);

const EmptyStateFooter: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "mt-4 flex flex-wrap items-center justify-center gap-2",
      className,
    )}
    {...props}
  />
);

export {
  EmptyState,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStatePrimaryAction,
  EmptyStateSecondaryAction,
  EmptyStateFooter,
};
