// db/db.ts
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

// 同期的にデータベースを開く
const expo = SQLite.openDatabaseSync("db.db");
const db = drizzle(expo, { schema });

export const getDatabase = () => {
  return db;
};

// 後方互換性のため
export { db };
