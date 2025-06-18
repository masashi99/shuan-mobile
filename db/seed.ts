// db/seed.ts
import { courses } from "./courses";
import { dayOfWeeks } from "./dayOfWeeks";
import { db } from "./db";
// drizzle db instance
import { lessonLogs } from "./lessonLogs";
import { subjects } from "./subjects";
import { timeScheduleSlots } from "./timeScheduleSlots";
import { weeklySchedules } from "./weeklySchedules";

await db.insert(dayOfWeeks).values([
  { id: 1, label: "月曜日", order: 1 },
  { id: 2, label: "火曜日", order: 2 },
  { id: 3, label: "水曜日", order: 3 },
  { id: 4, label: "木曜日", order: 4 },
  { id: 5, label: "金曜日", order: 5 }
]);

const scheduleId = "schedule-2025";
await db.insert(weeklySchedules).values({
  id: scheduleId,
  year: "2025",
  label: "2025年度 5年生"
});

await db.insert(subjects).values([
  { id: "sub-japanese", name: "国語", totalRequiredLessons: 100 },
  { id: "sub-math", name: "算数", totalRequiredLessons: 120 }
]);

await db.insert(courses).values([
  { id: "course-addition", subjectId: "sub-math", name: "足し算", requiredLessons: 4, order: 1 },
  { id: "course-subtraction", subjectId: "sub-math", name: "引き算", requiredLessons: 3, order: 2 }
]);

await db.insert(timeScheduleSlots).values([
  { id: "slot-1", weeklyScheduleId: scheduleId, dayOfWeekId: 1, period: 1, subjectId: "sub-japanese" },
  { id: "slot-2", weeklyScheduleId: scheduleId, dayOfWeekId: 2, period: 2, subjectId: "sub-math" }
]);

await db.insert(lessonLogs).values([
  {
    id: "log-1",
    date: "2025-04-07",
    subjectId: "sub-math",
    courseId: "course-addition",
    timeScheduleSlotId: "slot-2"
  }
]);
