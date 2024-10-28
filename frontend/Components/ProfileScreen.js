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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";

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
  const [bio, setBio] = useState("");

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
          bio: bio,
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
    const profileBody = { profile: "default", bio: "" };
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://192.168.1.124:5000/profile`, {
        method: "PUT",
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
      setBio(newProfile.bio);
    } catch (error) {
      console.error("Error creating profile:", error);
      alert(error.message);
    }
  };
  // backend not working rn, will fix later
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
          setBio(loadedProfile.bio);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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
            <Text>Bio: {bio}</Text>
            <Pressable onPress={handleClickEdit}>
              <Text>Click to edit</Text>
            </Pressable>
          </View>
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
              placeholder="Enter bio"
              value={bio}
              onChangeText={(text) => setBio(text)}
            />
            <Pressable
              onPress={handleEditSave}
              style={profileStyles.saveButton}
            >
              <Text>Save Edits</Text>
            </Pressable>
          </View>
        </View>
      )}
      <Pressable title="Go to Budget" onPress={navigateToBudgetOverview} />
      <Pressable title="Logout" onPress={handleLogout} />
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
});
