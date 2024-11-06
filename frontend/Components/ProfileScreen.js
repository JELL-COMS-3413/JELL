import React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";

export default function ProfileScreen({ navigation, setIsLoggedIn }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  const navigateToWelcome = () => {
    navigation.navigate("WelcomeScreen");
  };

<<<<<<< Updated upstream
=======
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
      const response = await fetch(`http://10.200.196.203:5000/profile/`, {
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

  const saveName = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const uName = await AsyncStorage.getItem("username");
      const response = await fetch(
        `http://10.200.37.109:5000/users/${uName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstname: firstName,
            lastname: lastName,
          }),
        }
      );
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
      const response = await fetch(`http://10.200.37.109:5000/profile`, {
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
        const response = await fetch("http://10.200.37.109:5000/profile", {
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
          `http://10.200.37.109:5000/users/${uName}`,
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
          console.log("loadedUser: ", loadedUser);
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

>>>>>>> Stashed changes
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Profile</Text>
      <Button title="Go Back to Welcome Screen" onPress={navigateToWelcome} />
      <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}
