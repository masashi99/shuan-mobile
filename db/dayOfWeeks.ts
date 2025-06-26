import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const dayOfWeeks = sqliteTable("day_of_weeks", {
  id: integer("id").primaryKey(), // 1 = Monday, ..., 5 = Friday
  label: text("label").notNull(),
  order: integer("order").notNull()
});

export type SelectDayOfWeek = typeof dayOfWeeks.$inferSelect;
export type InsertDayOfWeek = typeof dayOfWeeks.$inferInsert;
