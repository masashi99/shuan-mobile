import { Shuan } from "@/components/Shuan";
import { ScrollView } from "react-native";

export default function Page() {
  return (
    <ScrollView contentContainerStyle={{ flex: 1, padding: 8, backgroundColor: "#fff" }}>
      <Shuan />
    </ScrollView>
  );
}
