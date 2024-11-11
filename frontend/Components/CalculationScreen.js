import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";
import TabNavigation from "./TabNavigation";

const loanCalc = [
  {id: '1', title: 'Amortized Loan'},
  {id: '2', title: 'Deferred Payment Loan'},
  {id: '3', title: 'Bond'},
  {id: '4', title: 'Mortgage'},
  {id: '5', title: 'Auto Loan'},
  {id: '6', title: 'Student Loan'},
  {id: '7', title: 'Mortgage Payoff'},
];

const saveCalc = [
  {id: '1', title: 'Savings'},
  {id: '2', title: 'Simple Interest'},
  {id: '3', title: 'Compound Interest'},
  {id: '4', title: 'Certificate of Deposit'},
  {id: '5', title: 'IRAs'},
  {id: '6', title: '401K'},
  {id: '7', title: 'Social Security'},
];

export default function CalculationScreen({ navigation, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [isLoanCalculator, setIsLoanCalculator] = useState(true);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const navigateToProfileScreen = () => {
    navigation.navigate("ProfileScreen");
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

  const toggleScreen = () => {
    setIsLoanCalculator(!isLoanCalculator);
  };

  const renderItem = ({ item }) => ( 
  <View style={styles.item}> 
    <Text style={styles.title}>{item.title}</Text> 
  </View> 
  );

  return (
    <SafeAreaView style={styles.welcomeBackground}>
      <Text style={styles.headerText}>{isLoanCalculator ? "Loan Calculations" : "Savings Calculations"}</Text>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleScreen}>
        <Text style={styles.buttonText}>{isLoanCalculator ? "Calculate Savings" : "Calculate Loans"}</Text>
      </TouchableOpacity>
      {isLoanCalculator ? (
          <FlatList data={loanCalc} 
          renderItem={renderItem} 
          keyExtractor={item => item.id} 
          />
      ) : (
          <FlatList data={saveCalc} 
          renderItem={renderItem} 
          keyExtractor={item => item.id} 
          />        
      )}
      

      <TabNavigation navigation={navigation} />
    </SafeAreaView>
  );
}

const additionalStyles = StyleSheet.create({
  toggleButton: {
    borderRadius: 20,
    backgroundColor: "white",
    width: "40%",
    alignSelf: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  item: { 
    backgroundColor: '#f7f7e4', 
    padding: 10, 
    marginVertical: 6, 
    marginHorizontal: 10, 
  }, 
  title: { 
    fontSize: 29,
  },
});

Object.assign(styles, additionalStyles);
