// db/db.ts
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

// データベースの初期化を安全に行う
let db: ReturnType<typeof drizzle<typeof schema>>;

export const getDatabase = (): ReturnType<typeof drizzle<typeof schema>> => {
  if (!db) {
    try {
      console.log("Initializing database...");
      const expo = SQLite.openDatabaseSync("db.db");
      db = drizzle(expo, { schema });
      console.log("Database initialized successfully");
    } catch (error) {
      console.error("Failed to initialize database:", error);
      throw error;
    }
  }
  return db;
};

// 後方互換性のため
export { db };
