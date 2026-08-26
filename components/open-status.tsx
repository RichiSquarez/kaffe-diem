"use client";

import { useEffect, useState } from "react";
import { getOpenState, type OpenState } from "@/lib/content";

/**
 * Live open/closed badge.
 *
 * Pages are statically prerendered, so this must resolve on the client —
 * rendering it on the server would bake in the build-time answer and go stale.
 * Renders nothing until mounted, which also avoids a hydration mismatch.
 */
export function OpenStatus({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    setState(getOpenState());
    // Re-check on the minute so the badge flips without a reload.
    const timer = setInterval(() => setState(getOpenState()), 60_000);
    return () => clearInterval(timer);
  }, []);

  if (!state) {
    // Reserve the row so nothing shifts when the badge appears.
    return <span className="inline-block h-8" aria-hidden />;
  }

  const openTone = tone === "dark" ? "text-crema" : "text-espresso";
  const mutedTone = tone === "dark" ? "text-crema/65" : "text-muted";
  const border = tone === "dark" ? "border-crema/20" : "border-espresso/15";

  return (
    <span
      className={`inline-flex items-center gap-2.5 rounded-full border ${border} px-4 py-1.5 text-sm font-medium`}
    >
      <span className="relative flex h-2.5 w-2.5" aria-hidden>
        <span
          className={`absolute inline-flex h-full w-full rounded-full ${
            state.isOpen ? "bg-emerald-500" : "bg-clay"
          }`}
        />
      </span>
      {state.isOpen ? (
        <span className={openTone}>
          Åpent nå
          <span className={mutedTone}> · stenger {state.closesAt}</span>
        </span>
      ) : (
        <span className={openTone}>
          Stengt
          <span className={mutedTone}>
            {" "}
            · åpner {state.nextDay} {state.nextOpensAt}
          </span>
        </span>
      )}
    </span>
  );
}
