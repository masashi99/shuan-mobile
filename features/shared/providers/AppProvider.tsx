// providers/AppProvider.tsx
import { getDatabase } from "@/db/db";
import { seedDatabase } from "@/db/seed";
import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { ReactNode, useEffect, useState } from "react";

const db = getDatabase();

export function AppProvider({ children }: { children: ReactNode }) {
  const { success, error } = useMigrations(db, migrations);
  const [migrationStatus, setMigrationStatus] = useState<string>("pending");
  const [seeded, setSeeded] = useState(false);
  useDrizzleStudio(db);

  useEffect(() => {
    console.log("Migration status:", { success, error, migrationStatus });

    if (error) {
      console.error("Migration failed:", error);
      setMigrationStatus("failed");
      return;
    }

    if (success && !seeded) {
      console.log("Migration succeeded, seeding database...");
      setMigrationStatus("success");

      // シードデータを実行
      seedDatabase()
        .then(() => {
          console.log("Database seeded successfully");
          setSeeded(true);
        })
        .catch((seedError) => {
          console.error("Failed to seed database:", seedError);
        });
    } else if (!success) {
      console.log("Migration still in progress...");
      setMigrationStatus("in-progress");
    }
  }, [success, error, migrationStatus, seeded]);

  // マイグレーションが失敗した場合でもアプリを継続させる
  return <>{children}</>;
}
