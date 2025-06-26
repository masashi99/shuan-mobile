import { courses } from "../courses";
import { lessonLogs } from "../lessonLogs";
import { subjects } from "../subjects";
import { relations } from "drizzle-orm";

export const courseRelations = relations(courses, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [courses.subjectId],
    references: [subjects.id]
  }),
  lessonLogs: many(lessonLogs)
}));
