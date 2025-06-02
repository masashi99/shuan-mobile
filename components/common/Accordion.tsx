// AccordionCustom.tsx
import { ChevronsDown } from "lucide-react-native";
import React, { FC, ReactNode, createContext, useContext, useState } from "react";
import { Platform, Pressable, StyleSheet, Text, UIManager, ViewStyle } from "react-native";
import Animated, {
  FadeIn,
  FadeOutUp,
  LinearTransition,
  useAnimatedStyle,
  useDerivedValue,
  withTiming
} from "react-native-reanimated";

// お好みのアイコンを差し替えてください

//
// ────────────────────────────────────────────────────────────────
//   0. Reanimated を Android でも使えるように設定
// ────────────────────────────────────────────────────────────────
//
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

//
// ────────────────────────────────────────────────────────────────
//   1. AccordionContext｜開いている item の value を管理
// ────────────────────────────────────────────────────────────────
//
type AccordionContextType = {
  openItem: string | null;
  toggleItem: (value: string) => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

const AccordionProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const toggleItem = (value: string) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };

  return <AccordionContext.Provider value={{ openItem, toggleItem }}>{children}</AccordionContext.Provider>;
};

const useAccordionContext = (): AccordionContextType => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error("AccordionContext が見つかりません。<Accordion> の内側で使ってください。");
  }
  return ctx;
};

//
// ────────────────────────────────────────────────────────────────
//   2. AccordionItemContext｜各 Item の value を子孫に流す
// ────────────────────────────────────────────────────────────────
//
const AccordionItemContext = createContext<string | null>(null);

const useAccordionItemContext = (): string => {
  const ctx = useContext(AccordionItemContext);
  if (ctx === null) {
    throw new Error("AccordionItemContext が見つかりません。<AccordionItem> の内側で使ってください。");
  }
  return ctx;
};

//
// ────────────────────────────────────────────────────────────────
//   3. Accordion: Provider を兼ねるルートコンポーネント
// ────────────────────────────────────────────────────────────────
//
type AccordionProps = { children: ReactNode };

export const Accordion: FC<AccordionProps> = ({ children }) => {
  return <AccordionProvider>{children}</AccordionProvider>;
};

//
// ────────────────────────────────────────────────────────────────
//   4. AccordionItem: 各セクションのラッパー
// ────────────────────────────────────────────────────────────────
//
type AccordionItemProps = {
  value: string;
  children: ReactNode;
};

export const AccordionItem: FC<AccordionItemProps> = ({ value, children }) => {
  const { openItem } = useAccordionContext();
  const isOpen = openItem === value;

  return (
    <AccordionItemContext.Provider value={value}>
      <Animated.View
        style={[styles.itemContainer, isOpen ? styles.open : styles.closed]}
        // AccordionItem 自体の高さ変化にもアニメーションをかけたい場合は次を有効化
        layout={LinearTransition.duration(200)}
      >
        {children}
      </Animated.View>
    </AccordionItemContext.Provider>
  );
};

//
// ────────────────────────────────────────────────────────────────
//   5. AccordionTrigger: 見出しをタップして開閉を切り替える部分
// ────────────────────────────────────────────────────────────────
//
type AccordionTriggerProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export const AccordionTrigger: FC<AccordionTriggerProps> = ({ children, style }) => {
  const itemValue = useAccordionItemContext();
  const { openItem, toggleItem } = useAccordionContext();
  const isOpen = openItem === itemValue;

  // Reanimated でアイコン回転 (0 → 1) → (0deg → 180deg)
  const rotation = useDerivedValue(() => (isOpen ? withTiming(1) : withTiming(0)));

  const animatedIconStyle = useAnimatedStyle(() => {
    const rotate = rotation.value * 180 + "deg";
    return {
      transform: [{ rotate }],
      opacity: rotation.value === 1 ? 0.8 : 1
    };
  });

  const onPress = () => {
    // ※LayoutAnimation ではなく Reanimated の layout を使うので、
    //  toggleItem のみで OK。Content 側の <Animated.View layout> が自動検知してアニメート。
    toggleItem(itemValue);
  };

  return (
    <Pressable onPress={onPress} style={[styles.triggerContainer, style]}>
      <Text style={styles.triggerText}>{children}</Text>
      <Animated.View style={[styles.icon, animatedIconStyle]}>
        <ChevronsDown size={18} color="#000" />
      </Animated.View>
    </Pressable>
  );
};

//
// ────────────────────────────────────────────────────────────────
//   6. AccordionContent: 開いているときだけ表示し、Reanimated で高さを自動アニメート
// ────────────────────────────────────────────────────────────────
//
type AccordionContentProps = {
  children: ReactNode;
  style?: object;
};

export const AccordionContent: FC<AccordionContentProps> = ({ children, style }) => {
  const itemValue = useAccordionItemContext();
  const { openItem } = useAccordionContext();
  const isOpen = openItem === itemValue;

  return (
    <Animated.View
      style={[styles.contentWrapper, style]}
      // ここで「高さ auto の変化」を自動検知して 200ms でアニメート
      layout={LinearTransition.duration(200)}
    >
      {isOpen ? (
        <Animated.View entering={FadeIn} exiting={FadeOutUp.duration(200)} style={styles.innerContent}>
          {children}
        </Animated.View>
      ) : null}
    </Animated.View>
  );
};

//
// ────────────────────────────────────────────────────────────────
//   7. スタイル定義
// ────────────────────────────────────────────────────────────────
//
const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 8,
    borderRadius: 4,
    overflow: "hidden", // 中身のアニメーション中に飛び出さないように
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff"
  },
  open: {
    // 開いているときに影などつけたい場合はここに。省略しても OK
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2
  },
  closed: {
    // 閉じているときの装飾 (特になしでも OK)
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
  icon: {
    // 必要ならアイコンの余白や固定サイズをここに書く
  },
  contentWrapper: {
    overflow: "hidden", // 高さが縮むときに内容が飛び出さないように
    backgroundColor: "#fff",
    paddingHorizontal: 16
  },
  innerContent: {
    paddingVertical: 12
  }
});
