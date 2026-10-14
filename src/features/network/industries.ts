import { ConstructionIcon, FactoryIcon, FuelIcon, LeafIcon, PickaxeIcon, type LucideIcon } from "lucide-react";
import type { Industry } from "@/types/network";

interface IndustryConfig {
  label: string;
  icon: LucideIcon;
  bannerClassName: string;
  iconClassName: string;
}

export const industryConfig: Record<Industry, IndustryConfig> = {
  oil_gas: {
    label: "Oil and gas",
    icon: FuelIcon,
    bannerClassName: "from-destructive/35 to-hivis/20",
    iconClassName: "text-destructive",
  },
  construction: {
    label: "Construction",
    icon: ConstructionIcon,
    bannerClassName: "from-hivis/35 to-primary/20",
    iconClassName: "text-caution",
  },
  manufacturing: {
    label: "Manufacturing",
    icon: FactoryIcon,
    bannerClassName: "from-primary/40 to-muted",
    iconClassName: "text-primary",
  },
  environmental: {
    label: "Environmental",
    icon: LeafIcon,
    bannerClassName: "from-success/35 to-primary/15",
    iconClassName: "text-success",
  },
  mining: {
    label: "Mining",
    icon: PickaxeIcon,
    bannerClassName: "from-muted-foreground/30 to-hivis/15",
    iconClassName: "text-muted-foreground",
  },
};

export const industries = Object.keys(industryConfig) as Industry[];
