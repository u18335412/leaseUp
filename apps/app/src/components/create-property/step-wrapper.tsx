import { FC } from 'react';

export const Step: FC<{
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => {
  return (
    <div>
      <div>
        <h2 className="tracking-tight">{title}</h2>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      </div>

      <div>{children}</div>
    </div>
  );
};
