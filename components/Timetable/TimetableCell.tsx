import { Pressable, View } from "react-native";

export function TimetableCell() {
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => console.log("press")}
        style={({ pressed }) => [{ width: "100%", height: "100%" }, pressed && { backgroundColor: "red" }]}
      ></Pressable>
    </View>
  );
}
