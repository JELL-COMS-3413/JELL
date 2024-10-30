import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import styles from "./styles/styles";

export default function TabNavigation(navigation) {
  const navigateToHomeScreen = () => {
    navigation.navigate("BudgetOverviewScreen");
  };
  return (
    <View style={navStyles.navContainer}>
      <TouchableOpacity
        onPress={navigateToHomeScreen}
        style={navStyles.navButton}
      >
        <Image source={require("../assets/homeIcon.png")}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToHomeScreen}
        style={navStyles.navButton}
      >
        <Image source={require("../assets/calculatorIcon.png")}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToHomeScreen}
        style={navStyles.navButton}
      >
        <Image source={require("../assets/addIcon.png")}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToHomeScreen}
        style={navStyles.navButton}
      >
        <Image source={require("../assets/settingsIcon.png")}></Image>
      </TouchableOpacity>
    </View>
  );
}

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
