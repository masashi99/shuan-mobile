import { getDatabase } from "@/db/db";
import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { ReactNode } from "react";

const db = getDatabase(); // ★ シングルトンであること

export function AppProvider({ children }: { children: ReactNode }) {
  const { success, error } = useMigrations(db, migrations);

  // Drizzle Studio は開発時だけ
  useDrizzleStudio(__DEV__ ? db : undefined);

  if (error) {
    console.error("Migration failed:", error);
    // ここで専用エラーページに差し替えても良い
    return null;
  }

  if (!success) {
    // マイグレーション中は描画しない（Splash継続）
    return null;
  }

  // マイグレーション完了後にだけアプリを表示
  return <>{children}</>;
}
