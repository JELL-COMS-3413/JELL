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
import AddBudgetItemModal from "./AddBudgetItemModal";
import EditBudgetItemModal from "./EditBudgetItemModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles/styles";
import defaultProfileIcon from "../assets/defaultProfileIcon.png";

export default function BudgetOverviewScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("http://10.200.37.109:5000/budget/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          errorResponse.message || "Failed to fetch budget items"
        );
      }

      const budgetItems = await response.json();
      // Ensure 'value' fields are numbers
      const formattedItems = budgetItems.map((item) => ({
        ...item,
        value: Number(item.value) || 0,
      }));
      setData(formattedItems);
    } catch (error) {
      console.error("Error fetching budget items:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleEditPress = useCallback((budgetItem) => {
    setSelectedItem(budgetItem);
    setIsEditModalVisible(true);
  }, []);

  const handleDeletePress = useCallback(async (budgetItemId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
<<<<<<< Updated upstream
        `http://192.168.1.101:5000/budget/${budgetItemId}`,
=======
        `http://10.200.37.109:5000/budget/${budgetItemId}`,
>>>>>>> Stashed changes
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
        throw new Error(errorResponse.message || "Failed to delete item");
      }
      setData((prevData) =>
        prevData.filter((item) => item._id !== budgetItemId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
      alert(error.message);
    }
  }, []);

<<<<<<< Updated upstream
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const navigateToProfileScreen = () => {
=======
  const navigateToProfileScreen = useCallback(() => {
>>>>>>> Stashed changes
    navigation.navigate("ProfileScreen");
  }, [navigation]);

  const addBudgetItem = useCallback(async (newBudgetItem) => {
    try {
      const token = await AsyncStorage.getItem("token");
<<<<<<< Updated upstream
      const response = await fetch("http://192.168.1.101:5000/budget/", {
=======
      const response = await fetch("http://10.200.37.109:5000/budget/", {
>>>>>>> Stashed changes
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBudgetItem),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
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
  }, []);

  const saveEditedItem = useCallback(async (updatedItem) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
<<<<<<< Updated upstream
        `http://192.168.1.101:5000/budget/${updatedItem._id}`,
=======
        `http://10.200.37.109:5000/budget/${updatedItem._id}`,
>>>>>>> Stashed changes
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
        throw new Error(errorResponse.message || "Failed to update item");
      }

      const savedItem = await response.json();
      setData((prevData) =>
        prevData.map((item) => (item._id === savedItem._id ? savedItem : item))
      );
    } catch (error) {
      console.error("Error updating item:", error);
      alert(error.message);
    }
<<<<<<< Updated upstream
  };

  // Fetch items from the backend when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch("http://192.168.1.101:5000/budget/", {
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
=======
>>>>>>> Stashed changes
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.buttonContainer}>
<<<<<<< Updated upstream
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
=======
        <TouchableOpacity onPress={navigateToProfileScreen}>
          <Image style={styles.profileIcon} source={defaultProfileIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>OVERVIEW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}>GOALS</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          {data.length > 0 ? (
            <BudgetPieChart data={data} />
          ) : (
            <Text>No budget data to display</Text>
          )}
          <View style={styles.greenPageSection}>
            <View style={styles.itemList}>
              <FlatList
                data={data}
                keyExtractor={(budgetItem) => budgetItem._id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.value}>
                      {`$ ${item.value.toFixed(2)}`}
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
>>>>>>> Stashed changes
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
        </>
      )}
      <Pressable title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  );
}

BudgetOverviewScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
