import { ClassCell } from "./ClassCell";
import { View } from "react-native";

type Props = {
  classes: { id?: string; subjectName?: string; unitName?: string }[];
};

export function Class({ classes }: Props) {
  return (
    <View style={{ flex: 1, padding: 4 }}>
      {classes.map(({ id, subjectName, unitName }) => (
        <ClassCell key={id} subjectName={subjectName} unitName={unitName} />
      ))}
    </View>
  );
}
