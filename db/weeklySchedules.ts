import { timeScheduleSlots } from "./timeScheduleSlots";
import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const weeklySchedules = sqliteTable("weekly_schedules", {
  id: text("id").primaryKey(),
  year: text("year").notNull(),
  label: text("label")
});

export const weeklyScheduleRelations = relations(weeklySchedules, ({ many }) => ({
  timeScheduleSlots: many(timeScheduleSlots)
}));

export type SelectWeeklySchedule = typeof weeklySchedules.$inferSelect;
export type InsertWeeklySchedule = typeof weeklySchedules.$inferInsert;
