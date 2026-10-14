import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingStepperProps {
  steps: readonly { id: string; title: string }[];
  currentIndex: number;
}

export function OnboardingStepper({ steps, currentIndex }: OnboardingStepperProps) {
  return (
    <nav aria-label="Onboarding progress">
      <ol className="flex items-center gap-2">
        {steps.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          return (
            <li key={step.id} aria-current={isCurrent ? "step" : undefined} className="flex flex-1 items-center gap-2">
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border-2 font-heading text-sm font-bold transition-colors duration-300",
                  isComplete && "border-success bg-success text-success-foreground",
                  isCurrent && "border-primary bg-primary/15 text-primary shadow-[0_0_20px_-4px_var(--primary)]",
                  !isComplete && !isCurrent && "border-border text-muted-foreground",
                )}
              >
                {isComplete ? <CheckIcon aria-hidden="true" className="size-4" /> : index + 1}
              </span>
              <span className={cn("hidden text-sm sm:inline", isCurrent ? "font-semibold" : "text-muted-foreground")}>
                {step.title}
                {isComplete && <span className="sr-only"> (completed)</span>}
              </span>
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn("h-0.5 flex-1 rounded-full transition-colors duration-300", isComplete ? "bg-success" : "bg-border")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
