import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Import your screens
import LoginScreen from "./Components/LoginScreen";
import WelcomeScreen from "./Components/WelcomeScreen";
import ProfileScreen from "./Components/ProfileScreen";
import BudgetOverviewScreen from "./Components/BudgetOverviewScreen";
import CalculationScreen from "./Components/CalculationScreen";
import GoalsScreen from "./Components/GoalsScreen";
import InputExpensesScreen from "./Components/InputExpensesScreen";
import SettingScreen from "./Components/SettingScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Initialize as null

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error("Error fetching token:", error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    // Optional: Show a loading indicator while checking login status
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          // If logged in, show the Welcome screen
          <>
            <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }}>
              {(props) => (
                <WelcomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
            <Stack.Screen name="ProfileScreen" options={{ headerShown: false }}>
              {(props) => (
                <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="BudgetOverviewScreen"
              options={{ headerShown: false }}
            >
              {(props) => (
                <BudgetOverviewScreen
                  {...props}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
            </Stack.Screen>

            <Stack.Screen
              name="CalculationScreen"
              options={{ headerShown: false }}
            >
              {(props) => (
                <CalculationScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="InputExpensesScreen"
              options={{ headerShown: false }}
            >
              {(props) => (
                <InputExpensesScreen {...props} setIsLoggedIn={setIsLoggedIn} />

              )}
            </Stack.Screen>
            <Stack.Screen
              name="SettingScreen"
              options={{ headerShown: false }}
            >
              {(props) => (
                <SettingScreen {...props} setIsLoggedIn={setIsLoggedIn} />

              )}
            </Stack.Screen>
            <Stack.Screen
              name="GoalsScreen"
              options={{ headerShown: false }}
            >
              {(props) => (
                <GoalsScreen
                  {...props}
                  setIsLoggedIn={setIsLoggedIn}
                />
              )}
            </Stack.Screen>

          </>
        ) : (
          // Not logged in, show the Login screen
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
