import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFullName, getInitials } from "@/lib/format";
import type { UserSummary } from "@/types/user";

type UserAvatarProps = Omit<React.ComponentProps<typeof Avatar>, "children"> & {
  user: Pick<UserSummary, "firstName" | "lastName" | "avatarUrl">;
};

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.avatarUrl && (
        <AvatarImage src={user.avatarUrl} alt={getFullName(user)} />
      )}
      <AvatarFallback className="bg-secondary font-medium text-secondary-foreground">
        {getInitials(user.firstName, user.lastName)}
      </AvatarFallback>
    </Avatar>
  );
}
