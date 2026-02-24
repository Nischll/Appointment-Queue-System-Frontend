/**
 * Shared helpers for showing doctor shift/availability in appointment flows.
 * API day_of_week: 0=Sunday, 1=Monday, .. 6=Saturday (same as JS Date.getDay()).
 */

export const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function getDayOfWeek(dateStr: string): number {
  if (!dateStr) return -1;
  const d = new Date(dateStr + "T12:00:00");
  return d.getDay();
}

/**
 * Returns a short summary for the doctor's shift on the given date, or null if not applicable.
 * - "10:00 AM – 4:00 PM" when there is a shift
 * - "No shift for this day." when the day has no shift
 * - "Day off." when is_day_off is true
 */
export function getDoctorShiftSummary(
  shiftData: any,
  appointmentDate: string | undefined,
  doctorId: string | number | undefined
): string | null {
  const shifts = shiftData?.data ?? [];
  if (!appointmentDate || !doctorId || shifts.length === 0) return null;
  const dayOfWeek = getDayOfWeek(appointmentDate);
  const dayShift = shifts.find((s: any) => Number(s.day_of_week) === dayOfWeek);
  if (!dayShift) return "No shift for this day.";
  if (dayShift.is_day_off) return "Day off.";
  const start = dayShift.start_time ?? "";
  const end = dayShift.end_time ?? "";
  return start && end ? `${start} – ${end}` : "Shift set";
}

/** True when the summary means the doctor is NOT available (no shift or day off). */
export function isDoctorUnavailable(summary: string | null): boolean {
  return summary === "No shift for this day." || summary === "Day off.";
}
