"use client";

import { useSyncExternalStore } from "react";

const MINUTE_MS = 60_000;

function subscribe(onTick: () => void) {
  const intervalId = setInterval(onTick, MINUTE_MS);
  return () => clearInterval(intervalId);
}

function getCurrentMinute() {
  return Math.floor(Date.now() / MINUTE_MS) * MINUTE_MS;
}

function getServerSnapshot() {
  return null;
}

/** Current time rounded to the minute, or null during server render to keep hydration deterministic. */
export function useNow(): number | null {
  return useSyncExternalStore(subscribe, getCurrentMinute, getServerSnapshot);
}
