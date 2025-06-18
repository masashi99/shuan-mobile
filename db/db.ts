// db/db.ts
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";

// subjects, courses など全て export した index.ts

const sqlite = await SQLite.openDatabaseAsync("local.db"); // Expoアプリ内ストレージ
export const db = drizzle(sqlite, { schema });
