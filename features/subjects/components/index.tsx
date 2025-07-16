import { Fab } from "../../shared/components/Fab";
import { useCreateSubject } from "../api/useCreateSubject";
import { useGetSubjects } from "../api/useGetSubjects";
import { SubjectsList } from "./SubjectsList";
import { Plus } from "lucide-react-native";
import { View } from "react-native";

export function Subjects() {
  const { data: subjects } = useGetSubjects();
  const { mutate: createSubject } = useCreateSubject();

  const handlePress = () => {
    createSubject({
      name: "Subject 1",
      id: "1",
      totalRequiredLessons: 0,
      courses: []
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <SubjectsList subjects={subjects ?? []} />
      <Fab
        onPress={handlePress}
        icon={Plus}
        size={64}
        iconColor="#fff"
        style={{ position: "absolute", bottom: 24, right: 24 }}
      />
    </View>
  );
}
