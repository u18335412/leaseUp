import { cn } from "lib";

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn("flex flex-col items-start pt-2 md:pt-12", className)}
      {...props}
    >
      {children}
    </section>
  );
}

function PageHeaderHeading({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-lg font-bold leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mt-2 max-w-lg text-sm text-muted-foreground sm:text-base",
        className,
      )}
      {...props}
    />
  );
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription };
