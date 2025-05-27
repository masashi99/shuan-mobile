import { Text, View } from "react-native";

const PERIODS = [
  {
    order: 0,
    name: "朝学",
    isClass: false
  },
  {
    order: 1,
    name: "1",
    isClass: true
  },
  {
    order: 2,
    name: "2",
    isClass: true
  },
  {
    order: 3,
    name: "休み",
    isClass: false
  },
  {
    order: 4,
    name: "3",
    isClass: true
  },
  {
    order: 5,
    name: "4",
    isClass: true
  },
  {
    order: 6,
    name: "昼休",
    isClass: false
  },
  {
    order: 7,
    name: "5",
    isClass: true
  },
  {
    order: 8,
    name: "6",
    isClass: true
  },
  {
    order: 9,
    name: "メモ",
    isClass: false
  }
];

export function PeriodLabel() {
  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      {PERIODS.map((period) => (
        <Text key={period.order} style={{ width: 18, padding: 4 }}>
          {period.name}
        </Text>
      ))}
    </View>
  );
}
