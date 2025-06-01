import { Accordion, AccordionContent, AccordionItem, AccordionTitle } from "@/components/common/Accordion";
import { View } from "react-native";

const DummyData = [
  { id: "1", name: "hoge", content: "fuga" },
  { id: "2", name: "piyo", content: "hoge" },
  { id: "3", name: "foo", content: "bar" }
];

export function Subjects() {
  return (
    <View style={{ flex: 1 }}>
      <Accordion>
        {DummyData.map((item) => (
          <AccordionItem key={item.id} name={item.name}>
            <AccordionTitle>{item.name}</AccordionTitle>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </View>
  );
}
