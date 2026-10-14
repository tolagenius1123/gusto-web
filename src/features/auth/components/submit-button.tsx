import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface SubmitButtonProps {
  isPending: boolean;
  pendingLabel: string;
  children: React.ReactNode;
}

export function SubmitButton({ isPending, pendingLabel, children }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isPending}
      aria-busy={isPending}
      className="h-11 w-full rounded-full text-sm shadow-[0_0_24px_-6px_var(--primary)]"
    >
      {isPending && <Spinner aria-hidden="true" />}
      {isPending ? pendingLabel : children}
    </Button>
  );
}
