import { getDatabase } from "@/db/db";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { createContext, use } from "react";

type Props = {
  children: React.ReactNode;
};
const db = getDatabase();

type DatabaseContextType = {
  db: ReturnType<typeof drizzle>;
};

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export function RepositoryProvider({ children }: Props) {
  return <DatabaseContext.Provider value={{ db }}>{children}</DatabaseContext.Provider>;
}

export function useDatabase() {
  const context = use(DatabaseContext);
  if (!context) {
    throw new Error("useDatabase must be used within a RepositoryProvider");
  }
  return context.db;
}
