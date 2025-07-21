import { defaultConfig } from "@tamagui/config/v4";
import { ToastProvider } from "@tamagui/toast";
import { ReactNode } from "react";
import { createTamagui, TamaguiProvider } from "tamagui";

export function ComponentProvider({ children }: { children: ReactNode }) {
  const config = createTamagui(defaultConfig);
  return (
    <TamaguiProvider config={config}>
      <ToastProvider>{children}</ToastProvider>
    </TamaguiProvider>
  );
}
