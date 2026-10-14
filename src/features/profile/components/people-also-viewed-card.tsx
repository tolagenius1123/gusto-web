import { UsersIcon } from "lucide-react";
import { UserIdentity } from "@/components/shared/user-identity";
import { WidgetTitle } from "@/components/shared/widget-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getFullName } from "@/lib/format";
import type { UserSummary } from "@/types/user";
import { ConnectButton } from "./connect-button";

export function PeopleAlsoViewedCard({ people }: { people: UserSummary[] }) {
  return (
    <Card size="sm" className="rounded-2xl">
      <CardHeader>
        <WidgetTitle icon={UsersIcon}>People also viewed</WidgetTitle>
      </CardHeader>
      <CardContent>
        <ul className="divide-y">
          {people.map((person) => (
            <li key={person.id} className="space-y-2 py-3 first:pt-0 last:pb-0">
              <UserIdentity user={person} size="sm" />
              <div className="pl-10.5">
                <ConnectButton name={getFullName(person)} />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
