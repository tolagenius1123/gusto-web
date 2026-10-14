"use client";

import { EllipsisIcon, MessageSquareTextIcon, PencilIcon, Share2Icon, UserPlusIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { notifyComingSoon } from "@/lib/notify";

interface ProfileActionsProps {
  isOwnProfile: boolean;
  firstName: string;
}

export function ProfileActions({ isOwnProfile, firstName }: ProfileActionsProps) {
  async function shareProfile() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Profile link copied");
    } catch {
      toast.error("Could not copy the link");
    }
  }

  if (isOwnProfile) {
    return (
      <div className="flex flex-wrap gap-2">
        <Button className="rounded-full px-4" onClick={() => notifyComingSoon("Editing your profile")}>
          <PencilIcon aria-hidden="true" />
          Edit profile
        </Button>
        <Button variant="outline" className="rounded-full px-4" onClick={shareProfile}>
          <Share2Icon aria-hidden="true" />
          Share profile
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button className="rounded-full px-4" onClick={() => notifyComingSoon("Connecting")}>
        <UserPlusIcon aria-hidden="true" />
        Connect
      </Button>
      <Button variant="outline" className="rounded-full px-4" onClick={() => notifyComingSoon("Messaging")}>
        <MessageSquareTextIcon aria-hidden="true" />
        Message
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full"
        aria-label={`More actions for ${firstName}`}
        onClick={shareProfile}
      >
        <EllipsisIcon aria-hidden="true" />
      </Button>
    </div>
  );
}
