import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Modal from "react-native-modal";

export function TimetableCell() {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = async () => setModalVisible(true);

  const handleRequestClose = () => setModalVisible(false);

  const handleOk = () => {
    console.log("true");
    setModalVisible(false);
  };

  const handleCancel = () => {
    console.log("false");
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [{ width: "100%", height: "100%" }, pressed && { backgroundColor: "red" }]}
      />
      <Modal
        isVisible={modalVisible}
        swipeDirection="down"
        onSwipeComplete={handleRequestClose}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 16,
            backgroundColor: "white",
            borderRadius: 16,
            height: "80%"
          }}
        >
          <Pressable onPress={handleOk}>
            <View>
              <Text>Ok</Text>
            </View>
          </Pressable>
          <Pressable onPress={handleCancel}>
            <View>
              <Text>Cancel</Text>
            </View>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}
