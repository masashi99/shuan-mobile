import { courses } from "../courses";
import { lessonLogs } from "../lessonLogs";
import { subjects } from "../subjects";
import { timeScheduleSlots } from "../timeScheduleSlots";
import { relations } from "drizzle-orm";

export const subjectRelations = relations(subjects, ({ many }) => ({
  courses: many(courses),
  timeScheduleSlots: many(timeScheduleSlots),
  lessonLogs: many(lessonLogs)
}));
