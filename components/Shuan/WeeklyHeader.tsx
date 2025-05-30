import { format } from "date-fns";
import { Text, View } from "react-native";

type Props = {
  dates: Date[];
};

const DATE: { [day: number]: string } = {
  0: "日",
  1: "月",
  2: "火",
  3: "水",
  4: "木",
  5: "金",
  6: "土"
};

export function WeeklyHeader({ dates }: Props) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Dummy />
      {dates.map((date) => {
        return (
          <View key={date.toISOString()} style={{ flex: 1 }}>
            <Text style={{ textAlign: "center" }}>{DATE[date.getDay()]}</Text>
            <Text style={{ textAlign: "center", fontSize: 8 }}>{format(date, "M/d")}</Text>
          </View>
        );
      })}
    </View>
  );
}

function Dummy() {
  return <View style={{ width: 18, paddingHorizontal: 4, marginRight: 4 }} />;
}
