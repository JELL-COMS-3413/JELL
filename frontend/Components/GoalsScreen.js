import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import TabNavigation from "./TabNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { profileImages } from "./ProfileScreen";
import styles from "./styles/styles";
import { ipAddress } from "./styles/styles";
import AddBudgetItemModal from "./AddBudgetItemModal";

export default function GoalsScreen({ navigation }) {
  const [goal, setGoal] = useState([]);
  const [name, setName] = useState([]);
  const [current, setCurrent] = useState([]);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch('http://${ipAddress}:5000/goals/', {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Failed to fetch goal items"
        );
      }

      const budgetItems = await response.json();
      const formattedItems = budgetItems.map((item) => ({
        ...item,
        value: Number(item.value) || 0,
      }));
      setData(formattedItems);  
    } catch (error) {
      console.error("Error fetching goal items:", error);
      setError(error.message);
    } finally {
      setLoaded(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleEditPress = useCallback((goalItem) => {
    setSelectedItem(goalItem);
    setIseditModalVisible(true);
  }, []);

  const handleDeletePress = useCallback(async (budgetItemId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://${ipAddress}:5000/goals/${goalItemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to delete item");
      }
      setData((prevData) =>
        prevData.filter((item) => item.id !== goalItemId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
      alert(error.message);
    }
  });

  const addGoalItem = useCallback(async (newGaolItem) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://${ipAddress}:5000/goals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newGaolItem),
      });
      
      if(!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Failed to add item to goal"
        );
      }

      const savedGaolItem = await response.json();
      setData((prevData) => [savedGaolItem, ...prevData]);
    } catch (error) {
      console.error("Error adding item to goal:", error);
      alert(error.message);
    }
  }, []);

  const saveEditedItem = useCallback(async (updatedItem) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://${ipAddress}:5000/goals/${updatedItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to update item goal");
      }

      const savedItem = await response.json();
      setData((prevData) =>
        prevData.map((item) => (item._id === savedItem._id ? savedItem : item))
      );
    } catch (error) {
      console.error("Error updating item:", error);
      alert(error.message);
    }
  });



return (
    <SafeAreaView style={styles.background}>
      <View style={styles.greenPageSection}>
        <View style={styles.itemList}>
        <FlatList
                data={data}
                keyExtractor={(goalItem) => goalItem._id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.value}>
                      {`$ ${parseFloat(item.value).toFixed(2)}` || "$0.00" }
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
      </View>
       <TabNavigation navigation={navigation} /> 
    </SafeAreaView>

);

}


