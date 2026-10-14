"use client";

import { ImageIcon, NewspaperIcon, TriangleAlertIcon, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { HazardTape } from "@/components/layout/hazard-tape";
import { UserAvatar } from "@/components/shared/user-avatar";
import { UserIdentity } from "@/components/shared/user-identity";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { notifyComingSoon } from "@/lib/notify";
import { cn } from "@/lib/utils";
import type { PostKind } from "@/types/post";
import type { UserSummary } from "@/types/user";

const MAX_POST_LENGTH = 3000;

interface QuickAction {
  label: string;
  icon: LucideIcon;
  iconClassName: string;
  kind?: PostKind;
  comingSoon?: string;
}

const quickActions: QuickAction[] = [
  { label: "Media", icon: ImageIcon, iconClassName: "text-primary", comingSoon: "Media uploads" },
  { label: "Safety alert", icon: TriangleAlertIcon, iconClassName: "text-caution", kind: "safety_alert" },
  { label: "Write article", icon: NewspaperIcon, iconClassName: "text-success", comingSoon: "Articles" },
];

export function PostComposer({ user }: { user: UserSummary }) {
  const [isOpen, setIsOpen] = useState(false);
  const [kind, setKind] = useState<PostKind>("post");
  const [content, setContent] = useState("");
  const isSafetyAlert = kind === "safety_alert";

  function openComposer(nextKind: PostKind = "post") {
    setKind(nextKind);
    setIsOpen(true);
  }

  function handleQuickAction(action: QuickAction) {
    if (action.comingSoon) {
      notifyComingSoon(action.comingSoon);
      return;
    }
    openComposer(action.kind);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    notifyComingSoon("Publishing posts");
  }

  return (
    <>
      <Card className="gap-2 rounded-2xl pb-1">
        <div className="flex items-center gap-3 px-(--card-spacing)">
          <UserAvatar user={user} className="size-12 ring-2 ring-primary/40" />
          <button
            type="button"
            onClick={() => openComposer()}
            className="h-12 flex-1 rounded-full border bg-muted/50 px-5 text-left text-sm font-medium text-muted-foreground transition-all outline-none hover:border-primary/50 hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Start a post
          </button>
        </div>
        <div className="flex justify-around px-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => handleQuickAction(action)}
              className="group flex items-center gap-1.5 rounded-full px-2 py-2.5 text-xs font-medium whitespace-nowrap sm:gap-2 sm:px-3 sm:text-sm text-muted-foreground transition-colors outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <action.icon
                aria-hidden="true"
                className={cn("size-5 transition-transform group-hover:scale-110", action.iconClassName)}
              />
              {action.label}
            </button>
          ))}
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="overflow-hidden rounded-2xl sm:max-w-xl">
          {isSafetyAlert && <HazardTape animated className="-mx-4 -mt-4 h-1.5 w-auto" />}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <DialogHeader>
              <DialogTitle className="sr-only">Create a post</DialogTitle>
              <UserIdentity user={user} meta="Post to anyone" />
              <DialogDescription className="sr-only">
                Share an update, question or safety alert with your network.
              </DialogDescription>
            </DialogHeader>
            <label htmlFor="post-composer-content" className="sr-only">
              Post content
            </label>
            <Textarea
              id="post-composer-content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder={
                isSafetyAlert
                  ? "Describe the hazard, what happened and the action others should take."
                  : "What do you want to talk about?"
              }
              maxLength={MAX_POST_LENGTH}
              className="min-h-48 resize-none border-none px-0 text-base shadow-none focus-visible:ring-0 md:text-base"
              autoFocus
            />
            <DialogFooter className="items-center sm:justify-between">
              <Button
                type="button"
                variant={isSafetyAlert ? "secondary" : "ghost"}
                aria-pressed={isSafetyAlert}
                onClick={() => setKind(isSafetyAlert ? "post" : "safety_alert")}
                className={cn("rounded-full", isSafetyAlert && "bg-hivis text-hivis-foreground hover:bg-hivis/90")}
              >
                <TriangleAlertIcon aria-hidden="true" />
                Safety alert
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground" aria-live="polite">
                  {content.length}/{MAX_POST_LENGTH}
                </span>
                <Button type="submit" disabled={!content.trim()} className="rounded-full px-4">
                  Post
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
