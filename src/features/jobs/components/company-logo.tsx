import { industryConfig } from "@/config/industries";
import { cn } from "@/lib/utils";
import type { Company } from "@/types/job";

const sizeClasses = {
  md: "size-12 rounded-xl text-xl",
  lg: "size-16 rounded-2xl text-3xl",
};

interface CompanyLogoProps {
  company: Company;
  size?: keyof typeof sizeClasses;
  className?: string;
}

export function CompanyLogo({ company, size = "md", className }: CompanyLogoProps) {
  const { bannerClassName } = industryConfig[company.industry];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center border bg-linear-to-br font-heading font-bold",
        bannerClassName,
        sizeClasses[size],
        className,
      )}
    >
      {company.name.charAt(0)}
    </span>
  );
}
