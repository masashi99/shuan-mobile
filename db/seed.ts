// db/seed.ts
import { courses } from "./courses";
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

    // 曜日テーブルは廃止のためシードは不要

    // 週間スケジュールのシード
    const scheduleId = "schedule-2025";
    try {
      const existingSchedules = await db.select().from(weeklySchedules).where(eq(weeklySchedules.id, scheduleId));
      if (existingSchedules.length === 0) {
        await db.insert(weeklySchedules).values({
          id: scheduleId,
          year: "2025",
          label: "2025年度 5年生"
        });
        console.log("Weekly schedules seeded");
      } else {
        console.log("Weekly schedules already exists, skipping...");
      }
    } catch (error) {
      console.log("Weekly schedules seeding skipped (may already exist):", error);
    }

    // 科目データのシード
    try {
      const existingSubjects = await db.select().from(subjects);
      if (existingSubjects.length === 0) {
        await db.insert(subjects).values([
          { id: "8a960900-4dda-4f83-a985-a5b9759b38e7", name: "国語", totalRequiredLessons: 100 },
          { id: "2ebaed01-f7d3-41e0-8bd2-375931fa687d", name: "算数", totalRequiredLessons: 120 }
        ]);
        console.log("Subjects seeded");
      } else {
        console.log("Subjects already exist, skipping...");
      }
    } catch (error) {
      console.log("Subjects seeding skipped (may already exist):", error);
    }

    // コースデータのシード
    try {
      const existingCourses = await db.select().from(courses);
      if (existingCourses.length === 0) {
        await db.insert(courses).values([
          {
            id: "761b86a6-f2fe-4152-947b-1355cfdfd188",
            subjectId: "8a960900-4dda-4f83-a985-a5b9759b38e7", // 国語のID
            name: "おおきなかぶ",
            requiredLessons: 4,
            order: 1
          },
          {
            id: "a2bf9894-550e-4c26-916f-024384775614",
            subjectId: "8a960900-4dda-4f83-a985-a5b9759b38e7", // 国語のID
            name: "ポプラの木",
            requiredLessons: 4,
            order: 2
          },
          {
            id: "b2b1034e-89df-4809-88ba-1fe913df8c38",
            subjectId: "2ebaed01-f7d3-41e0-8bd2-375931fa687d", // 算数のID
            name: "足し算",
            requiredLessons: 4,
            order: 1
          },
          {
            id: "439c4f4b-d6e6-497c-a5fe-d24e8270fa30",
            subjectId: "2ebaed01-f7d3-41e0-8bd2-375931fa687d", // 算数のID
            name: "引き算",
            requiredLessons: 3,
            order: 2
          }
        ]);
        console.log("Courses seeded");
      } else {
        console.log("Courses already exist, skipping...");
      }
    } catch (error) {
      console.log("Courses seeding skipped (may already exist):", error);
    }

    // 時間割スロットのシード
    try {
      const existingTimeSlots = await db.select().from(timeScheduleSlots);
      if (existingTimeSlots.length === 0) {
        await db.insert(timeScheduleSlots).values([
          {
            id: "slot-1",
            weeklyScheduleId: scheduleId,
            dayOfWeek: 1,
            period: 1,
            subjectId: "8a960900-4dda-4f83-a985-a5b9759b38e7"
          },
          {
            id: "slot-2",
            weeklyScheduleId: scheduleId,
            dayOfWeek: 2,
            period: 2,
            subjectId: "2ebaed01-f7d3-41e0-8bd2-375931fa687d"
          }
        ]);
        console.log("Time schedule slots seeded");
      } else {
        console.log("Time schedule slots already exist, skipping...");
      }
    } catch (error) {
      console.log("Time schedule slots seeding skipped (may already exist):", error);
    }

    // 授業ログのシード
    try {
      const existingLessonLogs = await db.select().from(lessonLogs);
      if (existingLessonLogs.length === 0) {
        await db.insert(lessonLogs).values([
          {
            id: "log-1",
            date: "2025-04-07",
            subjectId: "2ebaed01-f7d3-41e0-8bd2-375931fa687d",
            courseId: "b2b1034e-89df-4809-88ba-1fe913df8c38",
            timeScheduleSlotId: "slot-2"
          }
        ]);
        console.log("Lesson logs seeded");
      } else {
        console.log("Lesson logs already exist, skipping...");
      }
    } catch (error) {
      console.log("Lesson logs seeding skipped (may already exist):", error);
    }

    console.log("Database seeding completed successfully");
  } catch (error) {
    console.error("Error during database seeding:", error);
    throw error;
  }
}
