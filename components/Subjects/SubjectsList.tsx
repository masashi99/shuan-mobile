import { Accordion, AccordionContent, AccordionItem, AccordionTitle } from "@/components/common/Accordion";

type Props = {
  subjects: { id: string; name: string; content: string }[];
};

export function SubjectsList({ subjects }: Props) {
  return (
    <Accordion>
      {subjects.map((subject) => (
        <AccordionItem key={subject.id} name={subject.name}>
          <AccordionTitle>{subject.name}</AccordionTitle>
          <AccordionContent>{subject.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
