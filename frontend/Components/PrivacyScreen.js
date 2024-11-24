import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const PrivacyScreen = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous page
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Privacy and Security</Text>

        <Text style={styles.sectionTitle}>Privacy Policy Summary</Text>
        <Text style={styles.paragraph}>
          We collect data to help you manage your finances better
        </Text>

        <Text style={styles.sectionTitle}>Security Tips</Text>
        <Text style={styles.paragraph}>
          - Use strong, unique passwords for your account. - Avoid using public
          Wi-Fi for sensitive actions. - Keep the app updated to ensure you have
          the latest security features.
        </Text>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.paragraph}>
          Support Email: It will be located in the help and support tab
        </Text>

        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#98A869", // Background color
    padding: 20,
    flex: 1, // Ensure it fills the screen
    justifyContent: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 35,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 20,
    lineHeight: 24,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#E7C6CD", // Button color
    borderRadius: 5,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
export default PrivacyScreen;
