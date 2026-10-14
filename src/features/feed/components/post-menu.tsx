"use client";

import { BookmarkIcon, EllipsisIcon, EyeOffIcon, FlagIcon, LinkIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifyComingSoon } from "@/lib/notify";

export function PostMenu({ postId, authorName }: { postId: string; authorName: string }) {
  async function copyLink() {
    const url = new URL(`/posts/${postId}`, window.location.origin).toString();
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy the link");
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" className="rounded-full" />}
        aria-label={`More actions for ${authorName}'s post`}
      >
        <EllipsisIcon aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem onClick={() => notifyComingSoon("Saving posts")}>
          <BookmarkIcon aria-hidden="true" />
          Save
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyLink}>
          <LinkIcon aria-hidden="true" />
          Copy link to post
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => notifyComingSoon("Feed preferences")}>
          <EyeOffIcon aria-hidden="true" />
          Not interested
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => notifyComingSoon("Reporting")}>
          <FlagIcon aria-hidden="true" />
          Report post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
