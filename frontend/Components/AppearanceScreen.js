import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function AppearanceScreen({ toggleTheme, theme, closeModal }) {
  return (
    <SafeAreaView style={appearanceStyles.container}>
      <Text style={appearanceStyles.headerText}>Appearance Settings</Text>

      {/* Dark Mode Toggle */}
      <TouchableOpacity
        style={appearanceStyles.switchButton}
        onPress={toggleTheme}
      >
        <Text style={appearanceStyles.switchButtonText}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </Text>
      </TouchableOpacity>

      {/* Close Button */}
      <TouchableOpacity
        onPress={closeModal}
        style={appearanceStyles.closeButton}
      >
        <Text style={appearanceStyles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const appearanceStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  switchButton: {
    padding: 15,
    backgroundColor: "#E7C6CD",
    borderRadius: 5,
    marginBottom: 20,
  },
  switchButtonText: {
    fontSize: 16,
    color: "#000",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#E7C6CD",
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#000",
  },
});
