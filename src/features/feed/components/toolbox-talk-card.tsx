import { ArrowRightIcon, ClockIcon, HardHatIcon } from "lucide-react";
import Link from "next/link";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ToolboxTalk {
  topic: string;
  title: string;
  summary: string;
  readMinutes: number;
  href: string;
}

export function ToolboxTalkCard({ talk }: { talk: ToolboxTalk }) {
  return (
    <Card size="sm" className="rounded-2xl border-l-4 border-l-hivis">
      <CardHeader>
        <WidgetTitle icon={HardHatIcon} iconClassName="text-caution">
          Toolbox talk of the day
        </WidgetTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-[11px] font-semibold tracking-wider text-caution uppercase">{talk.topic}</p>
        <h3 className="font-heading text-lg leading-tight font-bold">{talk.title}</h3>
        <p className="text-xs leading-relaxed text-muted-foreground">{talk.summary}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <ClockIcon aria-hidden="true" className="size-3.5" />
            {talk.readMinutes} min read
          </span>
          <Link
            href={talk.href}
            className="group inline-flex items-center gap-1 rounded-full text-xs font-semibold text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Read talk
            <ArrowRightIcon aria-hidden="true" className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
