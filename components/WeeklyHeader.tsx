import { Text, View } from "react-native";

const WEEK_DAYS = ["月", "火", "水", "木", "金", "土"];

export function WeeklyHeader() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", marginRight: 4 }}>
      <View style={{ width: 18, paddingHorizontal: 4 }} />
      {WEEK_DAYS.map((day) => {
        return (
          <Text key={day} style={{ flex: 1, textAlign: "center", paddingHorizontal: 4 }}>
            {day}
          </Text>
        );
      })}
    </View>
  );
}
