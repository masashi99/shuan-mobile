import { Fab } from "../../shared/components/Fab";
import { useGetSubjects } from "../api/useGetSubjects";
import { SubjectsList } from "./SubjectsList";
import { Plus } from "lucide-react-native";
import { View } from "react-native";

export function Subjects() {
  const { data: subjects } = useGetSubjects();

  return (
    <View style={{ flex: 1 }}>
      <SubjectsList subjects={subjects ?? []} />
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
