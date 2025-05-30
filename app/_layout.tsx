import { Drawer } from "expo-router/drawer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <Drawer screenOptions={{ swipeEnabled: false }}>
        <Drawer.Screen
          name="index"
          options={{
            title: "週案",
            headerTitle: "週案"
          }}
        />
        <Drawer.Screen
          name="timetable"
          options={{
            title: "時間割設定",
            headerTitle: "時間割設定"
          }}
        />
      </Drawer>
    </SafeAreaView>
  );
}
