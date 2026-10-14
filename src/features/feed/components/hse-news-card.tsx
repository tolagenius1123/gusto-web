import { NewspaperIcon } from "lucide-react";
import Link from "next/link";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { NewsItem } from "@/types/news";

export function HseNewsCard({ items }: { items: NewsItem[] }) {
  return (
    <Card size="sm" className="rounded-2xl">
      <CardHeader>
        <WidgetTitle icon={NewspaperIcon}>HSE News</WidgetTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-1">
          {items.map((item, index) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group -mx-2 flex gap-3 rounded-lg px-2 py-1.5 transition-colors outline-none hover:bg-muted/60 focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span aria-hidden="true" className="font-heading text-lg leading-tight font-bold text-primary/50 tabular-nums group-hover:text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span className="line-clamp-2 text-sm font-medium group-hover:text-primary">{item.title}</span>
                  <span className="text-xs text-muted-foreground">{item.meta}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
