import { HazardTape } from "@/components/layout/hazard-tape";
import { SiteLogo } from "@/components/layout/site-logo";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-[radial-gradient(ellipse_70%_40%_at_50%_-5%,var(--glow),transparent_70%)]">
      <HazardTape className="h-1" />
      <header className="mx-auto w-full max-w-2xl px-5 pt-6">
        <SiteLogo href="/" showWordmark="always" />
      </header>
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10">{children}</main>
    </div>
  );
}
