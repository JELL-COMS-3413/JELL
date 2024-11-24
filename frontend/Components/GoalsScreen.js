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
import { ipAddress } from "./ip";
import AddGoalItemModal from "./AddGoalItemModal";
import EditGoalItemModal from "./EditGoalItemModal";
import loadFonts from "./styles/fonts";
import * as Progress from "react-native-progress";

export default function GoalsScreen({ navigation }) {
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState("default");
  const [fontsLoaded, setFontsLoaded] = useState(true);
  const [isEditModalVisible, setisEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  //progress bar calculations
  const totalAccumulated = data.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0),
    0
  );
  const totalGoal = data.reduce(
    (sum, item) => sum + parseFloat(item.goal || 0),
    0
  );
  const progress =
    totalGoal > 0 ? Math.min(totalAccumulated / totalGoal, 1) : 0;

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://${ipAddress}:5000/goals/`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to fetch goal items");
      }

      const goalItems = await response.json();
      const formattedItems = goalItems.map((item) => ({
        ...item,
        value: Number(item.value) || 0,
      }));
      setData(formattedItems);
    } catch (error) {
      console.error("Error fetching goal items:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleEditPress = useCallback((goalItem) => {
    setSelectedItem(goalItem);
    setisEditModalVisible(true);
  }, []);

  const handleDeletePress = useCallback(async (goalItemId) => {
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
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Delete request failed:", response.status, errorResponse);
        throw new Error(errorResponse.message || "Failed to delete item");
      }
      setData((prevData) => prevData.filter((item) => item._id !== goalItemId));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert(error.message);
    }
  });

  const addGoalItem = useCallback(async (newGoalItem) => {
    try {
      // needed to use this when i was having issues i am scared to delete it
      if (!newGoalItem.title || !newGoalItem.amount || !newGoalItem.goal) {
        alert("Please provide all fields for the goal item.");
        return;
      }

      const token = await AsyncStorage.getItem("token");
      const response = await fetch(`http://${ipAddress}:5000/goals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newGoalItem),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to add item to goal");
      }

      const savedGoalItem = await response.json();
      setData((prevData) => [savedGoalItem, ...prevData]);
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

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const loadedProfile = await AsyncStorage.getItem("profile");
        setProfile(loadedProfile || "default"); // Set a default profile if none exists
      } catch (error) {
        console.error("Error getting profile:", error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchItems = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`http://${ipAddress}:5000/goals/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            errorResponse.message || "Failed to fetch goal items"
          );
        }

        const goalItems = await response.json();
        setData(goalItems);
      } catch (error) {
        console.error("Error fetching goal items:", error);
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

  const navigateToBudgetOverviewScreen = () => {
    navigation.navigate("BudgetOverviewScreen");
  };

  const navigateToProfileScreen = () => {
    navigation.navigate("ProfileScreen");
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
              marginTop: 70,
            }}
          >
            {loading ? (
              <></>
            ) : (
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
            )}
            <View>
              <Text style={styles.ProgressText}>
                <Text style={styles.total}>{`$${totalAccumulated.toFixed(
                  2
                )}\n`}</Text>
                <Text style={styles.savings}>{`of $${totalGoal.toFixed(
                  2
                )} total savings `}</Text>
              </Text>
              <Progress.Bar //needed to make style changes here
                progress={progress}
                width={300}
                height={30}
                color="#98A869"
                unfilledColor="#e0e0df"
                borderRadius={15}
                borderWidth={3}
                borderColor="#98A869"
                style={{
                  alignSelf: "center",
                  marginTop: 20,
                }}
              />
            </View>
          </View>
          <View
            style={[
              styles.header,
              { marginBottom: -20, position: "relative", zIndex: 10 },
            ]}
          >
            <TouchableOpacity
              style={{ marginLeft: 30, borderRadius: 20, padding: 10 }}
              onPress={navigateToBudgetOverviewScreen}
            >
              <Text style={styles.headerText}>OVERVIEW</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginRight: 30,
                backgroundColor: "#ccc",
                borderRadius: 20,
                padding: 10,
              }}
            >
              <Text style={styles.headerText}>GOALS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.greenPageSection}>
            <View style={styles.pageContentContainer}>
              <View style={styles.headerRow}>
                <Text style={styles.headerBudgetText}>Name</Text>
                <Text style={styles.headerBudgetText}>Current</Text>
                <Text style={styles.headerBudgetText}>Goal</Text>
              </View>
              <FlatList
                data={data}
                keyExtractor={(goalItem) => goalItem._id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.listItem}>
                    <Text style={styles.goalItem}>{item.title}</Text>
                    <Text style={styles.goalItem}>
                      {`$ ${parseFloat(item.amount || 0).toFixed(2)}`}
                    </Text>
                    <Text style={styles.goal}>
                      {`$ ${parseFloat(item.goal).toFixed(2)}` || "$0.00"}
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
              <AddGoalItemModal onAddItem={addGoalItem} />
            </View>
            <EditGoalItemModal
              item={selectedItem}
              isVisible={isEditModalVisible}
              onClose={() => setisEditModalVisible(false)}
              onSave={saveEditedItem}
            />
          </View>
        </>
      )}
      <TabNavigation navigation={navigation} />
    </SafeAreaView>
  );
}
