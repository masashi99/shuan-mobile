import { dayOfWeeks } from "./dayOfWeeks";
import { subjects } from "./subjects";
import { weeklySchedules } from "./weeklySchedules";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const timeScheduleSlots = sqliteTable("time_schedule_slots", {
  id: text("id").primaryKey(),
  weeklyScheduleId: text("weekly_schedule_id")
    .notNull()
    .references(() => weeklySchedules.id),
  dayOfWeekId: integer("day_of_week_id")
    .notNull()
    .references(() => dayOfWeeks.id),
  period: integer("period").notNull(),
  subjectId: text("subject_id")
    .notNull()
    .references(() => subjects.id)
});

export type SelectTimeScheduleSlot = typeof timeScheduleSlots.$inferSelect;
export type InsertTimeScheduleSlot = typeof timeScheduleSlots.$inferInsert;
