import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { ThemeProvider, useTheme } from "./Components/ThemeContext";

// Import your screens
import LoginScreen from "./Components/LoginScreen";
import WelcomeScreen from "./Components/WelcomeScreen";
import ProfileScreen from "./Components/ProfileScreen";
import BudgetOverviewScreen from "./Components/BudgetOverviewScreen";
import CalculationScreen from "./Components/CalculationScreen";
import GoalsScreen from "./Components/GoalsScreen";
import InputExpensesScreen from "./Components/InputExpensesScreen";
import SettingScreen from "./Components/SettingScreen";
import AppearanceScreen from "./Components/AppearanceScreen";
import HandSScreen from "./Components/HandSScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const { theme } = useTheme(); // Access theme from context

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setIsLoggedIn(!!token); // Check token presence to set login status
      } catch (error) {
        console.error("Error fetching token:", error);
        setIsLoggedIn(false); // Default to logged out state if error occurs
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Show loading until login state is checked
  }

  const themeColors =
    theme === "dark"
      ? { background: "#1c1c1c", text: "#fff" }
      : { background: "#fff", text: "#000" };

  const screenOptions = {
    headerStyle: {
      backgroundColor: themeColors.background,
    },
    headerTintColor: themeColors.text,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {isLoggedIn ? (
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
            <Stack.Screen name="SettingScreen" options={{ headerShown: false }}>
              {(props) => (
                <SettingScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
            <Stack.Screen name="GoalsScreen" options={{ headerShown: false }}>
              {(props) => (
                <GoalsScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="AppearanceScreen"
              options={{ headerShown: false }}
            >
              {(props) => (
                <AppearanceScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
            <Stack.Screen name="HandSScreen" options={{ headerShown: false }}>
              {(props) => (
                <HandSScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
          </>
        ) : (
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

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
