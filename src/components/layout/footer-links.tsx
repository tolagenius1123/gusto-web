import Link from "next/link";
import { siteConfig } from "@/config/site";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Help Center", href: "/help" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Advertise", href: "/advertise" },
];

export function FooterLinks() {
  return (
    <footer className="px-2 text-xs text-muted-foreground">
      <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1">
        {footerLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-primary hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-center">&copy; {siteConfig.name}</p>
    </footer>
  );
}
