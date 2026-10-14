import { CircleDashedIcon, GaugeIcon } from "lucide-react";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProfileStrengthCardProps {
  score: number;
  suggestions: string[];
}

export function ProfileStrengthCard({ score, suggestions }: ProfileStrengthCardProps) {
  return (
    <Card size="sm" className="rounded-2xl">
      <CardHeader>
        <WidgetTitle icon={GaugeIcon} iconClassName="text-success">
          Profile strength
        </WidgetTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-end justify-between">
          <span className="font-heading text-3xl font-bold">{score}%</span>
          <span className="text-xs font-semibold text-success">Almost all-star</span>
        </div>
        <Progress value={score} aria-label="Profile strength" className="[&_[data-slot=progress-indicator]]:bg-linear-to-r [&_[data-slot=progress-indicator]]:from-primary [&_[data-slot=progress-indicator]]:to-success [&_[data-slot=progress-track]]:h-2" />
        <ul className="space-y-1.5">
          {suggestions.map((suggestion) => (
            <li key={suggestion} className="flex items-center gap-2 text-xs text-muted-foreground">
              <CircleDashedIcon aria-hidden="true" className="size-3.5 text-caution" />
              {suggestion}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
