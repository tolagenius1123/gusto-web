import { AppHeader } from "@/components/layout/app-header";
import { FloatingSafetyIcons } from "@/components/layout/floating-safety-icons";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Skip to main content
      </a>
      <FloatingSafetyIcons />
      <AppHeader />
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 pb-24 md:pb-10"
      >
        {children}
      </main>
      <MobileTabBar />
    </>
  );
}
