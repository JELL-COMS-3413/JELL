import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const HandSScreen = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const sendMessage = () => {
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

      {/* Chat Button */}
      <TouchableOpacity onPress={sendMessage} style={styles.chatWidget}>
        <Icon name="comment" size={16} color="white" />
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
            <Text style={styles.modalText}>
              Hello, you have reached Help & Support. Please email us:{"\n"}
              Laura: lpaul2@atu.edu{"\n"}
              Lisset: lluna1@atu.edu{"\n"}
              Janniebeth: jmelendez2@atu.edu{"\n"}
              Evelin: ecerrospatricio@atu.edu
            </Text>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98A869",
    padding: 20,
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
  },
  chatWidgetText: {
    color: "white",
    marginLeft: 8,
  },
  modalWindow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    backgroundColor: "#E7C6CD",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default HandSScreen;
