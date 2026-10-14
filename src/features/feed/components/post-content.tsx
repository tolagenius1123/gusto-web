"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const HASHTAG_PATTERN = /(#[\p{L}\p{N}_]+)/u;
const COLLAPSE_CHARACTER_LIMIT = 240;
const COLLAPSE_LINE_LIMIT = 3;

function renderWithHashtags(content: string) {
  return content.split(HASHTAG_PATTERN).map((part, index) =>
    index % 2 === 1 ? (
      <Link
        key={index}
        href={`/search?q=${encodeURIComponent(part)}`}
        className="font-medium text-primary hover:underline"
      >
        {part}
      </Link>
    ) : (
      part
    ),
  );
}

export function PostContent({ content }: { content: string }) {
  const isLong =
    content.length > COLLAPSE_CHARACTER_LIMIT ||
    content.split("\n").length > COLLAPSE_LINE_LIMIT;
  const [isExpanded, setIsExpanded] = useState(!isLong);

  return (
    <div className="px-(--card-spacing)">
      <p className={cn("text-sm", isExpanded ? "whitespace-pre-line" : "line-clamp-3")}>
        {renderWithHashtags(content)}
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
