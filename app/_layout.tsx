import { Tabs } from "expo-router";

export default function RootLayout() {
  return <Tabs>
    <Tabs.Screen name="schedule" options={{title: "スケジュール"}} />
    <Tabs.Screen name="timetable" options={{title: "時間割"}} />
    <Tabs.Screen name="unit" options={{title: "単元"}} />
  </Tabs>;
}
