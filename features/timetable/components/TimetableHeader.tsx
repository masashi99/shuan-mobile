import { Text, View } from "react-native";

type Props = {
  dayLabels: string[];
};

export function TimetableHeader({ dayLabels }: Props) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <Dummy />
      {dayLabels.map((label) => {
        return (
          <View key={label} style={{ flex: 1 }}>
            <Text style={{ textAlign: "center" }}>{label}</Text>
          </View>
        );
      })}
    </View>
  );
}

function Dummy() {
  return <View style={{ width: 18, paddingHorizontal: 4, marginRight: 4 }} />;
}
