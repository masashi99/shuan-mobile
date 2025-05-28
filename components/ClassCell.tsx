import { Text, View } from "react-native";

type Props = {
  subjectName?: string;
  unitName?: string;
};

export function ClassCell({ subjectName, unitName }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.subjectName}>{subjectName}</Text>
      <Text style={styles.unitName}>{unitName}</Text>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: "#f0f0f0"
  },
  subjectName: {
    fontSize: 12,
    fontWeight: "bold"
  },
  unitName: {
    fontSize: 10,
    marginTop: 4
  }
} as const;
