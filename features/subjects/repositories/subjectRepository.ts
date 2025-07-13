import type { Subject } from "../types/subject";
import { subjectRepositoryInterface } from "./subjectRepositoryInterface";
import * as schema from "@/db/schema";
import { InsertSubject, SelectSubject, subjects } from "@/db/subjects";
import { drizzle } from "drizzle-orm/expo-sqlite";

export class SubjectRepository implements subjectRepositoryInterface {
  private db: ReturnType<typeof drizzle<typeof schema>>;

  constructor(db: ReturnType<typeof drizzle<typeof schema>>) {
    this.db = db;
  }

  async save(subject: InsertSubject): Promise<SelectSubject> {
    try {
      const result = await this.db.insert(subjects).values(subject).returning();

      if (result.length === 0) {
        throw new Error("Failed to insert subject: No record was created");
      }

      return result[0];
    } catch (error) {
      // データベースエラーや制約違反などをキャッチ
      if (error instanceof Error) {
        throw new Error(`Failed to save subject: ${error.message}`);
      }
      throw new Error("Failed to save subject: Unknown error occurred");
    }
  }

  async findMany(): Promise<Subject[]> {
    try {
      const result = await this.db.query.subjects.findMany({
        with: {
          courses: true
        }
      });
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch subjects: ${error.message}`);
      }
      throw new Error("Failed to fetch subjects: Unknown error occurred");
    }
  }
}
