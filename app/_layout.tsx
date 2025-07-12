import { AppProvider } from "@/features/shared/providers/AppProvider";
import { QueryProvider } from "@/features/shared/providers/QueryProvider";
import { RepositoryProvider } from "@/features/shared/providers/RepositoryProvider";
import { Drawer } from "expo-router/drawer";
import { BookOpen, Calendar, CalendarCog } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <QueryProvider>
      <AppProvider>
        <RepositoryProvider>
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
                  drawerActiveTintColor: "green"
                }}
              />
            </Drawer>
          </SafeAreaView>
        </RepositoryProvider>
      </AppProvider>
    </QueryProvider>
  );
}
