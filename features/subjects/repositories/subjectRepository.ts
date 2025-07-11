import { subjectRepositoryInterface } from "./subjectRepositoryInterface";
import { InsertSubject, SelectSubject, subjects } from "@/db/subjects";
import { drizzle } from "drizzle-orm/expo-sqlite";

export class SubjectRepository implements subjectRepositoryInterface {
  private db: ReturnType<typeof drizzle>;

  constructor(db: ReturnType<typeof drizzle>) {
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

  async findMany(): Promise<SelectSubject[]> {
    try {
      const result = await this.db.select().from(subjects);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch subjects: ${error.message}`);
      }
      throw new Error("Failed to fetch subjects: Unknown error occurred");
    }
  }
}
