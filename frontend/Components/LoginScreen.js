import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  TextInput,
  Button,
  View,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";
import { ipAddress } from "./ip";

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

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

  return (
    <SafeAreaView style={loginStyles.background}>
      <View>
        <Text style={styles.header}>{isLogin ? "Login" : "Sign Up"}</Text>

        {!isLogin && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter first name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter last name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
          </>
        )}

        <TextInput
          style={loginStyles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        <View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title={isLogin ? "Login" : "Sign Up"}
                onPress={handlePress}
              />
            </View>
            <View style={styles.button}>
              <Button
                title={isLogin ? "Switch to Sign Up" : "Switch to Login"}
                onPress={() => setIsLogin(!isLogin)}
              />
            </View>
          </View>
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

const loginStyles = StyleSheet.create({
  background: {
    backgroundColor: "#C1BC6B",
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
  },
});
