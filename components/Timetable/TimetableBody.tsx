import { TimetableCell } from "./TimetableCell";
import { Text, View } from "react-native";

const PERIODS = ["1", "2", "3", "4", "5", "6"];

type Props = {
  days: string[];
};

export function TimetableBody({ days }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: "space-evenly" }}>
      {PERIODS.map((period, periodIndex) => {
        return (
          <View key={period} style={{ flex: 1, flexDirection: "row" }}>
            <Text style={{ width: 18, padding: 4, fontSize: 12, marginRight: 4 }}>{period}</Text>
            {days.map((day, dayIndex) => {
              return (
                <View
                  key={`${day}-${period}`}
                  style={[
                    { flex: 1, borderRightWidth: 0.5, borderBottomWidth: 0.5 },
                    dayIndex === 0 && { borderLeftWidth: 0.5 },
                    periodIndex === 0 && {
                      borderTopWidth: 0.5
                    }
                  ]}
                >
                  <TimetableCell />
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}
