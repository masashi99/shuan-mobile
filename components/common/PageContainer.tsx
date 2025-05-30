import { View, type ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
};

export function PageContainer({ children }: Props) {
  return <View style={style}>{children}</View>;
}

const style: ViewStyle = { flex: 1, padding: 8, backgroundColor: "#fff" };
