"use client";

import Link from "next/link";
import { ExpandableText } from "@/components/shared/expandable-text";

const HASHTAG_PATTERN = /(#[\p{L}\p{N}_]+)/u;

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
  return <ExpandableText text={content} renderText={renderWithHashtags} className="px-(--card-spacing)" />;
}
