import { courses } from "./courses";
import { subjects } from "./subjects";
import { timeScheduleSlots } from "./timeScheduleSlots";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const lessonLogs = sqliteTable("lesson_logs", {
  id: text("id").primaryKey(),
  date: text("date").notNull(),
  subjectId: text("subject_id")
    .notNull()
    .references(() => subjects.id),
  courseId: text("course_id").references(() => courses.id), // nullable
  timeScheduleSlotId: text("time_schedule_slot_id").references(() => timeScheduleSlots.id) // nullable
});

export type SelectLessonLog = typeof lessonLogs.$inferSelect;
export type InsertLessonLog = typeof lessonLogs.$inferInsert;
