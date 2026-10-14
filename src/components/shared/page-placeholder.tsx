import { ConstructionIcon, type LucideIcon } from "lucide-react";
import { HazardTape } from "@/components/layout/hazard-tape";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

interface PagePlaceholderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function PagePlaceholder({ icon: Icon, title, description }: PagePlaceholderProps) {
  return (
    <Card className="animate-rise gap-0 rounded-2xl py-0">
      <HazardTape animated className="h-2" />
      <Empty className="py-16">
        <EmptyHeader>
          <EmptyMedia variant="icon" className="size-14 rounded-2xl bg-primary/15 text-primary [&_svg]:size-7">
            <Icon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle className="font-heading text-2xl font-bold tracking-wide uppercase">
            <h1>{title}</h1>
          </EmptyTitle>
          <EmptyDescription>{description}</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <p className="inline-flex items-center gap-2 rounded-full border border-hivis/40 bg-hivis/10 px-3 py-1 text-xs font-medium text-caution">
            <ConstructionIcon aria-hidden="true" className="size-3.5" />
            Work in progress. Hard hats on.
          </p>
        </EmptyContent>
      </Empty>
    </Card>
  );
}
