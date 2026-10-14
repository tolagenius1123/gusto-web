import {
  BriefcaseBusinessIcon,
  FlagIcon,
  HardHatIcon,
  ShieldCheckIcon,
  SquareKanbanIcon,
  type LucideIcon,
} from "lucide-react";
import type { CourseCategory, DeliveryMode } from "@/types/training";

interface CategoryConfig {
  label: string;
  icon: LucideIcon;
  bannerClassName: string;
  iconClassName: string;
}

export const categoryConfig: Record<CourseCategory, CategoryConfig> = {
  hse_leadership: {
    label: "HSE Leadership",
    icon: FlagIcon,
    bannerClassName: "from-primary/45 to-success/20",
    iconClassName: "text-primary",
  },
  safety: {
    label: "Safety Training",
    icon: HardHatIcon,
    bannerClassName: "from-hivis/40 to-destructive/20",
    iconClassName: "text-caution",
  },
  iso_standards: {
    label: "ISO Standards",
    icon: ShieldCheckIcon,
    bannerClassName: "from-success/40 to-primary/15",
    iconClassName: "text-success",
  },
  project_management: {
    label: "Project Management",
    icon: SquareKanbanIcon,
    bannerClassName: "from-primary/35 to-muted",
    iconClassName: "text-primary",
  },
  management: {
    label: "Management Courses",
    icon: BriefcaseBusinessIcon,
    bannerClassName: "from-muted-foreground/30 to-primary/20",
    iconClassName: "text-muted-foreground",
  },
};

export const courseCategories = Object.keys(categoryConfig) as CourseCategory[];

export const deliveryLabels: Record<DeliveryMode, string> = {
  classroom: "Classroom",
  online: "Online",
  blended: "Blended",
};
