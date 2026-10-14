"use client";

import { MailIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { RelativeTime } from "@/components/shared/relative-time";
import { UserIdentity } from "@/components/shared/user-identity";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getFullName, pluralize } from "@/lib/format";
import type { Invitation } from "@/types/network";

export function InvitationsCard({ invitations: initialInvitations }: { invitations: Invitation[] }) {
  const [invitations, setInvitations] = useState(initialInvitations);

  function respond(invitation: Invitation, accepted: boolean) {
    setInvitations((current) => current.filter((item) => item.id !== invitation.id));
    if (accepted) {
      toast.success(`You are now connected with ${invitation.from.firstName}`);
    } else {
      toast(`Invitation from ${invitation.from.firstName} ignored`);
    }
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader className="flex items-center justify-between">
        <WidgetTitle icon={MailIcon}>
          Invitations
          {invitations.length > 0 && (
            <span className="rounded-full bg-primary/15 px-2 py-0.5 font-sans text-xs text-primary">
              {invitations.length}
            </span>
          )}
        </WidgetTitle>
      </CardHeader>
      <CardContent>
        {invitations.length === 0 ? (
          <p className="py-2 text-sm text-muted-foreground">You are all caught up. No pending invitations.</p>
        ) : (
          <ul className="divide-y" aria-live="polite">
            {invitations.map((invitation) => {
              const fullName = getFullName(invitation.from);
              return (
                <li
                  key={invitation.id}
                  className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0 space-y-2">
                    <UserIdentity
                      user={invitation.from}
                      meta={
                        <>
                          {pluralize(invitation.mutualConnections, "mutual connection")}
                          <span aria-hidden="true"> · </span>
                          <RelativeTime date={invitation.sentAt} />
                        </>
                      }
                    />
                    {invitation.message && (
                      <blockquote className="ml-14.5 rounded-lg border-l-2 border-primary/50 bg-muted/40 px-3 py-2 text-sm text-foreground/90">
                        {invitation.message}
                      </blockquote>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2 max-sm:ml-14.5">
                    <Button
                      variant="ghost"
                      className="rounded-full"
                      aria-label={`Ignore invitation from ${fullName}`}
                      onClick={() => respond(invitation, false)}
                    >
                      Ignore
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-primary/60 text-primary hover:bg-primary/10 hover:text-primary"
                      aria-label={`Accept invitation from ${fullName}`}
                      onClick={() => respond(invitation, true)}
                    >
                      Accept
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
