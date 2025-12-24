import { addDays, addWeeks, addMonths, addQuarters, addYears, startOfDay } from "date-fns";

export type RecurringFrequency = "weekly" | "monthly" | "quarterly" | "yearly";

/**
 * Calculate the next run date based on frequency and current date
 */
export function calculateNextRunDate(
  frequency: RecurringFrequency,
  startDate: Date,
  dayOfMonth: number = 1,
  dayOfWeek: number = 1,
  fromDate?: Date
): Date {
  const baseDate = fromDate || startDate;
  let nextDate: Date;

  switch (frequency) {
    case "weekly":
      // Find next occurrence of dayOfWeek (0 = Sunday, 1 = Monday, etc.)
      nextDate = addWeeks(startOfDay(baseDate), 1);
      // Adjust to the correct day of week
      const currentDayOfWeek = nextDate.getDay();
      const daysUntilTarget = (dayOfWeek - currentDayOfWeek + 7) % 7;
      nextDate = addDays(nextDate, daysUntilTarget - 7); // Go back to this week if needed
      if (nextDate <= baseDate) {
        nextDate = addDays(nextDate, 7);
      }
      break;

    case "monthly":
      nextDate = addMonths(startOfDay(baseDate), 1);
      // Set to the specific day of month (capped at 28 for safety)
      const safeDay = Math.min(dayOfMonth, 28);
      nextDate = new Date(nextDate.getFullYear(), nextDate.getMonth(), safeDay);
      if (nextDate <= baseDate) {
        nextDate = addMonths(nextDate, 1);
      }
      break;

    case "quarterly":
      nextDate = addQuarters(startOfDay(baseDate), 1);
      // Set to the specific day of the quarter's first month
      const quarterSafeDay = Math.min(dayOfMonth, 28);
      nextDate = new Date(nextDate.getFullYear(), nextDate.getMonth(), quarterSafeDay);
      if (nextDate <= baseDate) {
        nextDate = addQuarters(nextDate, 1);
      }
      break;

    case "yearly":
      nextDate = addYears(startOfDay(baseDate), 1);
      // Keep same month and day
      const yearSafeDay = Math.min(dayOfMonth, 28);
      nextDate = new Date(nextDate.getFullYear(), baseDate.getMonth(), yearSafeDay);
      if (nextDate <= baseDate) {
        nextDate = addYears(nextDate, 1);
      }
      break;

    default:
      nextDate = addMonths(startOfDay(baseDate), 1);
  }

  return nextDate;
}
