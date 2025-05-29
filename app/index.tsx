import { Shuan } from "@/components/Shuan";
import { ScrollView, StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 16 }}>
          <Shuan />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
