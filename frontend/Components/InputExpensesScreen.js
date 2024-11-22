import React, { useState, useEffect, useCallback } from "react";
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
  // for showing date picker
  const [showDate, setShowDate] = useState(false);
  // for tracking whether date has been selected
  const [dateSelected, setDateSelected] = useState(false);
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

  const showDatePicker = useCallback(() => {
    setShowDate(true);
  }, []);

  // navigation on click of profile icon
  const navigateToProfileScreen = () => {
    navigation.navigate("ProfileScreen");
  };

  // open camera to scan receipt
  const openCamera = () => {};

  // on click add expense
  const handleAddExpense = () => {
    if (title.trim() && category.trim() && amount > 0 && date) {
      // database function
      addExpense({
        category: category.trim(),
        title: title.trim(),
        date: date,
        value: amount,
      });
      // resetting values after expense added
      setCategory("");
      setTitle("");
      setAmount(0);
      setDateSelected(false);
    } else {
      alert("Please fill out all fields");
    }
  };

  const addExpense = useCallback(async (newBudgetExpense) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://${ipAddress}:5000/expense/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBudgetExpense),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Failed to add expense to budget"
        );
      }

      const savedBudgetExpense = await response.json();
    } catch (error) {
      console.error("Error adding expense to budget:", error);
      alert(error.message);
    }
  }, []);

  // date selection function
  const changeDate = (event, selectedDate) => {
    if (event.type === "set") {
      setDate(selectedDate);
      setDateSelected(true);
      setShowDate(false);
    } else if (event.type === "dismissed") {
      setShowDate(false);
      setShow(Platform.OS === "ios"); // Hide on iOS after selection
    }
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
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          marginTop: 60,
          marginBottom: 5,
        }}
      >
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
      <View style={styles.pinkPageSection}>
        <View style={[styles.pageContentContainer]}>
          <Text style={{ fontFamily: "coolveticarg", margin: 5 }}>Date:</Text>
          <View
            style={{
              backgroundColor: "#ccc",
              margin: 5,
              borderRadius: 20,
              padding: 10,
            }}
          >
            <TouchableOpacity onPress={showDatePicker}>
              <Text style={{ fontFamily: "LouisGeorgeCafe", fontSize: 16 }}>
                {!dateSelected ? "Select Date" : `${date.toLocaleDateString()}`}
              </Text>
            </TouchableOpacity>
            {showDate && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={changeDate}
              />
            )}
          </View>
          <Text style={{ fontFamily: "coolveticarg", margin: 5 }}>
            Title of Expense:
          </Text>
          <View>
            <TextInput
              placeholder="Enter title of spending"
              style={{
                fontFamily: "LouisGeorgeCafe",
                fontSize: 16,
                backgroundColor: "#ccc",
                margin: 5,
                borderRadius: 20,
                padding: 10,
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
              width: "100%",
              marginBottom: 5,
            }}
          >
            <View style={{ alignItems: "center", marginRight: 5 }}>
              <Text
                style={{
                  fontFamily: "coolveticarg",
                  paddingRight: 10,
                  fontSize: 16,
                }}
              >
                Manually Input:
              </Text>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: "#ccc",
                  padding: 8,
                  margin: 5,
                }}
              >
                <TextInput
                  placeholder="Enter amount spent"
                  style={{ fontFamily: "LouisGeorgeCafe" }}
                  value={amount}
                  onChangeText={(number) => setAmount(parseFloat(number))}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "coolveticarg",
                  paddingRight: 10,
                  fontSize: 16,
                }}
              >
                Or Scan Receipt:
              </Text>
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: "#ccc",
                  padding: 8,
                  margin: 5,
                }}
              >
                <TouchableOpacity style={{ alignSelf: "center" }}>
                  <Image
                    onPress={openCamera}
                    source={require("../assets/cameraIcon.png")}
                  />
                </TouchableOpacity>
              </View>
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
                  color: "gray",
                }}
                itemTextStyle={{ fontFamily: "LouisGeorgeCafe", fontSize: 16 }}
                value={category}
                onChange={(item) => {
                  if (item && item.title) {
                    // Ensure item and item.title are defined
                    setCategory(item.title);
                    console.log(category);
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
              backgroundColor: "#98A869",
              borderWidth: 2,
              borderColor: "black",
              padding: 10,
              marginTop: 10,
            }}
            onPress={handleAddExpense}
          >
            <Text style={{ fontFamily: "LouisGeorgeCafe" }}>Add Expense</Text>
          </TouchableOpacity>
        </View>
        <TabNavigation navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}
