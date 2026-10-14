"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const COLLAPSE_CHARACTER_LIMIT = 240;
const COLLAPSE_LINE_LIMIT = 3;

interface ExpandableTextProps {
  text: string;
  renderText?: (text: string) => React.ReactNode;
  className?: string;
}

export function ExpandableText({ text, renderText, className }: ExpandableTextProps) {
  const isLong = text.length > COLLAPSE_CHARACTER_LIMIT || text.split("\n").length > COLLAPSE_LINE_LIMIT;
  const [isExpanded, setIsExpanded] = useState(!isLong);

  return (
    <div className={className}>
      <p className={cn("text-sm leading-relaxed", isExpanded ? "whitespace-pre-line" : "line-clamp-3")}>
        {renderText ? renderText(text) : text}
      </p>
      {!isExpanded && (
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="mt-1 rounded-sm text-sm font-medium text-muted-foreground outline-none hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          ...see more
        </button>
      )}
    </div>
  );
}
