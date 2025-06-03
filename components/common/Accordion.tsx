import { ChevronsDown } from "lucide-react-native";
import { type ReactNode, createContext, use, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, UIManager, View, type ViewStyle } from "react-native";
import Animated, {
  FadeIn,
  FadeOutUp,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from "react-native-reanimated";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionContextType = {
  openItem: string | null;
  toggleItem: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextType>({ openItem: null, toggleItem: () => {} });

type AccordionProps = {
  children: ReactNode;
};

export function Accordion({ children }: AccordionProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (value: string) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <View style={styles.accordionContainer}>{children}</View>
    </AccordionContext.Provider>
  );
}

const AccordionItemContext = createContext<string>("");

type AccordionItemProps = {
  value: string;
  children: ReactNode;
};

export function AccordionItem({ value, children }: AccordionItemProps) {
  const { openItem } = use(AccordionContext);
  const isOpen = openItem === value;

  return (
    <AccordionItemContext.Provider value={value}>
      <Animated.View style={[styles.itemContainer, isOpen && styles.open]} layout={LinearTransition.duration(200)}>
        {children}
      </Animated.View>
    </AccordionItemContext.Provider>
  );
}

type AccordionTriggerProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export function AccordionTrigger({ children, style }: AccordionTriggerProps) {
  const itemValue = use(AccordionItemContext);
  const { openItem, toggleItem } = use(AccordionContext);
  const isOpen = openItem === itemValue;

  const rotation = useDerivedValue(() => (isOpen ? withTiming(1) : withTiming(0)));

  const animatedIconStyle = useAnimatedStyle(() => {
    const rotate = rotation.value * 180 + "deg";
    return {
      transform: [{ rotate }],
      opacity: rotation.value === 1 ? 0.8 : 1
    };
  });

  const onPress = () => {
    toggleItem(itemValue);
  };

  return (
    <Pressable onPress={onPress} style={[styles.triggerContainer, style]}>
      <Text style={styles.triggerText}>{children}</Text>
      <Animated.View style={animatedIconStyle}>
        <ChevronsDown size={18} color="#000" />
      </Animated.View>
    </Pressable>
  );
}

type AccordionContentProps = {
  children: ReactNode;
  style?: object;
};

export function AccordionContent({ children, style }: AccordionContentProps) {
  const itemValue = use(AccordionItemContext);
  const { openItem } = use(AccordionContext);
  const isOpen = openItem === itemValue;

  return (
    <Animated.View style={[styles.contentWrapper, style]} layout={LinearTransition.duration(200)}>
      {isOpen ? (
        <Animated.View entering={FadeIn} exiting={FadeOutUp.duration(200)} style={styles.innerContent}>
          {children}
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  accordionContainer: {
    gap: 8
  },
  itemContainer: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff"
  },
  open: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  },
  triggerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5"
  },
  triggerText: {
    fontSize: 16,
    fontWeight: "500"
  },
  contentWrapper: {
    backgroundColor: "#fff",
    paddingHorizontal: 16
  },
  innerContent: {
    paddingVertical: 12
  }
});
