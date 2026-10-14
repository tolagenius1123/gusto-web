"use client";

import { UserPlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notifyComingSoon } from "@/lib/notify";

export function ConnectButton({ name }: { name: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full"
      aria-label={`Connect with ${name}`}
      onClick={() => notifyComingSoon("Connecting")}
    >
      <UserPlusIcon aria-hidden="true" />
      Connect
    </Button>
  );
}
