import { AppProvider } from "./AppProvider";
import { ComponentProvider } from "./ComponentProvider";
import { QueryProvider } from "./QueryProvider";
import { RepositoryProvider } from "./RepositoryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AppProvider>
        <RepositoryProvider>
          <ComponentProvider>{children}</ComponentProvider>
        </RepositoryProvider>
      </AppProvider>
    </QueryProvider>
  );
}
