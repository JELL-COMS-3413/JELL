import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Image,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import styles from "./styles/styles";

// Import AppearanceScreen
import AppearanceScreen from "./AppearanceScreen"; // Make sure it's correctly imported

export default function SettingScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // State to manage theme (light/dark)
  const [theme, setTheme] = useState("light");

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
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
    getUsername();
  }, []);

  // Flatlist for all the categories in the settings page
  const settingsCategories = [
    { id: "1", title: "Account", image: require("../assets/accountIcon.png") },
    {
      id: "2",
      title: "Notifications",
      image: require("../assets/notifIcon.png"),
    },
    {
      id: "3",
      title: "Appearance",
      image: require("../assets/appearIcon.png"),
    },
    {
      id: "4",
      title: "Privacy & Security",
      image: require("../assets/privIcon.png"),
    },
    {
      id: "5",
      title: "Help and Support",
      image: require("../assets/helpIcon.png"),
    },
    { id: "6", title: "About", image: require("../assets/aboutIcon.png") },
  ];
  const sendInitialMessage = () => {
    console.log("Initial message sent!");
  };
  // Opens modal or navigates directly to the appropriate screen
  //Creates the little screen that opens when clicking on a setting
  const openModal = (setting) => {
    setSelectedSetting(setting);

    if (setting.title === "Appearance") {
      // Open modal for Appearance screen
      setIsModalVisible(true);
      setIsChatOpen(false); // Ensure chat is closed for Appearance
    } else if (setting.title === "Help and Support") {
      // Navigate to the Help and Support screen and open chat
      setIsChatOpen(true);
      //navigation.navigate("HandSScreen");
      sendInitialMessage(); // Optionally, send a greeting message when chat opens
      setIsModalVisible(false);
    } else {
      setIsModalVisible(true);
      setIsChatOpen(false); // Ensure chat is closed for other settings
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedSetting(null);
  };

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Styling based on the current theme
  const backgroundColor = theme === "light" ? "#98A869" : "#333";
  const textColor = theme === "light" ? "#000" : "#fff";

  // Show FlatList on the screen
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => openModal(item)}
      style={settingsStyles.link}
    >
      <Image source={item.image} style={settingsStyles.image} />
      <Text style={settingsStyles.text}>{item.title}</Text>
    </TouchableOpacity>
  );

  // Formatting and layout of FlatList
  return (
    <SafeAreaView style={[styles.welcomeBackground, { backgroundColor }]}>
      <Text
        style={[styles.headerText, { alignSelf: "center", color: textColor }]}
      >
        SETTINGS
      </Text>
      <View
        style={[styles.pageContentContainer, { height: "50%", marginTop: 20 }]}
      >
        <FlatList
          data={settingsCategories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <TabNavigation navigation={navigation} />
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <SafeAreaView style={settingsStyles.modalContainer}>
          <Text style={settingsStyles.modalHeaderText}>
            {selectedSetting?.title}
          </Text>
          {selectedSetting?.title === "Appearance" && (
            <AppearanceScreen
              toggleTheme={toggleTheme}
              theme={theme} // Pass the current theme state to AppearanceScreen
              closeModal={closeModal} // Allow the modal to be closed from AppearanceScreen
            />
          )}
          <TouchableOpacity
            onPress={closeModal}
            style={{
              padding: 10,
              backgroundColor: "#E7C6CD",
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 16, color: "#000" }}>Close</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const settingsStyles = StyleSheet.create({
  welcomeBackground: {
    backgroundColor: "#98A869",
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#E7C6CD",
    borderRadius: 5,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalHeaderText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
