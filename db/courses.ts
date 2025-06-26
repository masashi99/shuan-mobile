import { subjects } from "./subjects";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const courses = sqliteTable("courses", {
  id: text("id").primaryKey(),
  subjectId: text("subject_id")
    .notNull()
    .references(() => subjects.id),
  name: text("name").notNull(),
  requiredLessons: integer("required_lessons").notNull(),
  order: integer("order").notNull()
});

export type SelectCourse = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;
