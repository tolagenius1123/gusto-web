import { SearchIcon } from "lucide-react";
import Form from "next/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function HeaderSearch({ className }: { className?: string }) {
  return (
    <Form action="/search" role="search" className={cn("relative", className)}>
      <label htmlFor="header-search" className="sr-only">
        Search people, jobs, companies and training
      </label>
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        id="header-search"
        type="search"
        name="q"
        placeholder="Search people, jobs, training"
        autoComplete="off"
        className="h-10 rounded-full border-border bg-muted/60 pl-10 transition-colors focus-visible:bg-background"
      />
    </Form>
  );
}
