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
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";
import { ipAddress } from "./ip";
import { profileImages } from "./ProfileScreen";
import loadFonts from "./styles/fonts";
import TabNavigation from "./TabNavigation";

export default function InputExpensesScreen({ navigation, setIsLoggedIn }) {
  // profile icon
  const [profile, setProfile] = useState("default");
  // for date selection
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  // for title/description of spending
  const [title, setTitle] = useState("");
  // amount spent
  const [amount, setAmount] = useState(0);
  // categories of budget spending
  const [categories, setCategories] = useState([]);
  // category selected
  const [category, setCategory] = useState("");
  // font
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // for loading dropdown categories menu
  const [loading, setLoading] = useState(true);

  const showDatePicker = () => {
    setShowDate(true);
  };

  // navigation on click of profile icon
  const navigateToProfileScreen = () => {
    navigation.navigate("ProfileScreen");
  };

  // open camera to scan receipt
  const openCamera = () => {};

  // date selection function
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // Hide on iOS after selection
    setDate(currentDate);
  };

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
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <TouchableOpacity
          onPress={navigateToProfileScreen}
          style={{ alignSelf: "flex-start" }}
        >
          <Image source={profileImages[profile]} style={styles.profileIcon} />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerText,
            { alignSelf: "center", marginRight: 30, marginTop: 20 },
          ]}
        >
          Input Money Spent
        </Text>
      </View>
      <View style={styles.greenPageSection}>
        <View style={[styles.pageContentContainer, { marginTop: 10 }]}>
          <View
            style={{
              backgroundColor: "#ccc",
              margin: 5,
              borderRadius: 20,
              padding: 10,
              flex: 1,
            }}
          >
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={{ fontFamily: "coolveticarg", fontSize: 16 }}>
                Select Date
              </Text>
            </TouchableOpacity>
            {showDate && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <View>
            <TextInput
              placeholder="Enter title of spending"
              style={{
                fontFamily: "coolveticarg",
                fontSize: 16,
                backgroundColor: "#ccc",
                margin: 5,
                borderRadius: 20,
                padding: 10,
                flex: 1,
              }}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
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
                padding: 8,
                margin: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "coolveticarg",
                  paddingRight: 10,
                  fontSize: 16,
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
                padding: 8,
                margin: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "coolveticarg",
                  paddingRight: 10,
                  paddingBottom: 20,
                  fontSize: 16,
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
              style={{ backgroundColor: "#ccc", borderRadius: 20, padding: 8 }}
            >
              <Text style={{ fontFamily: "coolveticarg", fontSize: 16 }}>
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
          <TouchableOpacity
            style={{
              borderRadius: 20,
              alignSelf: "center",
              backgroundColor: "#C1BC6B",
              borderWidth: 1,
              borderColor: "black",
              padding: 10,
              marginTop: 10,
            }}
          >
            <Text style={{ fontFamily: "LouisGeorgeCafe" }}>Add Expense</Text>
          </TouchableOpacity>
        </View>
        <TabNavigation navigation={navigation} />
      </View>
    </SafeAreaView>
  );

}
