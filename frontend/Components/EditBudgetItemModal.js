import React, { useState, useEffect } from "react";
import { Modal, Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "./styles/styles";

export default function EditBudgetItemModal({
  item = {},
  isVisible,
  onClose,
  onSave,
}) {
  const [title, setTitle] = useState(item?.title || "");
  const [value, setValue] = useState(item?.value || "");

  useEffect(() => {
    setTitle(item?.title || "");
    setValue(item?.value || "");
  }, [item]);

  const handleSave = () => {
    if (title.trim() && value.trim()) {
      onSave({ ...item, title: title.trim(), value: value.trim() });
      onClose();
    } else {
      alert("Please enter a title and value");
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { height: "30%" }]}>
          <Text style={styles.modalTitle}>Edit Budget Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter budget item title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter value to allocate"
            value={value}
            onChangeText={(text) => setValue(text)}
          />
          <View style={[styles.buttonContainer, { alignSelf: "flex-end" }]}>
            <TouchableOpacity
              style={[styles.button, styles.successButton, { width: "40%" }]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { width: "40%" }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
