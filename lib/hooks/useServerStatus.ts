"use client";

import { useCallback, useEffect, useState } from "react";
import type { ServerStatus } from "@/lib/types";

/** Клиентский опрос /api/status. initial — данные, отрендеренные на сервере. */
export function useServerStatus(initial?: ServerStatus, intervalMs = 60_000) {
  const [status, setStatus] = useState<ServerStatus | undefined>(initial);
  const [loading, setLoading] = useState(!initial);
  const [error, setError] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      if (!res.ok) throw new Error();
      setStatus((await res.json()) as ServerStatus);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initial) refresh();
    const id = window.setInterval(() => { if (document.visibilityState === "visible") refresh(); }, intervalMs);
    return () => window.clearInterval(id);
  }, [initial, intervalMs, refresh]);

  return { status, loading, error, refresh };
}
