import { cn } from "@/lib/utils";
import { getPasswordStrength, strengthLabels } from "../password-strength";

const barColors = ["bg-destructive", "bg-destructive", "bg-hivis", "bg-success", "bg-success"];

export function PasswordStrengthMeter({ password }: { password: string }) {
  const strength = getPasswordStrength(password);

  return (
    <div className="space-y-1.5" aria-live="polite">
      <div aria-hidden="true" className="grid grid-cols-4 gap-1">
        {[1, 2, 3, 4].map((level) => (
          <span
            key={level}
            className={cn("h-1.5 rounded-full bg-muted transition-colors duration-300", strength >= level && barColors[strength])}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Password strength: <span className="font-semibold text-foreground">{strengthLabels[strength]}</span>
      </p>
    </div>
  );
}
