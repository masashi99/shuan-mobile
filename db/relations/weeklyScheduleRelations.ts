import { timeScheduleSlots } from "../timeScheduleSlots";
import { weeklySchedules } from "../weeklySchedules";
import { relations } from "drizzle-orm";

export const weeklyScheduleRelations = relations(weeklySchedules, ({ many }) => ({
  timeScheduleSlots: many(timeScheduleSlots)
}));
