import {
  AnchorIcon,
  ConstructionIcon,
  FactoryIcon,
  MountainIcon,
  TreesIcon,
  type LucideIcon,
} from "lucide-react";
import type { SiteType } from "@/types/job";

export const siteTypeConfig: Record<SiteType, { label: string; icon: LucideIcon }> = {
  onshore: { label: "Onshore", icon: TreesIcon },
  offshore: { label: "Offshore", icon: AnchorIcon },
  plant: { label: "Plant", icon: FactoryIcon },
  construction_site: { label: "Construction site", icon: ConstructionIcon },
  mine: { label: "Mine", icon: MountainIcon },
};

export const siteTypes = Object.keys(siteTypeConfig) as SiteType[];
