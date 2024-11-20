import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from "react-native";
import homeIcon from "../assets/homeIcon.png";
import styles from "./styles/styles";

export default function TabNavigation({ navigation }) {
  const navigateToHomeScreen = () => {
    navigation.navigate("BudgetOverviewScreen");
  };
  const navigateToCalculationScreen = () => {
    navigation.navigate("CalculationScreen");
  };
  const navigateToInputExpensesScreen = () => {
    navigation.navigate("InputExpensesScreen");
  };
  const navigateToSettingScreen = () => {
    navigation.navigate("SettingScreen");
  };

  return (
    <View style={navStyles.navContainer}>
      <TouchableOpacity
        onPress={navigateToHomeScreen}
        style={navStyles.navButton}
      >
        <Image source={homeIcon}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToCalculationScreen}
        style={navStyles.navButton}
      >
        <Image source={require("../assets/calculatorIcon.png")}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={navigateToInputExpensesScreen}
        style={navStyles.navButton}
      >
        <Image source={require("../assets/addIcon.png")}></Image>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={navigateToSettingScreen}
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
    position: "absolute",
    bottom: 20,
  },
  navIcon: {
    height: 50,
    width: 50,
  },
  navButton: {
    marginLeft: 20,
    marginRight: 20,
  },
});
