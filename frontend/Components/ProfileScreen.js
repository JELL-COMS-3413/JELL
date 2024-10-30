import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  StyleSheet,
  Image,
  View,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";
import TabNavigation from "./TabNavigation";

const profileImages = {
  default: require("../assets/defaultProfileIcon.png"),
  bear: require("../assets/bear.png"),
  frog: require("../assets/frog.png"),
  cow: require("../assets/cow.png"),
  crab: require("../assets/crab.png"),
  whale: require("../assets/whale.png"),
};

const iconChoices = [
  { key: "1", name: "bear" },
  { key: "2", name: "frog" },
  { key: "3", name: "cow" },
  { key: "4", name: "crab" },
  { key: "5", name: "whale" },
];

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState("default");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  const navigateToBudgetOverview = () => {
    navigation.navigate("BudgetOverviewScreen");
  };

  const handleClickEdit = () => {
    setEditing(true);
  };

  const handleEditSave = () => {
    setEditing(false);
    saveProfile();
  };

  const saveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://192.168.1.124:5000/profile/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profile: profile,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server Error:", errorResponse);
        throw new Error(errorResponse.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    }
  };

  const createDefaultProfile = async () => {
    const profileBody = { profile: "default" };
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://192.168.1.124:5000/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileBody),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server Error:", errorResponse);
        throw new Error(errorResponse.message || "Failed to create profile");
      }

      const newProfile = await response.json();
      setProfile(newProfile.profile);
    } catch (error) {
      console.error("Error creating profile:", error);
      alert(error.message);
    }
  };
  // fetching user profile and data from backend
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("http://192.168.1.124:5000/profile", {
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
          setProfile(loadedProfile.profile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("http://192.168.1.124:5000/users", {
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
          const loadedUser = await response.json();
          setUsername(loadedUser.username);
          setFirstName(loadedUser.firstname);
          setLastName(loadedUser.lastname);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PROFILE</Text>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : !editing ? (
        <View style={styles.greenPageSection}>
          <Image
            source={profileImages[profile]}
            style={profileStyles.profileIcon}
          />
          <View style={styles.pageContentContainer}>
            <Text>
              Name: {firstName} {lastName}
            </Text>
            <Text>Username: {username}</Text>
            <Pressable onPress={handleClickEdit}>
              <Text>Click to edit</Text>
            </Pressable>
          </View>

          <Pressable onPress={handleLogout} style={profileStyles.logout}>
            <Text>Logout</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.greenPageSection}>
          <Text>Select Profile Icon</Text>
          <FlatList
            data={iconChoices}
            renderItem={({ item }) => (
              <Pressable onPress={setProfile(item.name)}>
                <Image
                  style={profileStyles.selection}
                  source={profileImages[item.name]}
                />
              </Pressable>
            )}
            keyExtractor={(item) => item.key}
            horizontal
          />
          <View style={styles.pageContentContainer}>
            <TextInput
              placeholder="Enter first name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              placeholder="Enter last name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <Pressable
              onPress={handleEditSave}
              style={profileStyles.saveButton}
            >
              <Text>Save Edits</Text>
            </Pressable>
          </View>
          <Pressable onPress={handleLogout} style={profileStyles.logout}>
            <Text>Logout</Text>
          </Pressable>
        </View>
      )}
      <View style={navStyles.navContainer}>
        <TouchableOpacity
          onPress={navigateToBudgetOverview}
          style={navStyles.navButton}
        >
          <Image source={require("../assets/homeIcon.png")}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToBudgetOverview}
          style={navStyles.navButton}
        >
          <Image source={require("../assets/calculatorIcon.png")}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToBudgetOverview}
          style={navStyles.navButton}
        >
          <Image source={require("../assets/addIcon.png")}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToBudgetOverview}
          style={navStyles.navButton}
        >
          <Image source={require("../assets/settingsIcon.png")}></Image>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const profileStyles = StyleSheet.create({
  profileIcon: {
    height: 200,
    width: 200,
    borderWidth: 2,
    borderRadius: 20,
    alignSelf: "center",
    margin: 20,
  },
  bio: {
    margin: 30,
  },
  saveButton: {
    alignSelf: "right",
  },
  selectButton: {
    alignSelf: "center",
  },
  selection: {
    height: 50,
    width: 50,
    margin: 10,
  },
  logout: {
    borderRadius: 20,
    backgroundColor: "white",
    width: "30%",
    alignSelf: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
});

const navStyles = StyleSheet.create({
  navContainer: {
    borderRadius: 20,
    backgroundColor: "white",
    flexDirection: "row",
    height: 70,
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
    margin: 20,
    padding: 10,
  },
  navIcon: {
    height: 30,
    width: 30,
  },
  navButton: {
    marginLeft: 20,
    marginRight: 20,
  },
});
