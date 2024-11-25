import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import styles from "./styles/styles";
import { ipAddress } from "./ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SavedCalculations() {
  const [modalVisible, setModalVisible] = useState(false); // to control modal visibility on button press
  const [loaded, setLoaded] = useState(false); // to display calculations when loaded
  const [calculations, setCalculations] = useState([]); // to store user's calculations

  // function to retrieve user calculations on clicking view saved calculations
  const getCalculations = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://${ipAddress}:5000/calculation/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Failed to fetch calculations"
        );
      }

      const calculationData = await response.json();
      setCalculations(calculationData);
    } catch (error) {
      console.error("Error fetching calculations:", error);
      alert(error.message);
    } finally {
      setLoaded(true);
      setModalVisible(true);
    }
  }, []);

  // to delete saved calculation
  const handleDeletePress = useCallback(async (calculationID) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://${ipAddress}:5000/calculation/${calculationID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Failed to delete calculation"
        );
      }
      setCalculations((prevData) =>
        prevData.filter((item) => item._id !== calculationID)
      );
    } catch (error) {
      console.error("Error deleting calculation:", error);
      alert(error.message);
    }
  });

  const renderCalculation = ({ item }) => {
    return (
      <View
        style={{
          borderRadius: 20,
          backgroundColor: "white",
          padding: 5,
          marginBottom: 5,
          paddingLeft: 10,
        }}
      >
        <Text style={{ fontFamily: "coolveticarg", fontSize: 20 }}>
          {item.type}
        </Text>
        <Text
          style={{
            fontFamily: "LouisGeorgeCafe",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Inputs:
        </Text>
        <FlatList
          data={item.inputs}
          keyExtractor={(inputItem) => inputItem._id.toString()}
          renderItem={({ item: inputItem }) => (
            <View>
              <Text style={{ fontFamily: "LouisGeorgeCafe", fontSize: 17 }}>
                {inputItem.title} : {inputItem.value}
              </Text>
            </View>
          )}
        />
        <Text
          style={{
            fontFamily: "LouisGeorgeCafe",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          Results:
        </Text>
        <FlatList
          data={item.outputs}
          keyExtractor={(outputItem) => outputItem._id.toString()}
          renderItem={({ item: outputItem }) => (
            <View>
              <Text style={{ fontFamily: "LouisGeorgeCafe", fontSize: 17 }}>
                {outputItem.title} : {outputItem.value}
              </Text>
            </View>
          )}
        />
        <View style={{ justifyContent: "right", alignSelf: "flex-end" }}>
          <TouchableOpacity
            style={[styles.cancelButton, { borderRadius: 20, width: "30%" }]}
            onPress={() => handleDeletePress(item._id)}
          >
            <Text style={{ fontFamily: "coolveticarg", textAlign: "center" }}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => getCalculations()}
        style={[styles.toggleButton, styles.successButton, { width: "50%" }]}
      >
        <Text style={styles.buttonText}> View Saved Calculations </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { alignItems: "center" }]}>
            <Text style={styles.modalTitle}>Calculations</Text>
            {loaded ? (
              <View
                style={{
                  height: "80%",
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "black",
                  padding: 3,
                  backgroundColor: "#ccc",
                }}
              >
                {calculations.length > 0 ? (
                  <FlatList
                    data={calculations}
                    keyExtractor={(calculationItem) =>
                      calculationItem._id.toString()
                    }
                    renderItem={renderCalculation}
                  />
                ) : (
                  <Text>No Calculations Saved</Text>
                )}
              </View>
            ) : (
              <>
                <Text>Calculations loading...</Text>
              </>
            )}
            <View style={[{ alignSelf: "flex-end" }]}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton, { margin: 0 }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
