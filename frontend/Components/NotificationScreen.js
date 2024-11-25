import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

const Notification = ({ message, type, onClose }) => (
  <View style={[styles.notification, styles[type]]}>
    <Text style={styles.message}>{message}</Text>
    <TouchableOpacity onPress={onClose}>
      <Text style={styles.closeButton}>X</Text>
    </TouchableOpacity>
  </View>
);

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications([...notifications, { id, message, type }]);
    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      setNotifications((notifs) => notifs.filter((notif) => notif.id !== id));
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.success]}
        onPress={() =>
          addNotification("Don't Forget to use me to Calculate!", "success")
        }
      >
        <Text style={styles.buttonText}>Great</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.error]}
        onPress={() =>
          addNotification("You didn't reach the goal! :(", "error")
        }
      >
        <Text style={styles.buttonText}>Sad</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.closeToGoal]}
        onPress={() =>
          addNotification(
            "We are so close, don't forget to add to your savings",
            "closeToGoal"
          )
        }
      >
        <Text style={styles.buttonText}>Almost There</Text>
      </TouchableOpacity>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Notification
            message={item.message}
            type={item.type}
            onClose={() =>
              setNotifications((notifs) =>
                notifs.filter((notif) => notif.id !== item.id)
              )
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#98A869", // Background color
    padding: "20px",
    height: "100vh", // Full height for the background color
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    elevation: 2,
  },
  success: {
    backgroundColor: "#4caf50",
  },
  error: {
    backgroundColor: "#f44336",
  },
  closeToGoal: {
    backgroundColor: "#36A2EB",
  },
  message: {
    flex: 1,
    color: "black",
    fontSize: 16,
  },
  closeButton: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  backButton: {
    padding: 10,
    backgroundColor: "#E7C6CD",
    color: "black",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default NotificationScreen;
