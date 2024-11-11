import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";
import TabNavigation from "./TabNavigation";

export default function CalculationScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
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
  return (
    <SafeAreaView style={styles.welcomeBackground}>
      <Text style={styles.headerText}>Calculation</Text>
      <Text>This will be the screen for loan calculators.</Text>

      <TabNavigation navigation={navigation} />
    </SafeAreaView>
  );
}

//Everything before this is the base components!!!! (DO NOT DELETE)
