/**
 * Self-check for getOpenState. Run: npm run test
 * Times are constructed in UTC and asserted against Europe/Oslo behaviour.
 */
import assert from "node:assert/strict";
import { getOpenState } from "./content.ts";

// Oslo is UTC+2 in August (CEST).
const oslo = (iso: string) => new Date(iso);

// Tuesday 2026-08-25, 10:00 Oslo = 08:00Z. Tue closes 12:30.
let s = getOpenState(oslo("2026-08-25T08:00:00Z"));
assert.equal(s.isOpen, true, "Tuesday mid-morning should be open");
assert.equal(s.isOpen && s.closesAt, "12:30");

// Tuesday 13:00 Oslo = 11:00Z — after close, next is Wednesday ("i morgen").
s = getOpenState(oslo("2026-08-25T11:00:00Z"));
assert.equal(s.isOpen, false, "after closing should be closed");
assert.equal(!s.isOpen && s.nextDay, "i morgen");
assert.equal(!s.isOpen && s.nextOpensAt, "09:00");

// Tuesday 07:00 Oslo = 05:00Z — before opening, opens later today.
s = getOpenState(oslo("2026-08-25T05:00:00Z"));
assert.equal(s.isOpen, false, "before opening should be closed");
assert.equal(!s.isOpen && s.nextDay, "i dag");

// Monday closes 12:00, so 12:15 Oslo (10:15Z) is closed.
s = getOpenState(oslo("2026-08-24T10:15:00Z"));
assert.equal(s.isOpen, false, "Monday 12:15 is past the 12:00 close");

// Saturday 2026-08-29 11:00 Oslo — weekend, next open is Monday.
s = getOpenState(oslo("2026-08-29T09:00:00Z"));
assert.equal(s.isOpen, false, "Saturday should be closed");
assert.equal(!s.isOpen && s.nextDay, "mandag", "Sat skips Sunday to Monday");

// Friday 2026-08-28 11:59 Oslo (09:59Z) — open until 12:00.
s = getOpenState(oslo("2026-08-28T09:59:00Z"));
assert.equal(s.isOpen, true, "Friday 11:59 should still be open");

// Exact close minute counts as closed.
s = getOpenState(oslo("2026-08-28T10:00:00Z"));
assert.equal(s.isOpen, false, "Friday 12:00 sharp is closed");

console.log("open-state: all assertions passed");
