import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { BsFillChatFill } from "react-icons/bs";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";

function HandSScreen() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const sendMessage = () => {
    setMessage(`
      Hello, you have reached the help and support. Unfortunately, we did not have enough time to add everything we wanted.
      If you have any questions, feel free to reach out to any of us at our emails down below.
      Laura: lpaul2@atu.edu
      Lisset: lluna1@atu.edu
      Janniebeth: jmelendez2@atu.edu
      Evelin: ecerrospatricio@atu.edu
      Thank you!
    `);
    setVisible(true); // Show the modal
  };

  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous page
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Chat Button Component */}
      <TouchableOpacity
        onPress={sendMessage}
        style={[
          styles.chatWidget,
          hovered ? { borderWidth: 1, borderColor: "black" } : {},
        ]}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <BsFillChatFill size={16} color="white" />
        <Text style={styles.chatWidgetText}>Chat Now!!</Text>
      </TouchableOpacity>

      {/* Modal */}
      {visible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        >
          <View style={styles.modalWindow}>
            <Text>{message}</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: "#98A869", // Background color
    padding: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#E7C6CD",
    borderRadius: 5,
  },
  backButtonText: {
    color: "black",
  },
  chatWidget: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
  },
  chatWidgetText: {
    color: "white",
    marginLeft: 8,
  },
  modalWindow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: "#E7C6CD",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
};

export default HandSScreen;
