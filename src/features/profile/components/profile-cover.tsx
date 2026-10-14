import { HardHatIcon, ShieldCheckIcon, TrafficConeIcon } from "lucide-react";
import { HiVisVestIcon, SafetyBootIcon } from "@/components/icons/safety-icons";
import { HazardTape } from "@/components/layout/hazard-tape";

const coverIcons = [
  { icon: HardHatIcon, className: "top-6 left-[8%] size-16 -rotate-12 text-hivis/25" },
  { icon: HiVisVestIcon, className: "top-10 left-[38%] size-14 rotate-6 text-foreground/10" },
  { icon: ShieldCheckIcon, className: "top-4 right-[30%] size-20 -rotate-6 text-success/20" },
  { icon: SafetyBootIcon, className: "bottom-6 right-[12%] size-14 rotate-12 text-foreground/10" },
  { icon: TrafficConeIcon, className: "top-8 right-[4%] size-12 -rotate-12 text-destructive/20" },
];

export function ProfileCover() {
  return (
    <div aria-hidden="true" className="relative h-32 overflow-hidden sm:h-44">
      <div className="absolute inset-0 bg-linear-135 from-primary/40 via-card to-success/25" />
      <div className="blueprint-grid absolute inset-0 opacity-70" />
      {coverIcons.map(({ icon: Icon, className }) => (
        <Icon key={className} strokeWidth={1.5} className={`absolute ${className}`} />
      ))}
      <HazardTape className="absolute inset-x-0 bottom-0 h-1.5" />
    </div>
  );
}
