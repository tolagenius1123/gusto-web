import { ActivityIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { AnimatedNumber } from "@/components/shared/animated-number";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PulseStat {
  id: string;
  label: string;
  value: number;
  change: number;
}

export function SafetyPulseCard({ stats }: { stats: PulseStat[] }) {
  return (
    <Card size="sm" className="relative overflow-hidden rounded-2xl">
      <CardHeader className="relative">
        <WidgetTitle icon={ActivityIcon} iconClassName="text-success">
          Safety Pulse
        </WidgetTitle>
        <p className="text-xs text-muted-foreground">Across your network this week</p>
      </CardHeader>
      <CardContent className="relative">
        <ul className="grid grid-cols-3 gap-2">
          {stats.map((stat) => {
            const TrendIcon = stat.change >= 0 ? TrendingUpIcon : TrendingDownIcon;
            return (
              <li key={stat.id} className="rounded-xl border bg-card/70 p-2.5 text-center backdrop-blur">
                <AnimatedNumber value={stat.value} className="block font-heading text-2xl font-bold" />
                <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">{stat.label}</p>
                <p className="mt-1.5 inline-flex items-center gap-0.5 text-[10px] font-semibold text-muted-foreground">
                  <TrendIcon aria-hidden="true" className="size-3" />
                  {stat.change > 0 ? "+" : ""}
                  {stat.change}%
                </p>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
