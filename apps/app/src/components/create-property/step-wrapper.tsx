import type { FC } from "react";

export const Step: FC<{
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => {
  return (
    <div className="animate-in fade-in">
      <div>
        <h2 className="font-medium tracking-tight">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div>{children}</div>
    </div>
  );
};
