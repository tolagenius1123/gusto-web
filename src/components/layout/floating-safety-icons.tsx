import {
  BiohazardIcon,
  FireExtinguisherIcon,
  FlaskConicalIcon,
  HardHatIcon,
  LeafIcon,
  LifeBuoyIcon,
  RadiationIcon,
  ShieldCheckIcon,
  SirenIcon,
  TrafficConeIcon,
  TriangleAlertIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";
import {
  EarDefendersIcon,
  HiVisVestIcon,
  SafetyBootIcon,
  SafetyGogglesIcon,
} from "@/components/icons/safety-icons";
import { cn } from "@/lib/utils";

type Tone = "neutral" | "hivis" | "primary" | "success" | "danger";

interface FloatingIcon {
  icon: LucideIcon | typeof SafetyBootIcon;
  top: number;
  left: number;
  size: number;
  rotate: number;
  duration: number;
  tone: Tone;
  desktopOnly?: boolean;
}

const toneClasses: Record<Tone, string> = {
  neutral: "text-foreground/10",
  hivis: "text-hivis/25",
  primary: "text-primary/25",
  success: "text-success/20",
  danger: "text-destructive/20",
};

const floatingIcons: FloatingIcon[] = [
  { icon: HardHatIcon, top: 6, left: 3, size: 64, rotate: -12, duration: 16, tone: "hivis" },
  { icon: SafetyBootIcon, top: 22, left: 90, size: 56, rotate: 8, duration: 19, tone: "neutral" },
  { icon: HiVisVestIcon, top: 48, left: 2, size: 72, rotate: 6, duration: 21, tone: "hivis" },
  { icon: TrafficConeIcon, top: 78, left: 6, size: 52, rotate: -6, duration: 15, tone: "danger" },
  { icon: EarDefendersIcon, top: 62, left: 92, size: 54, rotate: -10, duration: 18, tone: "primary" },
  { icon: FireExtinguisherIcon, top: 85, left: 88, size: 58, rotate: 12, duration: 17, tone: "danger" },
  { icon: SafetyGogglesIcon, top: 36, left: 95, size: 50, rotate: -4, duration: 20, tone: "neutral" },
  { icon: TriangleAlertIcon, top: 30, left: 12, size: 40, rotate: 10, duration: 14, tone: "hivis", desktopOnly: true },
  { icon: ShieldCheckIcon, top: 10, left: 80, size: 46, rotate: -8, duration: 22, tone: "success" },
  { icon: BiohazardIcon, top: 70, left: 15, size: 38, rotate: 14, duration: 23, tone: "neutral", desktopOnly: true },
  { icon: SirenIcon, top: 92, left: 40, size: 40, rotate: -6, duration: 16, tone: "danger", desktopOnly: true },
  { icon: LeafIcon, top: 15, left: 45, size: 36, rotate: 20, duration: 24, tone: "success", desktopOnly: true },
  { icon: RadiationIcon, top: 55, left: 82, size: 36, rotate: 0, duration: 26, tone: "neutral", desktopOnly: true },
  { icon: FlaskConicalIcon, top: 88, left: 68, size: 40, rotate: -14, duration: 18, tone: "primary", desktopOnly: true },
  { icon: LifeBuoyIcon, top: 4, left: 62, size: 38, rotate: 6, duration: 20, tone: "primary", desktopOnly: true },
  { icon: ZapIcon, top: 42, left: 52, size: 34, rotate: -12, duration: 15, tone: "hivis", desktopOnly: true },
  { icon: SafetyBootIcon, top: 95, left: 20, size: 44, rotate: -16, duration: 21, tone: "neutral", desktopOnly: true },
  { icon: HardHatIcon, top: 74, left: 55, size: 46, rotate: 8, duration: 19, tone: "neutral", desktopOnly: true },
];

export function FloatingSafetyIcons() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {floatingIcons.map(({ icon: Icon, top, left, size, rotate, duration, tone, desktopOnly }, index) => (
        <span
          key={index}
          className={cn("absolute animate-float", toneClasses[tone], desktopOnly && "max-md:hidden")}
          style={{
            top: `${top}%`,
            left: `${left}%`,
            animationDuration: `${duration / 2}s`,
            animationDelay: `-${index * 1.7}s`,
          }}
        >
          <Icon width={size} height={size} strokeWidth={1.75} style={{ rotate: `${rotate}deg` }} />
        </span>
      ))}
    </div>
  );
}
