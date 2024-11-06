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

import loadFonts from './styles/fonts'; 

=======
import { profileImages } from "./ProfileScreen";


export default function WelcomeScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState("default");
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
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("http://10.200.169.92:5000/profile", {
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
    getUsername();
    fetchProfile();
  }, []);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);
  if (!fontsLoaded) return null; 


  return (
    <SafeAreaView style={styles.welcomeBackground}>
      <Image source={profileImages[profile]} style={styles.profileIcon} />

      <Text style={styles.headerText}>Welcome to JELL, {username}!</Text>
      <View style={styles.pageContentContainer}>
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
          <Text style={styles.text}> Set Up Your Profile</Text>
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
