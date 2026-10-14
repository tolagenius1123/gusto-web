"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function ThemeToggleItem() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <DropdownMenuItem
      closeOnClick={false}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <SunIcon aria-hidden="true" className="hidden dark:block" />
      <MoonIcon aria-hidden="true" className="dark:hidden" />
      <span className="hidden dark:inline">Switch to light mode</span>
      <span className="dark:hidden">Switch to dark mode</span>
    </DropdownMenuItem>
  );
}
