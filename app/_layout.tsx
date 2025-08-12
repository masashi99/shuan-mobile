import { SafeToastViewport } from "@/features/shared/components/SafeToastViewport";
import { Providers } from "@/features/shared/providers/Providers";
import { Link } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { BookOpen, Calendar, CalendarCog, PlusIcon } from "lucide-react-native";
import { Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <Providers>
      <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
        <Drawer screenOptions={{ swipeEnabled: false, drawerType: "front" }}>
          <Drawer.Screen
            name="index"
            options={{
              title: "週案",
              headerTitle: "週案",
              drawerIcon: () => <Calendar />,
              drawerActiveTintColor: "green"
            }}
          />
          <Drawer.Screen
            name="timetable"
            options={{
              title: "時間割設定",
              headerTitle: "時間割設定",
              drawerIcon: () => <CalendarCog />,
              drawerActiveTintColor: "green"
            }}
          />
          <Drawer.Screen
            name="subjects"
            options={{
              title: "教科設定",
              headerTitle: "教科設定",
              drawerIcon: () => <BookOpen />,
              drawerActiveTintColor: "green",
              headerRight: () => <SubjectHeaderRight />
            }}
          />
        </Drawer>
        <SafeToastViewport />
      </SafeAreaView>
    </Providers>
  );
}

function SubjectHeaderRight() {
  return (
    <Link href="/(stacks)/addSubject" asChild>
      <Pressable>
        <PlusIcon />
      </Pressable>
    </Link>
  );
}
