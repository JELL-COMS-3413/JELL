import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AddBudgetItemModal from "./AddBudgetItemModal";
import EditBudgetItemModal from "./EditBudgetItemModal";
import { profileImages } from "./ProfileScreen";
import BudgetPieChart from "./PieChart";
import TabNavigation from "./TabNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import loadFonts from "./styles/fonts";
import styles from "./styles/styles";
import { ipAddress } from "./ip";

export default function BudgetOverviewScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [profile, setProfile] = useState("default");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://${ipAddress}:5000/budget/`, {
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
        `http://${ipAddress}:5000/budget/${budgetItemId}`,
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
  });

  const navigateToProfileScreen = () => {
    navigation.navigate("ProfileScreen");
  };

  const addBudgetItem = useCallback(async (newBudgetItem) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://${ipAddress}:5000/budget/`, {
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
        `http://${ipAddress}:5000/budget/${updatedItem._id}`,
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
  });

  // Fetch items from the backend when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`http://${ipAddress}:5000/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          console.error("Server Error:", errorResponse);
          throw new Error(errorResponse.message || "Failed to fetch profile");
        } else {
          const loadedProfile = await response.json();
          console.log("loadedProfile: ", loadedProfile);
          setProfile(loadedProfile.profile);
          console.log("profile: ", profile);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchItems = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`http://${ipAddress}:5000/budget/`, {
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
    fetchProfile();
    fetchItems();
  }, []);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  const navigateToGoalsScreen = () => {
    navigation.navigate("GoalsScreen");
  };

  return (
    <SafeAreaView style={styles.background}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginRight: 90,
            }}
          >
            <TouchableOpacity
              title="Your Profile"
              onPress={navigateToProfileScreen}
              style={{ alignSelf: "flex-start" }}
            >
              <Image
                source={profileImages[profile]}
                style={styles.profileIcon}
              />
            </TouchableOpacity>
            {data.length > 0 ? (
              <BudgetPieChart data={data} />
            ) : (
              <Text>No budget data to display</Text>
            )}
          </View>
          <View
            style={[
              styles.header,
              { marginBottom: -20, position: "relative", zIndex: 10 },
            ]}
          >
            <TouchableOpacity
              style={{
                marginRight: 30,
                backgroundColor: "#ccc",
                borderRadius: 20,
                padding: 10,
              }}
            >
              <Text style={styles.headerText}>OVERVIEW</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 30, borderRadius: 20, padding: 10 }}
              onPress={navigateToGoalsScreen}
            >
              <Text style={styles.headerText}>GOALS</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.greenPageSection, { position: "relative" }]}>
            <View style={[styles.pageContentContainer, { marginTop: 30 }]}>
              <ScrollView>
              <View style={styles.headerRow}>
                <Text style={styles.headerBudgetText}>Name</Text>
                <Text style={styles.headerBudgetText}>Budget</Text>
              </View>
              <FlatList
                data={data}
                keyExtractor={(budgetItem) => budgetItem._id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.listItem}>
                    <Text style={styles.budgetItem}>{item.title}</Text>
                    <Text style={styles.value}>
                      {`$ ${parseFloat(item.value).toFixed(2)}` || "$0.00"}
                    </Text>
                    <View>
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
              </ScrollView>
              <AddBudgetItemModal onAddItem={addBudgetItem} />
            </View>
            <EditBudgetItemModal
              item={selectedItem}
              isVisible={isEditModalVisible}
              onClose={() => setIsEditModalVisible(false)}
              onSave={saveEditedItem}
            />
            <TabNavigation navigation={navigation} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
