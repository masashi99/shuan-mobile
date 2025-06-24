// providers/AppProvider.tsx
import { getDatabase } from "@/db/db";
import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { ReactNode, useEffect } from "react";

const db = getDatabase();

export function AppProvider({ children }: { children: ReactNode }) {
  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(db);

  useEffect(() => {
    if (error) {
      console.error("Migration failed:", error);
      return;
    }

    if (!success) {
      console.error("Migration did not succeed");
      return;
    }
  }, [success, error]);

  return <>{children}</>;
}
