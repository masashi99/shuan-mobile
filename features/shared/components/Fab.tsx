import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

export type FabProps = {
  /** 押下時のハンドラ */
  onPress: () => void;
  /** Lucideアイコンコンポーネントを渡す */
  icon: React.FC<SvgProps>;
  /** ボタンサイズ（正方形） */
  size?: number;
  /** 追加のスタイル */
  style?: ViewStyle;
  /** アイコンの色 */
  iconColor?: string;
};

export const Fab: React.FC<FabProps> = ({ onPress, icon: Icon, size = 56, style, iconColor = "#fff" }) => (
  <Pressable
    style={({ pressed }) => [
      styles.button,
      { width: size, height: size, borderRadius: size / 2 },
      pressed && styles.pressed,
      style
    ]}
    onPress={onPress}
  >
    <Icon width={size * 0.5} height={size * 0.5} color={iconColor} />
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4
  },
  pressed: {
    opacity: 0.75
  }
});
