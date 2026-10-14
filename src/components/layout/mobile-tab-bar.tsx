import { PrimaryNav } from "./primary-nav";

export function MobileTabBar() {
  return (
    <PrimaryNav
      variant="tabbar"
      className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/80 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
    />
  );
}
