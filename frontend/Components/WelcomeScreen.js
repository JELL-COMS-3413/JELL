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
    <SafeAreaView style={styles.background}>
      <Text style={styles.header}>Welcome to JELL!</Text>
      <View>
        <Text>
          Take a look around and set yourself up for a better financial future
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            title="Your Profile"
            onPress={navigateToProfileScreen}
          >
            <Text>Set Up Your Profile</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity title="Budget" onPress={navigateToBudgetOverview}>
          <Text>Make Your Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity title="Logout" onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const welcomeStyle = StyleSheet.create({});
