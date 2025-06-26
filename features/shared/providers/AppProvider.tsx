// providers/AppProvider.tsx
import { getDatabase } from "@/db/db";
import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";
import { ReactNode, useEffect, useRef } from "react";

const db = getDatabase();

export function AppProvider({ children }: { children: ReactNode }) {
  const migrationProcessedRef = useRef(false);
  
  // マイグレーション前に外部キー制約を無効にする
  useEffect(() => {
    const expo = SQLite.openDatabaseSync("db.db");
    expo.execSync("PRAGMA foreign_keys = OFF;");
  }, []);

  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(db);

  useEffect(() => {
    // 既に処理済みの場合はスキップ
    if (migrationProcessedRef.current) return;
    
    console.log("Migration state - success:", success, "error:", error);
    
    if (error) {
      console.error("Migration failed with error:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      migrationProcessedRef.current = true;
      return;
    }

    if (success === false) {
      console.error("Migration did not succeed (success is false)");
      migrationProcessedRef.current = true;
      return;
    }

    // マイグレーション成功後に外部キー制約を有効にする
    if (success === true) {
      try {
        const expo = SQLite.openDatabaseSync("db.db");
        expo.execSync("PRAGMA foreign_keys = ON;");
        console.log("Migration completed successfully - foreign keys enabled");
        
        // マイグレーション完了後にテーブルの存在確認
        const result = expo.getAllSync("SELECT name FROM sqlite_master WHERE type='table';");
        console.log("Tables created:", result);
        console.log("Number of tables:", result?.length || 0);
        
        migrationProcessedRef.current = true;
      } catch (testError) {
        console.error("Post-migration setup failed:", testError);
        migrationProcessedRef.current = true;
      }
    }
  }, [success, error]);

  return <>{children}</>;
}
