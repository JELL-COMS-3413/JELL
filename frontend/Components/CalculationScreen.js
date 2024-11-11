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
import { ipAddress } from "./styles/styles";
import TabNavigation from "./TabNavigation";
import { profileImages } from "./ProfileScreen";

export default function CalculationScreen({ navigation, setIsLoggedIn }) {
  const [profile, setProfile] = useState("default");
  const [isLoanCalculator, setIsLoanCalculator] = useState(true);

  const navigateToProfileScreen = () => {
    navigation.navigate("ProfileScreen");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`http://${ipAddress}:5000/profile/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          if (response.status === 404) {
            await createDefaultProfile();
          } else {
            console.error("Server Error:", errorResponse);
            throw new Error(errorResponse.message || "Failed to fetch profile");
          }
        } else {
          const loadedProfile = await response.json();
          console.log("loadedProfile: ", loadedProfile);
          setProfile(loadedProfile.profile);
          console.log("profile: ", profile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert(error.message);
      }
    };
    fetchProfile();
  }, []);

  const toggleScreen = () => {
    setIsLoanCalculator(!isLoanCalculator);
  };

  return (
    <SafeAreaView style={styles.welcomeBackground}>
      <TouchableOpacity>
        <Image source={profileImages[profile]} style={styles.profileIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>
        {isLoanCalculator ? "Loan Calculations" : "Savings Calculations"}
      </Text>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleScreen}>
        <Text style={styles.buttonText}>
          {isLoanCalculator ? "Calculate Savings" : "Calculate Loans"}
        </Text>
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
