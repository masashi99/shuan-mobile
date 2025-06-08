import { Fab } from "../../shared/components/Fab";
import { SubjectsList } from "./SubjectsList";
import { Plus } from "lucide-react-native";
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
      <Fab
        onPress={() => console.log("Pressed!")}
        icon={Plus}
        size={64}
        iconColor="#fff"
        style={{ position: "absolute", bottom: 24, right: 24 }}
      />
    </View>
  );
}
