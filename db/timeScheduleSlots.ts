import { dayOfWeeks } from "./dayOfWeeks";
import { lessonLogs } from "./lessonLogs";
import { subjects } from "./subjects";
import { weeklySchedules } from "./weeklySchedules";
import { relations } from "drizzle-orm";
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

export const timeScheduleSlotRelations = relations(timeScheduleSlots, ({ one, many }) => ({
  weeklySchedule: one(weeklySchedules, {
    fields: [timeScheduleSlots.weeklyScheduleId],
    references: [weeklySchedules.id]
  }),
  dayOfWeek: one(dayOfWeeks, {
    fields: [timeScheduleSlots.dayOfWeekId],
    references: [dayOfWeeks.id]
  }),
  subject: one(subjects, {
    fields: [timeScheduleSlots.subjectId],
    references: [subjects.id]
  }),
  lessonLogs: many(lessonLogs)
}));

export type SelectTimeScheduleSlot = typeof timeScheduleSlots.$inferSelect;
export type InsertTimeScheduleSlot = typeof timeScheduleSlots.$inferInsert;
