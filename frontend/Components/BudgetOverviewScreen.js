import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import AddBudgetItemModal from "./AddBudgetItemModal";
import EditBudgetItemModal from "./EditBudgetItemModal";

import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";

export default function BudgetOverviewScreen({ navigation, setIsLoggedIn }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const handleEditPress = (budgetItem) => {
    setSelectedItem(budgetItem);
    setIsEditModalVisible(true);
  };

  const handleDeletePress = async (budgetItemId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://10.200.20.0:5000/budget/${budgetItemId}`,
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
        console.error("Server Error:", errorResponse);
        throw new Error(errorResponse.message || "Failed to delete item");
      }

      // Remove the deleted item from the data array
      setData((prevData) =>
        prevData.filter((item) => item._id !== budgetItemId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
      alert(error.message);
    }
  };

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

  // Function to add item to the backend
  const addBudgetItem = async (newBudgetItem) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://10.200.20.0:5000/budget/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBudgetItem),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server Error:", errorResponse);
        throw new Error(
          errorResponse.message || "Failed to add item to budget"
        );
      }

      const savedBudgetItem = await response.json();
      setData((prevData) => [savedBudgetItem, ...prevData]);
    } catch (error) {
      console.error("Error adding item to budget:", error);
      alert(error.message);
    }
  };

  // Function to handle saving the edited item
  const saveEditedItem = async (updatedItem) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://10.200.20.0:5000/budget/${updatedItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: updatedItem.title,
            value: updatedItem.value,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server Error:", errorResponse);
        throw new Error(errorResponse.message || "Failed to update item");
      }

      const savedItem = await response.json();

      // Update the item in the data array
      setData((prevData) =>
        prevData.map((item) => (item._id === savedItem._id ? savedItem : item))
      );
    } catch (error) {
      console.error("Error updating item:", error);
      alert(error.message);
    }
  };

  // Fetch items from the backend when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("http://10.200.20.0:5000/budget/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Server Error:", errorResponse);
          throw new Error(
            errorResponse.message || "Failed to fetch budget items"
          );
        }

        const budgetItems = await response.json();
        setData(budgetItems);
      } catch (error) {
        console.error("Error fetching budget items:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          title="Your Profile"
          onPress={navigateToProfileScreen}
        >
          <Image
            style={styles.profileIcon}
            source={require("../assets/profileIcon.png")}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>Budget Overview</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : data.length ? (
        <View style={styles.pageContentContainer}>
          <View style={styles.itemList}>
            <FlatList
              data={data}
              keyExtractor={(budgetItem) => budgetItem._id.toString()}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.value}>
                    {`$ ${item.value}` || "$0.00"}
                  </Text>
                  <View style={styles.itemActions}>
                    <TouchableOpacity onPress={() => handleEditPress(item)}>
                      <Text style={styles.actionText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDeletePress(item._id)}
                    >
                      <Text style={styles.actionText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
          <AddBudgetItemModal onAddItem={addBudgetItem} />
          <EditBudgetItemModal
            item={selectedItem}
            isVisible={isEditModalVisible}
            onClose={() => setIsEditModalVisible(false)}
            onSave={saveEditedItem}
          />
        </View>
      ) : (
        <View>
          <Text>No budget items, press '+' to add items</Text>
          <AddBudgetItemModal onAddItem={addBudgetItem} />
        </View>
      )}
      <Pressable title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}
