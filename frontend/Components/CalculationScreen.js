import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Modal,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";
import { ipAddress } from "./ip";
import loadFonts from "./styles/fonts";
import TabNavigation from "./TabNavigation";
import { profileImages } from "./ProfileScreen";
import StockModal from "./StockModal";
import CalculatorModal from "./CalculatorModal";
import SavedCalculations from "./SavedCalculations";

export default function CalculationScreen({ navigation, setIsLoggedIn }) {
  const [profile, setProfile] = useState("default");
  const [isLoanCalculator, setIsLoanCalculator] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loanCalc = [
    { id: "1", title: "Amortized Loan" },
    { id: "2", title: "Deferred Payment Loan" },
    { id: "3", title: "Bond" },
    { id: "4", title: "Mortgage" },
    { id: "5", title: "Auto Loan" },
    { id: "6", title: "Student Loan" },
    { id: "7", title: "Mortgage Payoff" },
  ];

  const saveCalc = [
    { id: "1", title: "Savings" },
    { id: "2", title: "Simple Interest" },
    { id: "3", title: "Compound Interest" },
    { id: "4", title: "Certificate of Deposit" },
    { id: "5", title: "IRAs" },
    { id: "6", title: "401K" },
    { id: "7", title: "Social Security" },
  ];

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

          console.error("Server Error:", errorResponse);
          throw new Error(errorResponse.message || "Failed to fetch profile");
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

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  const toggleScreen = () => {
    setIsLoanCalculator(!isLoanCalculator);
  };

  const renderItem = ({ item }) => <CalculatorModal calculator={item} />;

  return (
    <SafeAreaView style={styles.welcomeBackground}>
      <TouchableOpacity onPress={navigateToProfileScreen}>
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
        <View style={[styles.pageContentContainer, { height: "50%" }]}>
          <FlatList
            data={loanCalc}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View style={[styles.pageContentContainer, { height: "50%" }]}>
          <FlatList
            data={saveCalc}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      <SavedCalculations />
      <StockModal />
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
  item: {
    backgroundColor: "#f7f7e4",
    padding: 10,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 29,
  },
  text: {
    fontSize: 16,
  },
});

Object.assign(styles, additionalStyles);
