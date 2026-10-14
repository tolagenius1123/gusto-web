import { currentUser, unreadCounts } from "@/mocks/current-user";
import { HazardTape } from "./hazard-tape";
import { HeaderSearch } from "./header-search";
import { NavLink } from "./nav-link";
import { PrimaryNav } from "./primary-nav";
import { SiteLogo } from "./site-logo";
import { UserMenu } from "./user-menu";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur-xl">
      <HazardTape />
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <UserMenu user={currentUser} className="md:hidden" />
        <SiteLogo className="max-md:hidden" />
        <HeaderSearch className="flex-1 md:max-w-64 lg:max-w-80" />
        <PrimaryNav variant="header" className="ml-auto hidden h-full md:block" />
        <UserMenu user={currentUser} className="hidden h-full md:flex" />
        <NavLink
          itemId="messaging"
          count={unreadCounts.messaging}
          labelVisibility="never"
          className="md:hidden"
        />
      </div>
    </header>
  );
}
