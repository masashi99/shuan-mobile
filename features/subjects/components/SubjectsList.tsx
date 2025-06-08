import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/features/shared/components/Accordion";
import { CirclePlus } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type Props = {
  subjects: { id: string; name: string; content: string }[];
};

export function SubjectsList({ subjects }: Props) {
  const handlePress = (id: string) => {
    console.log(`Pressed item with id: ${id}`);
  };
  return (
    <Accordion>
      {subjects.map((subject) => (
        <AccordionItem key={subject.id} value={subject.id}>
          <AccordionTrigger>セクション 1</AccordionTrigger>
          <AccordionContent>
            <View style={{ gap: 4, alignItems: "flex-start" }}>
              <Text>コンテンツ</Text>
              <Pressable onPress={() => handlePress(subject.id)}>
                <CirclePlus />
              </Pressable>
            </View>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
