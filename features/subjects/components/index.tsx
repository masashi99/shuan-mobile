import { CurrentToast } from "../../shared/components/CurrentToast";
import { useCreateSubject } from "../api/useCreateSubject";
import { useGetSubjects } from "../api/useGetSubjects";
import { SubjectsList } from "./SubjectsList";
import { useToastController } from "@tamagui/toast";
import { View } from "react-native";

export function Subjects() {
  const { data: subjects } = useGetSubjects();
  const { mutate: createSubject } = useCreateSubject();
  const toast = useToastController();

  const handlePress = () => {
    // TODO: 検証ようなので修正する
    const randomId = Math.random().toString(36).substring(2, 15);
    createSubject({
      name: "Subject" + randomId,
      id: randomId,
      totalRequiredLessons: 0,
      courses: []
    });
    toast.show("Successfully saved!", {
      message: "Don't worry, we've got your data."
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <SubjectsList subjects={subjects ?? []} />
      <CurrentToast />
    </View>
  );
}
