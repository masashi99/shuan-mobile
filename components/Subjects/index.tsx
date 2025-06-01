import { SubjectsList } from "./SubjectsList";
import { View } from "react-native";

const DummyData = [
  { id: "1", name: "hoge", content: "fuga" },
  { id: "2", name: "piyo", content: "hoge" },
  { id: "3", name: "foo", content: "bar" }
];

export function Subjects() {
  return (
    <View style={{ flex: 1 }}>
      <SubjectsList subjects={DummyData} />
    </View>
  );
}
