import type { Subject } from "../types/subject";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/Accordion";
import { CirclePlus } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type Props = {
  subjects: Subject[];
};

export function SubjectsList({ subjects }: Props) {
  const handlePress = (id: string) => {
    console.log(`Pressed item with id: ${id}`);
  };
  return (
    <Accordion>
      {subjects.map((subject) => (
        <AccordionItem key={subject.id} value={subject.id}>
          <AccordionTrigger>{subject.name}</AccordionTrigger>
          <AccordionContent>
            <View style={{ gap: 4, alignItems: "flex-start" }}>
              {subject.courses.map((course) => (
                <View key={course.id}>
                  <Text>{course.name}</Text>
                  <Pressable onPress={() => handlePress(subject.id)}>
                    <CirclePlus />
                  </Pressable>
                </View>
              ))}
            </View>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
