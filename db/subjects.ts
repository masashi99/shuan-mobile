import { courses } from "./courses";
import { lessonLogs } from "./lessonLogs";
import { timeScheduleSlots } from "./timeScheduleSlots";
import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const subjects = sqliteTable("subjects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  totalRequiredLessons: integer("total_required_lessons").notNull()
});

export const subjectRelations = relations(subjects, ({ many }) => ({
  courses: many(courses),
  timeScheduleSlots: many(timeScheduleSlots),
  lessonLogs: many(lessonLogs)
}));

export type SelectSubject = typeof subjects.$inferSelect;
export type InsertSubject = typeof subjects.$inferInsert;
