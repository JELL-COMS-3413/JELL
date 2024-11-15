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
import { ipAddress } from "./ip";
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

  const [loading, setLoading] = useState(true);

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
    const fetchBudgetItems = async () => {
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
        if (Array.isArray(budgetItems) && budgetItems.length > 0) {
          // Make sure each item has 'title' and 'value' properties
          const validBudgetItems = budgetItems.filter(
            (item) => item.title && item.value
          );
          console.log("validBudgetItems: ", validBudgetItems);
          setCategories(validBudgetItems);
        } else {
          console.warn("Received empty or invalid budget items:", budgetItems);
        }
      } catch (error) {
        console.error("Error fetching budget items:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    fetchBudgetItems();
    console.log(categories);
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
      <View
        style={[
          styles.header,
          { marginBottom: -20, position: "relative", zIndex: 10 },
        ]}
      >
        <Text style={[styles.headerText, { padding: 10 }]}>
          Input Money Spent
        </Text>
      </View>
      <View style={styles.greenPageSection}>
        <View style={[styles.pageContentContainer, { marginTop: 100 }]}>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                borderRadius: 20,
                backgroundColor: "#ccc",
                padding: 10,
                margin: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "coolveticarg",
                  paddingRight: 10,
                  fontSize: 20,
                  paddingBottom: 20,
                }}
              >
                Manually Input:
              </Text>
              <TextInput
                placeholder="Enter amount spent"
                style={{ fontFamily: "LouisGeorgeCafe" }}
                value={amount}
                onChangeText={(number) => setAmount(parseFloat(number))}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                borderRadius: 20,
                backgroundColor: "#ccc",
                padding: 10,
                margin: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "coolveticarg",
                  paddingRight: 10,
                  paddingBottom: 20,
                  fontSize: 20,
                }}
              >
                Or Scan Receipt:
              </Text>
              <TouchableOpacity style={{ alignSelf: "center" }}>
                <Image
                  onPress={openCamera}
                  source={require("../assets/cameraIcon.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          {loading ? (
            <Text>Dropdown loading</Text>
          ) : (
            <View
              style={{ backgroundColor: "#ccc", borderRadius: 20, padding: 10 }}
            >
              <Text style={{ fontFamily: "coolveticarg", fontSize: 20 }}>
                Select budget category
              </Text>
              <Dropdown
                data={categories}
                labelField="title"
                valueField="value"
                placeholder="spending category"
                style={{ padding: 20 }}
                selectedTextStyle={{
                  fontFamily: "LouisGeorgeCafe",
                  fontSize: 16,
                }}
                placeholderStyle={{
                  fontFamily: "LouisGeorgeCafe",
                  fontSize: 16,
                }}
                itemTextStyle={{ fontFamily: "LouisGeorgeCafe", fontSize: 16 }}
                value={category}
                onChange={(item) => {
                  if (item && item.title) {
                    // Ensure item and item.title are defined
                    setCategory(item.title);
                  }
                }}
                dropdownPosition="bottom"
              />
            </View>
          )}
        </View>
        <TabNavigation navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}
