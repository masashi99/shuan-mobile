import { Drawer } from "expo-router/drawer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <Drawer screenOptions={{ swipeEnabled: false }}>
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            headerTitle: "Hoge"
          }}
        />
      </Drawer>
    </SafeAreaView>
  );
}
