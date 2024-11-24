import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  View,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";
import { ipAddress } from "./ip";
import loadFonts from "./styles/fonts";

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const handlePress = async () => {
    if (isLogin) {
      if (email === "" || password === "") {
        setMessage("Please fill out all fields.");
        return;
      }
    } else {
      if (
        email === "" ||
        password === "" ||
        firstName === "" ||
        lastName === ""
      ) {
        setMessage("Please fill out all fields.");
        return;
      }
    }

    const url = isLogin
      ? `http://${ipAddress}:5000/users/login`
      : `http://${ipAddress}:5000/users/register/`;

    const body = isLogin
      ? { username: email, password }
      : {
          username: email,
          password,
          firstname: firstName,
          lastname: lastName,
        };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (response.ok) {
        if (isLogin) {
          setMessage("Login successful");
          if (result.token) {
            // Save token and update login state
            console.log("Received token:", result.token);
            await AsyncStorage.setItem("token", result.token);
            await AsyncStorage.setItem("username", result.username);
            const storedToken = await AsyncStorage.getItem("token");
            const storedUsername = await AsyncStorage.getItem("username");
            console.log("Stored token:", storedToken);
            console.log("Stored username:", storedUsername);
            setIsLoggedIn(true);
            navigation.reset({
              index: 0,
              routes: [{ name: "Welcome" }],
            });
          }
        } else {
          setMessage("Registration successful. Please log in.");
          setIsLogin(true); // Switch to login view
        }
      } else {
        setMessage(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error connecting to the server.");
    }
  };

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  return (
    <SafeAreaView style={loginStyles.background}>
      <View style={[styles.pageContentContainer, { height: "20%" }]}>
        <Text style={styles.headerText}>{isLogin ? "Login" : "Sign Up"}</Text>

        {!isLogin && (
          <>
            <TextInput
              style={[styles.input, { fontFamily: "LouisGeorgeCafe" }]}
              placeholder="Enter first name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={[styles.input, { fontFamily: "LouisGeorgeCafe" }]}
              placeholder="Enter last name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </>
        )}

        <TextInput
          style={[loginStyles.input, { fontFamily: "LouisGeorgeCafe" }]}
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={[loginStyles.input, { fontFamily: "LouisGeorgeCafe" }]}
          placeholder="Enter password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>

      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          width: "60%",
        }}
      >
        <View
          style={{
            borderRadius: 20,
            backgroundColor: "#E7C6CD",
            borderWidth: 2,
            padding: 8,
            margin: 5,
          }}
        >
          <Pressable onPress={handlePress}>
            <Text
              style={{
                fontFamily: "coolveticarg",
                alignSelf: "center",
                fontSize: 24,
                textTransform: "uppercase",
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            borderRadius: 20,
            backgroundColor: "#E7C6CD",
            borderWidth: 2,
            padding: 8,
            margin: 5,
          }}
        >
          <Pressable onPress={() => setIsLogin(!isLogin)}>
            <Text
              style={{
                fontFamily: "coolveticarg",
                alignSelf: "center",
                fontSize: 24,
                textTransform: "uppercase",
              }}
            >
              {isLogin ? "Switch to Sign Up" : "Switch to Login"}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const loginStyles = StyleSheet.create({
  background: {
    backgroundColor: "#98A869",
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    backgroundColor: "white",
    fontSize: 20,
  },
});
