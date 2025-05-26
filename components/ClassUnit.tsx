import { Text, View } from "react-native";

type Props = {
  subjectName?: string;
  unitName?: string;
};

export function ClassUnit({ subjectName, unitName }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.subjectName}>{subjectName}</Text>
        <View style={styles.unitName}>{unitName}</View>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    borderRightWidth: 1,
    padding: 8,
    height: 6
  },
  inner: {
    padding: 8,
    borderRadius: 4
  },
  subjectName: {
    fontWeight: "bold"
  },
  unitName: {
    fontSize: 12,
    marginTop: 4
  }
} as const;
