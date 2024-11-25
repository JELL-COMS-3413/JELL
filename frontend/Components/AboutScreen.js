import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About the App</Text>
      <Text style={styles.description}>
        This app is your financial companion, offering tools to calculate a
        variety of financial scenarios including amortized loans, deferred
        payment loans, bonds, mortgages, auto loans, student loans, mortgage
        payoffs, savings, simple interest, compound interest, certificates of
        deposit, IRAs, 401(k)s, and social security.
      </Text>
      <Text style={styles.description}>
        Visualize your spending with an interactive pie chart, set and track
        financial goals, and easily save and review past calculations for future
        reference. Whether you're planning your next big purchase or
        strategizing for long-term savings, this app is designed to help you
        stay on top of your future.
      </Text>
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
  description: {
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
export default AboutScreen;
