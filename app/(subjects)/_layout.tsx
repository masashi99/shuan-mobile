import { DrawerToggleButton } from "@react-navigation/drawer";
import { Link, Stack } from "expo-router";
import { PlusIcon } from "lucide-react-native";
import { Pressable } from "react-native";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "教科", headerRight: () => <AddSubjectIcon />, headerLeft: () => <DrawerToggleButton /> }}
      />
      <Stack.Screen name="new" options={{ title: "教科追加" }} />
    </Stack>
  );
}

function AddSubjectIcon() {
  return (
    <Link href="/(subjects)/new" asChild>
      <Pressable>
        <PlusIcon />
      </Pressable>
    </Link>
  );
}
