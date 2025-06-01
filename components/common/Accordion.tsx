import { Triangle } from "lucide-react-native";
import { createContext, use, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type OpenStatusContextType = string | null;
type UpdateStatusContextType = (name: string) => void;
type ItemNameContextType = string | null;
const openStatusContext = createContext<OpenStatusContextType>(null);
const updateStatusContext = createContext<UpdateStatusContextType>(() => {});
const ItemNameContext = createContext<ItemNameContextType>(null);

type AccordionProps = { children: React.ReactNode };

export function Accordion({ children }: AccordionProps) {
  const [itemsStatus, setItemsStatus] = useState<string | null>(null);
  const updateItemStatus = (name: string) => {
    setItemsStatus((prev) => (prev === name ? null : name));
  };

  return (
    <updateStatusContext.Provider value={updateItemStatus}>
      <openStatusContext.Provider value={itemsStatus}>
        <View style={accordionStyles.container}>{children}</View>
      </openStatusContext.Provider>
    </updateStatusContext.Provider>
  );
}
const accordionStyles = StyleSheet.create({ container: { gap: 8 } });

type AccordionItemProps = {
  name: string;
  children: React.ReactNode;
};
export function AccordionItem({ name, children }: AccordionItemProps) {
  const openStatus = use(openStatusContext);
  const update = use(updateStatusContext);
  const isOpen = openStatus === name;
  const rotate = isOpen ? "180deg" : "0deg";

  return (
    <ItemNameContext.Provider value={name}>
      <Pressable onPress={() => update(name)}>
        <View style={itemStyles.container}>
          <View style={itemStyles.item}>{children}</View>
          <Triangle size={12} style={{ transform: [{ rotate }] }} fill="black" />
        </View>
      </Pressable>
    </ItemNameContext.Provider>
  );
}
const itemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 0.5
  },
  item: {
    flex: 1
  },
  icon: {}
});

type AccordionTitleProps = {
  children?: React.ReactNode;
};
export function AccordionTitle({ children }: AccordionTitleProps) {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  );
}
type AccordionContentProps = {
  children?: React.ReactNode;
};
export function AccordionContent({ children }: AccordionContentProps) {
  const itemName = use(ItemNameContext);
  const openStatus = use(openStatusContext);
  const isOpen = itemName === openStatus;
  if (!isOpen) return null;

  return (
    <View style={styles.content}>
      <Text>{children}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  title: { fontWeight: "bold" },
  content: {}
});
