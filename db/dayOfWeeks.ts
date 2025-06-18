import { timeScheduleSlots } from "./timeScheduleSlots";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const dayOfWeeks = sqliteTable("day_of_weeks", {
  id: integer("id").primaryKey(), // 1 = Monday, ..., 5 = Friday
  label: text("label").notNull(),
  order: integer("order").notNull()
});

export const dayOfWeekRelations = relations(dayOfWeeks, ({ many }) => ({
  timeScheduleSlots: many(timeScheduleSlots)
}));

export type SelectDayOfWeek = typeof dayOfWeeks.$inferSelect;
export type InsertDayOfWeek = typeof dayOfWeeks.$inferInsert;
