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
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import TabNavigation from "./TabNavigation";
import styles from "./styles/styles";

export default function SettingScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const navigation1 = useNavigation();

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
    { id: "1", 
      title: "Account", 
      image: require("../assets/accountIcon.png") 
    },
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

  const openModal = (setting) => {
    setSelectedSetting(setting);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedSetting(null);
  };

//Shows our flatlist on the screen
const renderItem = ({ item }) => ( 
  <TouchableOpacity 
    onPress={() => openModal(item)} 
    style={settingsStyles.link} 
  > 
    <Image source={item.image} style={settingsStyles.image} /> 
    <Text style={settingsStyles.text}>{item.title}</Text> 
  </TouchableOpacity> 
);

  //Formatting and layout of flatlist.
  return (
    <SafeAreaView style={styles.welcomeBackground}>
      <Text style={[settingsStyles.headerText, { alignSelf: "center" }]}>
        SETTINGS
      </Text>
      <View style={styles.pageContentContainer}>
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
            <Text style={settingsStyles.modalHeaderText}>
              This is the content for {selectedSetting?.title}
            </Text>
            <Button title="Back" onPress={closeModal}/>
          </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}


//Extra Styling
const settingsStyles = StyleSheet.create({
  welcomeBackground: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#f0f0f0",
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
  modalContentText: { 
    fontSize: 16, 
    marginBottom: 20, 
    textAlign: "center",
  },
});
