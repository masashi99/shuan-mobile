import { courses } from "../courses";
import { lessonLogs } from "../lessonLogs";
import { subjects } from "../subjects";
import { timeScheduleSlots } from "../timeScheduleSlots";
import { relations } from "drizzle-orm";

export const lessonLogRelations = relations(lessonLogs, ({ one }) => ({
  subject: one(subjects, {
    fields: [lessonLogs.subjectId],
    references: [subjects.id]
  }),
  course: one(courses, {
    fields: [lessonLogs.courseId],
    references: [courses.id]
  }),
  timeScheduleSlot: one(timeScheduleSlots, {
    fields: [lessonLogs.timeScheduleSlotId],
    references: [timeScheduleSlots.id]
  })
}));
