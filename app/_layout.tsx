import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <Drawer screenOptions={{ swipeEnabled: false }}>
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "Hoge"
        }}
      />
    </Drawer>
  );
}
