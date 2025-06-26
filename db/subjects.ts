import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const subjects = sqliteTable("subjects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  totalRequiredLessons: integer("total_required_lessons").notNull()
});

export type SelectSubject = typeof subjects.$inferSelect;
export type InsertSubject = typeof subjects.$inferInsert;
