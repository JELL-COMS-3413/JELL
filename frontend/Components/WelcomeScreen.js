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
import loadFonts from "./styles/fonts";
import { ipAddress } from "./ip";
import { profileImages } from "./ProfileScreen";

export default function WelcomeScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("default");
  const [fontsLoaded, setFontsLoaded] = useState(false);

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
        setUsername(user || "User"); // Set a default username if none exists
      } catch (error) {
        console.error("Error getting username:", error);
        alert(error.message);
      }
    };

    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`http://${ipAddress}:5000/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          if (response.status === 404) {
            await createDefaultProfile(); // Ensure createDefaultProfile is defined
          } else {
            console.error("Server Error:", errorResponse);
            throw new Error(errorResponse.message || "Failed to fetch profile");
          }
        } else {
          const loadedProfile = await response.json();
          setProfile(loadedProfile.profile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert(error.message);
      }
    };

    getUsername();
    fetchProfile();
  }, []);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);
  //if (!fontsLoaded) return null;
  //Removed for now, but might need later.

  return (
    <SafeAreaView style={styles.welcomeBackground}>
      <Image
        source={require("../assets/jellLogo.png")}
        style={{
          alignSelf: "center",
          margin: 10,
          height: "13%",
          width: "90%",
          marginTop: 20,
        }}
      />
      <View style={[styles.pageContentContainer, { height: "40%" }]}>
        <Text style={[styles.headerText, { marginBottom: 5 }]}>
          Welcome to JELL, {username}!
        </Text>
        <View style={welcomeStyles.instruction}>
          <Text style={styles.welcomefont}>
            Take a look around and set yourself up for a better financial
            future. Here are some links to help you get started:
          </Text>
        </View>
        <TouchableOpacity
          title="Your Profile"
          onPress={navigateToProfileScreen}
          style={styles.welcomeButton}
        >
          <Text style={styles.text}>Set Up Your Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Budget"
          onPress={navigateToBudgetOverview}
          style={styles.welcomeButton}
        >
          <Text style={styles.text}>Make Your Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Logout"
          onPress={handleLogout}
          style={styles.welcomeButton}
        >
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const welcomeStyles = StyleSheet.create({
  instruction: {
    marginBottom: 10,
  },
});
