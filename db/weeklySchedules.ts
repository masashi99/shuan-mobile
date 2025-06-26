import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const weeklySchedules = sqliteTable("weekly_schedules", {
  id: text("id").primaryKey(),
  year: text("year").notNull(),
  label: text("label")
});

export type SelectWeeklySchedule = typeof weeklySchedules.$inferSelect;
export type InsertWeeklySchedule = typeof weeklySchedules.$inferInsert;
