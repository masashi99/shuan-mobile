import { ShuanBody } from "./ShuanBody";
import { WeeklyHeader } from "./WeeklyHeader";
import { View } from "react-native";

export function Shuan() {
  return (
    <View style={{ flex: 1, gap: 8 }}>
      <WeeklyHeader />
      <ShuanBody />
    </View>
  );
}
