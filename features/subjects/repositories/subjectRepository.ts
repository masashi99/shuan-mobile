import type { Subject } from "../types/subject";
import { subjectRepositoryInterface } from "./subjectRepositoryInterface";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";

export class SubjectRepository implements subjectRepositoryInterface {
  private db: ReturnType<typeof drizzle<typeof schema>>;

  constructor(db: ReturnType<typeof drizzle<typeof schema>>) {
    this.db = db;
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
