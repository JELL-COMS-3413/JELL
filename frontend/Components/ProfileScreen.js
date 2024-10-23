import React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  const navigateToWelcome = () => {
    navigation.navigate("WelcomeScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Profile</Text>
      <Button title="Go Back to Welcome Screen" onPress={navigateToWelcome} />
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}
