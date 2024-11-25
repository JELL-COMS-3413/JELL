import React, { useState } from "react";
import { Modal, Text, TextInput, View, TouchableOpacity } from "react-native";

import styles from "./styles/styles";

export default function AddGoalItemModal({ onAddItem }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState("");
  const [goal, setGoal] = useState("");

  const handlePress = () => {
    if (title.trim() && amount.trim() && goal.trim()) {
      onAddItem({
        title: title.trim(),
        amount: amount.trim(),
        goal: goal.trim(),
      });
      setTitle("");
      setAmount("");
      setGoal("");
      setModalVisible(false);
    } else {
      alert("Please enter a title, current amount and goal amount");
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}> Add Item </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Item</Text>
            <Text style={styles.itemHeader}>Item Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter title for goal item"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <Text style={styles.itemHeader}>Current</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount saved so far"
              value={amount}
              onChangeText={(text) => setAmount(text)}
              keyboardType="numeric"
            />
            <Text style={styles.itemHeader}>Goal</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount to allocate to goal item"
              value={goal}
              onChangeText={(text) => setGoal(text)}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.successButton]}
                onPress={handlePress}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
