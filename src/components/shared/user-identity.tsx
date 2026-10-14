import Link from "next/link";
import { getFullName } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { UserSummary } from "@/types/user";
import { UserAvatar } from "./user-avatar";

interface UserIdentityProps {
  user: UserSummary;
  meta?: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
}

const avatarSizes = {
  sm: "size-8",
  md: "size-12",
};

export function getProfileHref(user: Pick<UserSummary, "username">) {
  return `/in/${user.username}`;
}

export function UserIdentity({ user, meta, size = "md", className }: UserIdentityProps) {
  const profileHref = getProfileHref(user);

  return (
    <div className={cn("flex min-w-0 items-start gap-2.5", className)}>
      <Link href={profileHref} tabIndex={-1} aria-hidden="true" className="shrink-0">
        <UserAvatar user={user} className={avatarSizes[size]} />
      </Link>
      <div className="min-w-0 leading-tight">
        <Link
          href={profileHref}
          className="rounded-sm font-semibold outline-none hover:text-primary hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {getFullName(user)}
        </Link>
        <p className="truncate text-xs text-muted-foreground">{user.headline}</p>
        {meta && <div className="mt-0.5 text-xs text-muted-foreground">{meta}</div>}
      </div>
    </div>
  );
}
