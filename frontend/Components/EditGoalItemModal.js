import React, { useState, useEffect } from "react";
import { Modal, Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "./styles/styles";

export default function EditGoalItemModal({
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
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Goal Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter goal item title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter value to allocate"
            value={value}
            onChangeText={(text) => setValue(text)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.successButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
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
