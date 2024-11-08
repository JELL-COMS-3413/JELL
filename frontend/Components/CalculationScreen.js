import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";
import TabNavigation from "./TabNavigation";

export default function CalculationScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [isLoanCalculator, setIsLoanCalculator] = useState(true);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const navigateToProfileScreen = () => {
    navigation.navigate("ProfileScreen");
  };

  const navigateToBudgetOverview = () => {
    navigation.navigate("BudgetOverviewScreen");
  };

  useEffect(() => {
    const getUsername = async () => {
      try {
        const user = await AsyncStorage.getItem("username");
        setUsername(user);
      } catch (error) {
        console.error("Error getting username:", error);
        alert(error.message);
      } finally {
        console.log(username);
      }
    };
    getUsername();
  }, []);

  const toggleScreen = () => {
    setIsLoanCalculator(!isLoanCalculator);
  };

  return (
    <SafeAreaView style={styles.welcomeBackground}>
      <Text style={styles.headerText}>{isLoanCalculator ? "Loan Calculations" : "Savings Calculations"}</Text>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleScreen}>
        <Text style={styles.buttonText}>{isLoanCalculator ? "Calculate Savings" : "Calculate Loans"}</Text>
      </TouchableOpacity>
      {isLoanCalculator ? (
        <View>
          <Text>This will be the screen for Loan calculators.</Text>
        </View>
      ) : (
        <View>
          <Text>This will be the screen for Savings Calculator.</Text>
        </View>
      )}
      

      <TabNavigation navigation={navigation} />
    </SafeAreaView>
  );
}

const additionalStyles = StyleSheet.create({
  toggleButton: {
    borderRadius: 20,
    backgroundColor: "white",
    width: "40%",
    alignSelf: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});

Object.assign(styles, additionalStyles);
