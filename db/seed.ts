// db/seed.ts
import { courses } from "./courses";
import { dayOfWeeks } from "./dayOfWeeks";
import { getDatabase } from "./db";
import { lessonLogs } from "./lessonLogs";
import { subjects } from "./subjects";
import { timeScheduleSlots } from "./timeScheduleSlots";
import { weeklySchedules } from "./weeklySchedules";
// drizzle db instance
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  const db = getDatabase();

  try {
    console.log("Starting database seeding...");

    // 既存データをチェックしてから挿入
    const existingDayOfWeeks = await db.select().from(dayOfWeeks);
    if (existingDayOfWeeks.length === 0) {
      await db.insert(dayOfWeeks).values([
        { id: 1, label: "月曜日", order: 1 },
        { id: 2, label: "火曜日", order: 2 },
        { id: 3, label: "水曜日", order: 3 },
        { id: 4, label: "木曜日", order: 4 },
        { id: 5, label: "金曜日", order: 5 }
      ]);
      console.log("Day of weeks seeded");
    }

    const scheduleId = "schedule-2025";
    const existingSchedules = await db.select().from(weeklySchedules).where(eq(weeklySchedules.id, scheduleId));
    if (existingSchedules.length === 0) {
      await db.insert(weeklySchedules).values({
        id: scheduleId,
        year: "2025",
        label: "2025年度 5年生"
      });
      console.log("Weekly schedules seeded");
    }

    const existingSubjects = await db.select().from(subjects);
    if (existingSubjects.length === 0) {
      await db.insert(subjects).values([
        { id: "sub-japanese", name: "国語", totalRequiredLessons: 100 },
        { id: "sub-math", name: "算数", totalRequiredLessons: 120 }
      ]);
      console.log("Subjects seeded");
    }

    const existingCourses = await db.select().from(courses);
    if (existingCourses.length === 0) {
      await db.insert(courses).values([
        { id: "course-addition", subjectId: "sub-math", name: "足し算", requiredLessons: 4, order: 1 },
        { id: "course-subtraction", subjectId: "sub-math", name: "引き算", requiredLessons: 3, order: 2 }
      ]);
      console.log("Courses seeded");
    }

    const existingTimeSlots = await db.select().from(timeScheduleSlots);
    if (existingTimeSlots.length === 0) {
      await db.insert(timeScheduleSlots).values([
        { id: "slot-1", weeklyScheduleId: scheduleId, dayOfWeekId: 1, period: 1, subjectId: "sub-japanese" },
        { id: "slot-2", weeklyScheduleId: scheduleId, dayOfWeekId: 2, period: 2, subjectId: "sub-math" }
      ]);
      console.log("Time schedule slots seeded");
    }

    const existingLessonLogs = await db.select().from(lessonLogs);
    if (existingLessonLogs.length === 0) {
      await db.insert(lessonLogs).values([
        {
          id: "log-1",
          date: "2025-04-07",
          subjectId: "sub-math",
          courseId: "course-addition",
          timeScheduleSlotId: "slot-2"
        }
      ]);
      console.log("Lesson logs seeded");
    }

    console.log("Database seeding completed successfully");
  } catch (error) {
    console.error("Error during database seeding:", error);
    throw error;
  }
}
