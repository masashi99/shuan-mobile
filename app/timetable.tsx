import { Timetable } from "@/components/Timetable";
import { View } from "react-native";

export default function Page() {
  return (
    <View style={{ flex: 1, padding: 8, backgroundColor: "#fff" }}>
      <Timetable />
    </View>
  );
}
