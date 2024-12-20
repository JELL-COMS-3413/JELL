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
import TabNavigation from "./TabNavigation";
import styles from "./styles/styles";
import { ipAddress } from "./ip";
import loadFonts from "./styles/fonts";

export const profileImages = {
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
  { key: "6", name: "default" },
];

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState("default");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handleClickEdit = () => {
    setEditing(true);
  };

  const handleEditSave = () => {
    saveProfile();
    saveName();
    setEditing(false);
  };

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    console.log("profile: ", profile);
  };

  const saveProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(`http://${ipAddress}:5000/profile/`, {
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
      } else {
        const result = await response.json();
        await AsyncStorage.setItem("profile", result.profile);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.message);
    }
  };

  const saveName = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const uName = await AsyncStorage.getItem("username");

      const response = await fetch(`http://${ipAddress}/users/${uName}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
        }),
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server Error:", errorResponse);
        throw new Error(errorResponse.message || "Failed to update name");
      }
    } catch (error) {
      console.error("Error updating name:", error);
      alert(error.message);
    }
  };

  const createDefaultProfile = async () => {
    const profileBody = { profile: "default" };
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://${ipAddress}:5000/profile`, {
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
      await AsyncStorage.setItem("profile", newProfile.profile);
      console.log("Created new profile: ", newProfile.profile);
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
            await AsyncStorage.setItem("profile", "default");
          } else {
            console.error("Server Error:", errorResponse);
            throw new Error(errorResponse.message || "Failed to fetch profile");
          }
        } else {
          const loadedProfile = await response.json();
          setProfile(loadedProfile.profile);
          await AsyncStorage.setItem("profile", loadedProfile.profile);
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
        const uName = await AsyncStorage.getItem("username");
        setUsername(uName);
        const response = await fetch(
          `http://${ipAddress}:5000/users/${uName}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Server Error:", errorResponse);
          throw new Error(errorResponse.message || "Failed to fetch user data");
        } else {
          const loadedUser = await response.json();
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

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <Text style={[styles.headerText, { marginTop: 50 }]}>PROFILE</Text>
      <View style={styles.pinkPageSection}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : !editing ? (
          <View>
            <Image
              source={profileImages[profile]}
              style={styles.profileHeader}
            />
            <View style={[styles.pageContentContainer, { height: "40%" }]}>
              <Text style={{ fontFamily: "coolveticarg" }}>Name:</Text>
              <Text style={{ fontFamily: "LouisGeorgeCafe" }}>
                {firstName} {lastName}
              </Text>
              <Text style={{ fontFamily: "coolveticarg" }}>Username:</Text>
              <Text style={{ fontFamily: "LouisGeorgeCafe" }}>{username}</Text>
              <Pressable
                onPress={handleClickEdit}
                style={{
                  borderRadius: 20,
                  borderWidth: 2,
                  backgroundColor: "#98A869",
                  alignSelf: "center",
                  padding: 10,
                }}
              >
                <Text style={{ fontFamily: "LouisGeorgeCafe" }}>
                  Click to edit
                </Text>
              </Pressable>
            </View>

            <Pressable onPress={handleLogout} style={[profileStyles.logout]}>
              <Text style={{ fontFamily: "LouisGeorgeCafe" }}>Logout</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <Text>Select Profile Icon</Text>
            <FlatList
              data={iconChoices}
              renderItem={({ item }) => (
                <Pressable onPress={() => updateProfile(item.name)}>
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
              <Text style={{ fontFamily: "LouisGeorgeCafe" }}>Logout</Text>
            </Pressable>
          </View>
        )}
        <TabNavigation navigation={navigation} />
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
    margin: 5,
    borderWidth: 2,
  },
});
