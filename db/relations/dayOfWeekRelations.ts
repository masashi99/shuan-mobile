import { dayOfWeeks } from "../dayOfWeeks";
import { timeScheduleSlots } from "../timeScheduleSlots";
import { relations } from "drizzle-orm";

export const dayOfWeekRelations = relations(dayOfWeeks, ({ many }) => ({
  timeScheduleSlots: many(timeScheduleSlots)
}));
