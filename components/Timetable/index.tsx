import { TimetableBody } from "./TimetableBody";
import { TimetableHeader } from "./TimetableHeader";
import { View } from "react-native";

const DAYS = [
  {
    day: "Mon",
    label: "月"
  },
  {
    day: "Tue",
    label: "火"
  },
  {
    day: "Wed",
    label: "水"
  },
  {
    day: "Thu",
    label: "木"
  },
  {
    day: "Fri",
    label: "金"
  },
  {
    day: "Sat",
    label: "土"
  }
];

const dayLabels = DAYS.map((day) => day.label);
const days = DAYS.map((day) => day.day);

export function Timetable() {
  return (
    <View style={{ flex: 1 }}>
      <TimetableHeader dayLabels={dayLabels} />
      <TimetableBody days={days} />
    </View>
  );
}
