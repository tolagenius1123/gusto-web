import { ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/feed"
      aria-label={`${siteConfig.name} home`}
      className={cn(
        "group flex shrink-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-xl bg-success text-success-foreground shadow-[0_0_20px_-4px_var(--success)] transition-transform duration-300 group-hover:rotate-[-6deg]">
        <ShieldCheckIcon aria-hidden="true" className="size-5" strokeWidth={2.25} />
      </span>
      <span className="hidden items-baseline gap-1 font-heading lg:flex">
        <span className="text-xl font-bold tracking-wide uppercase">{siteConfig.shortName}</span>
        <span className="rounded-sm bg-hivis px-1 text-[10px] font-bold tracking-wider text-hivis-foreground">
          HSE
        </span>
      </span>
    </Link>
  );
}
