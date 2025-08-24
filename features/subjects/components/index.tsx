import { CurrentToast } from "../../shared/components/CurrentToast";
import { useGetSubjects } from "../api/useGetSubjects";
import { SubjectsList } from "./SubjectsList";
import { View } from "react-native";

export function Subjects() {
  const { data: subjects } = useGetSubjects();

  return (
    <View style={{ flex: 1 }}>
      <SubjectsList subjects={subjects ?? []} />
      <CurrentToast />
    </View>
  );
}
