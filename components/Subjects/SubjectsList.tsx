import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/common/Accordion";
import { Text } from "react-native";

type Props = {
  subjects: { id: string; name: string; content: string }[];
};

export function SubjectsList({ subjects }: Props) {
  return (
    <Accordion>
      {subjects.map((subject) => (
        <AccordionItem key={subject.id} value={subject.id}>
          <AccordionTrigger>セクション 1</AccordionTrigger>
          <AccordionContent>
            <Text>コンテンツ</Text>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
