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
  const [amount, setAmount] = useState("");
  const [goal, setGoal] = useState("");

  useEffect(() => {
    setTitle(item?.title || "");
    setAmount(item?.amount || "");
    setGoal(item?.goal || "");
  }, [item]);

  const handleSave = () => {
    if (title.trim() && amount.trim() && goal.trim()) {
      onSave({
        ...item,
        title: title.trim(),
        amount: amount.trim(),
        goal: goal.trim(),
      });
      onClose();
    } else {
      alert("Please enter a title, current amount and goal");
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
        <View style={[styles.modalContent, { height: "40%" }]}>
          <Text style={styles.modalTitle}>Edit Goal Item</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter title for goal item"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter amount saved so far"
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />
          <TextInput
            style={styles.input}
            placeHolder="Enter amount to allocate to goal item"
            value={goal}
            onChangeText={(text) => setGoal(text)}
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
