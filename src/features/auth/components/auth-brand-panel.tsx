import { BellRingIcon, BriefcaseBusinessIcon, GraduationCapIcon, ShieldCheckIcon, type LucideIcon } from "lucide-react";
import { HazardTape } from "@/components/layout/hazard-tape";
import { SiteLogo } from "@/components/layout/site-logo";
import { cn } from "@/lib/utils";

const valueProps: { icon: LucideIcon; title: string; description: string; iconClassName: string }[] = [
  {
    icon: ShieldCheckIcon,
    title: "Verified certifications",
    description: "Show employers your NEBOSH, IOSH and OPITO tickets, with expiry reminders built in.",
    iconClassName: "bg-success/15 text-success",
  },
  {
    icon: BriefcaseBusinessIcon,
    title: "Jobs matched to your tickets",
    description: "Onshore, offshore and site roles filtered by the certifications you already hold.",
    iconClassName: "bg-primary/15 text-primary",
  },
  {
    icon: BellRingIcon,
    title: "Safety alerts from your network",
    description: "Lessons learned and critical alerts from the people who do the work.",
    iconClassName: "bg-hivis/15 text-caution",
  },
  {
    icon: GraduationCapIcon,
    title: "Accredited training",
    description: "Book Gusto Academy courses and renew certificates before they lapse.",
    iconClassName: "bg-success/15 text-success",
  },
];

export function AuthBrandPanel({ className }: { className?: string }) {
  return (
    <aside
      aria-label="About Gusto HSE"
      className={cn(
        "relative flex-col justify-between overflow-hidden border-r bg-card/60 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,var(--glow),transparent_70%)]",
        className,
      )}
    >
      <HazardTape animated className="h-1.5" />
      <div className="flex flex-1 flex-col justify-center gap-10 p-10 xl:p-14">
        <SiteLogo href="/" showWordmark="always" />
        <div className="space-y-4">
          <h2 className="font-heading text-5xl leading-[1.05] font-bold tracking-wide uppercase xl:text-6xl">
            The network built for <span className="text-caution">HSE</span> professionals
          </h2>
          <p className="max-w-md text-muted-foreground">
            Connect with safety leaders, find roles that match your certifications and keep every crew safer.
          </p>
        </div>
        <ul className="grid gap-5 xl:grid-cols-2">
          {valueProps.map(({ icon: Icon, title, description, iconClassName }, index) => (
            <li key={title} className="flex animate-rise gap-3" style={{ animationDelay: `${index * 80}ms` }}>
              <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", iconClassName)}>
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{title}</span>
                <span className="text-xs leading-relaxed text-muted-foreground">{description}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <HazardTape className="h-1.5" />
    </aside>
  );
}
