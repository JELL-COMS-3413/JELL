import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";
import { ipAddress } from "./styles/styles";
import { profileImages } from "./ProfileScreen";
import loadFonts from "./styles/fonts";
import TabNavigation from "./TabNavigation";

export default function InputExpensesScreen({ navigation, setIsLoggedIn }) {
  // profile icon
  const [profile, setProfile] = useState("default");
  // amount spent
  const [amount, setAmount] = useState(0);
  // categories of budget spending
  const [categories, setCategories] = useState([]);
  // category selected
  const [category, setCategory] = useState("");
  // font
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // navigation on click of profile icon
  const navigateToProfileScreen = () => {
    navigation.navigate("ProfileScreen");
  };

  // open camera to scan receipt
  const openCamera = () => {};

  // load profile image
  useEffect(() => {
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
    const fetchItems = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`http://${ipAddress}:5000/budget/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Server Error:", errorResponse);
          throw new Error(
            errorResponse.message || "Failed to fetch budget items"
          );
        }

        const budgetItems = await response.json();
        setCategories(budgetItems);
      } catch (error) {
        console.error("Error fetching budget items:", error);
        alert(error.message);
      } finally {
        console.log(categories[0].title);
      }
    };
    fetchProfile();
    fetchItems();
  }, []);

  // load font
  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);
  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.background}>
      <TouchableOpacity onPress={navigateToProfileScreen}>
        <Image source={profileImages[profile]} style={styles.profileIcon} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Input Money Spent</Text>
      <View style={styles.greenPageSection}>
        <View style={styles.pageContentContainer}>
          <Text>Manually Input: </Text>
          <TextInput
            placeholder="Enter amount spent"
            value={amount}
            onChangeText={(number) => setAmount(parseFloat(number))}
          />
          <Text>Or Scan Receipt: </Text>
          <TouchableOpacity onPress={openCamera}></TouchableOpacity>
          <Dropdown
            data={categories}
            labelField="label"
            valueField="value"
            placeholder="Select spending category"
            value={category}
            onChange={(item) => {
              setCategory(item.title);
            }}
          />
        </View>
        <TabNavigation navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}