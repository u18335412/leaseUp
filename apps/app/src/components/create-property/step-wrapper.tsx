import type { FC } from "react";

export const Step: FC<{
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => {
  return (
    <div className="animate-in md:fade-in slide-in-from-left-2 md:slide-in-from-left-0">
      <div>
        <h2 className="font-medium tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div>{children}</div>
    </div>
  );
};
