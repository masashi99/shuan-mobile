// providers/AppProvider.tsx
import * as schema from "@/db/schema";
import migrations from "@/drizzle/migrations";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import * as SQlite from "expo-sqlite";
import { ReactNode, useEffect } from "react";

const expo = SQlite.openDatabaseSync("db.db");
const db = drizzle(expo, { schema });

export function AppProvider({ children }: { children: ReactNode }) {
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    if (!success) return;

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
