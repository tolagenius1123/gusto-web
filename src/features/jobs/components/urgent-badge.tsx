export function UrgentBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-hivis/15 px-2 py-0.5 text-[11px] font-bold tracking-wide text-caution uppercase">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-hivis animate-beacon" />
      Urgently hiring
    </span>
  );
}
