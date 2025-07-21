import { ToastViewport } from "@tamagui/toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function SafeToastViewport() {
  const { left, top, right } = useSafeAreaInsets();
  return <ToastViewport flexDirection="column-reverse" top={top} left={left} right={right} />;
}
