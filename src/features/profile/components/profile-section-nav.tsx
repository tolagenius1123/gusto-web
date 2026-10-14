interface ProfileSectionNavProps {
  sections: { id: string; label: string }[];
}

export function ProfileSectionNav({ sections }: ProfileSectionNavProps) {
  return (
    <nav
      aria-label="Profile sections"
      className="sticky top-[4.5rem] z-30 -mx-4 overflow-x-auto [scrollbar-width:none] bg-background/80 px-4 py-2 backdrop-blur-xl sm:mx-0 sm:rounded-full sm:border sm:px-2"
    >
      <ul className="flex gap-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="block rounded-full px-3.5 py-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
