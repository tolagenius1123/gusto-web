interface AuthHeaderProps {
  title: string;
  description: React.ReactNode;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <header className="space-y-1.5">
      <h1 className="font-heading text-3xl font-bold tracking-wide uppercase">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </header>
  );
}
