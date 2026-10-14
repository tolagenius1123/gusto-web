import type { LucideProps } from "lucide-react";

function createSafetyIcon(displayName: string, paths: string[]) {
  function SafetyIcon({ size = 24, strokeWidth = 2, ...props }: LucideProps) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
    );
  }
  SafetyIcon.displayName = displayName;
  return SafetyIcon;
}

export const SafetyBootIcon = createSafetyIcon("SafetyBootIcon", [
  "M5 3h7v8.5l5.2 2.1A4 4 0 0 1 20 17.3V18H4V4a1 1 0 0 1 1-1z",
  "M3 18h18v3H3z",
  "M8.5 6.5H12",
  "M8.5 9.5H12",
  "M15.5 13v5",
]);

export const HiVisVestIcon = createSafetyIcon("HiVisVestIcon", [
  "M8 3 6 4v4a3 3 0 0 1-1 2v11h14V10a3 3 0 0 1-1-2V4l-2-1-4 6z",
  "M12 9v12",
  "M5 14h5",
  "M14 14h5",
  "M5 17.5h5",
  "M14 17.5h5",
]);
