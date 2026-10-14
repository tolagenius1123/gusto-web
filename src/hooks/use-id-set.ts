"use client";

import { useCallback, useState } from "react";

export function useIdSet(initialIds: string[] = []) {
  const [ids, setIds] = useState(() => new Set(initialIds));

  const add = useCallback((id: string) => {
    setIds((current) => new Set(current).add(id));
  }, []);

  const addMany = useCallback((idsToAdd: string[]) => {
    setIds((current) => new Set([...current, ...idsToAdd]));
  }, []);

  const remove = useCallback((id: string) => {
    setIds((current) => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }, []);

  const toggle = useCallback((id: string) => {
    setIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return { has: (id: string) => ids.has(id), add, addMany, remove, toggle };
}
