import { Fab } from "../../shared/components/Fab";
import { SubjectRepository } from "../repositories";
import { SubjectsList } from "./SubjectsList";
import { useDatabase } from "@/features/shared/providers/RepositoryProvider";
import { Plus } from "lucide-react-native";
import { useEffect } from "react";
import { View } from "react-native";

const DummyData = [
  { id: "1", name: "hoge", content: "fuga" },
  { id: "2", name: "piyo", content: "hoge" },
  { id: "3", name: "foo", content: "bar" }
];

export function Subjects() {
  const db = useDatabase();
  const subjectRepository = new SubjectRepository(db);

  useEffect(() => {
    subjectRepository.findMany().then((subjects) => {
      console.log(subjects);
    });
  }, []);

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
