import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="addSubject" options={{ title: "addSubject" }} />
    </Stack>
  );
}
