import { cn } from "lib";

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn("flex flex-col items-start pt-2 md:pt-4", className)}
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
        "text-muted-foreground mt-2 max-w-lg text-sm sm:text-base",
        className,
      )}
      {...props}
    />
  );
}

function PageSubheading({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <h2
      className={cn(
        "text-sm font-medium tracking-tight md:text-base",
        className,
      )}
      {...props}
    />
  );
}

export { PageHeader, PageHeaderHeading, PageHeaderDescription, PageSubheading };
