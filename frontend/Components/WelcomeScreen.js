import React from "react";
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

export default function WelcomeScreen({ navigation, setIsLoggedIn }) {
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

  return (
    <SafeAreaView style={styles.welcomeScreenBackground}>
      <Text style={styles.headerText}>Welcome to jell!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          title="Your Profile"
          onPress={navigateToProfileScreen}
        >
          <Image
            style={styles.profileIcon}
            source={require("../assets/profileIcon.png")}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.budgetButton}
        title="Budget"
        onPress={navigateToBudgetOverview}
      >
        <Text>Budget</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.budgetButton}
        title="Logout"
        onPress={handleLogout}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const welcomeStyle = StyleSheet.create({});
