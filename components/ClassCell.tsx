import { Text, View } from "react-native";

type Props = {
  subjectName?: string;
  unitName?: string;
};

export function ClassCell({ subjectName, unitName }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.subjectName}>hoge</Text>
        <Text style={styles.unitName}>fuga</Text>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    borderRightWidth: 0.5
  },
  inner: {},
  subjectName: {
    fontSize: 12,
    fontWeight: "bold"
  },
  unitName: {
    fontSize: 10,
    marginTop: 4
  }
} as const;
