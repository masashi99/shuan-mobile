import { lessonLogs } from "../lessonLogs";
import { subjects } from "../subjects";
import { timeScheduleSlots } from "../timeScheduleSlots";
import { weeklySchedules } from "../weeklySchedules";
import { relations } from "drizzle-orm";

export const timeScheduleSlotRelations = relations(timeScheduleSlots, ({ one, many }) => ({
  weeklySchedule: one(weeklySchedules, {
    fields: [timeScheduleSlots.weeklyScheduleId],
    references: [weeklySchedules.id]
  }),
  subject: one(subjects, {
    fields: [timeScheduleSlots.subjectId],
    references: [subjects.id]
  }),
  lessonLogs: many(lessonLogs)
}));
