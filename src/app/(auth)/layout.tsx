import { HazardTape } from "@/components/layout/hazard-tape";
import { SiteLogo } from "@/components/layout/site-logo";
import { AuthBrandPanel } from "@/features/auth/components/auth-brand-panel";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh flex-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
      <AuthBrandPanel className="hidden lg:flex" />
      <div className="flex flex-col">
        <div className="lg:hidden">
          <HazardTape className="h-1" />
          <div className="p-5">
            <SiteLogo href="/" showWordmark="always" />
          </div>
        </div>
        <main className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10">
          <div className="w-full max-w-md animate-rise">{children}</div>
        </main>
      </div>
    </div>
  );
}
