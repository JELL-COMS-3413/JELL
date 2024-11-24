import React, { useState } from "react";
import { BsFillChatFill } from "react-icons/bs";
import { useNavigation } from "@react-navigation/native";

const HandSScreen = () => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState(""); // State to store the chat message
  const navigation = useNavigation();

  const sendMessage = () => {
    setMessage(`
    Hello, you have reached the help and support. Unfortunately, we did not have enough time to add everything we wanted.
    If you have any questions, feel free to reach out to any of us at our emails down below.
    Laura: lpaul2@atu.edu
    Lisset: lluna1@atu.edu
    Janniebeth: jmelendez2@atu.edu
    Evelin: ecerrospatricio@atu.edu
    Thank you!
  `);
    setVisible(true); // Show the modal
  };

  const goBack = () => {
    navigation.goBack(); // Navigate back to the previous page
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button onClick={goBack} style={styles.backButton}>
        Back
      </button>

      {/* Chat Button Component */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={sendMessage} // Trigger sendMessage on click
        style={{
          ...styles.chatWidget,
          border: hovered ? "1px solid black" : "",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BsFillChatFill size={16} color="white" /> {/* Smaller icon */}
          <span style={styles.chatWidgetText}>Chat Now!!</span>
        </div>
      </div>

      {/* Modal */}
      {visible && (
        <div style={styles.modalWindow}>
          <span>{message}</span> {/* Display the message */}
          <button onClick={() => setVisible(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#98A869", // Background color
    padding: "20px",
    height: "100vh", // Full height for the background color
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  backButton: {
    marginBottom: "20px", // Add space
    padding: "10px 20px",
    backgroundColor: "#E7C6CD", // Button color
    color: "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  chatWidget: {
    backgroundColor: "#007BFF",
    padding: "8px 16px", // Smaller padding
    borderRadius: "20px", // Rounded corners
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  chatWidgetText: {
    color: "white",
    marginLeft: "8px",
  },
  modalWindow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#E7C6CD", // Inside text box color
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
};

export default HandSScreen;
