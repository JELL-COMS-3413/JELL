import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PieChart } from "react-native-svg-charts";
import { G, Text as SvgText } from "react-native-svg";
import loadFonts from "./styles/fonts";
import { ipAddress } from "./ip";

// Helper function to calculate percentage
const calculatePercentage = (value, total) => {
  return ((parseFloat(value) / total) * 100).toFixed(1);
};

export default function BudgetPieChart({ data }) {
  // loading fonts
  const [fontsLoaded, setFontsLoaded] = useState(false);
  // modal for pop-up with overview of expenses
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState({});
  const [selectedSegmentId, setSelectedSegmentId] = useState("0");
  // storing expenses for modal pop-up
  const [expenses, setExpenses] = useState([]);
  // pie chart slice colors
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  useEffect(() => {
    if (selectedSegmentId !== "0") {
      getExpenses(selectedSegment.label);
    }
  }, [selectedSegmentId]); // Fetch expenses when selected segment changes

  const getExpenses = async (category) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `http://${ipAddress}:5000/expense/${category}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server Error:", errorResponse);
        throw new Error(errorResponse.message || "Failed to fetch expenses");
      }

      const expenseItems = await response.json();
      setExpenses(expenseItems);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      alert(error.message);
    }
  };

  // Calculate the total value for percentage calculation
  const totalValue = data.reduce(
    (acc, item) => acc + parseFloat(item.value),
    0
  );

  const pieData = data
    .map((item, index) => ({
      key: item._id,
      value: parseFloat(item.value),
      svg: { fill: colors[index % colors.length] },
      arc: {
        outerRadius: selectedSegmentId === item._id ? "110%" : "100%", // highlights the part
        cornerRadius: 10,
      },
      label: item.title,
      percentage: calculatePercentage(item.value, totalValue),
    }))
    .filter((item) => item.value > 0);

  const Labels = ({ slices }) => {
    return slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      return (
        <SvgText
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill="black"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={14}
          stroke="black"
          strokeWidth={0.2}
          fontFamily="LouisGeorgeCafe"
        >
          {`${data.percentage}%`}
        </SvgText>
      );
    });
  };

  const handleSegmentPress = (segment) => {
    setSelectedSegment(segment);
    setSelectedSegmentId(segment.key);
  };
  //reset back to size after the textbox is closed
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedSegmentId("0");
  };

  return (
    <View style={{ alignItems: "center" }}>
      <PieChart
        style={{
          height: 200,
          width: 320,
          paddingLeft: 40,
          paddingRight: 40,
          alignSelf: "center",
          marginTop: 5,
        }}
        data={pieData.map((segment) => ({
          ...segment,
          svg: {
            ...segment.svg,
            onPress: () => handleSegmentPress(segment),
          },
        }))}
      >
        <Labels />
      </PieChart>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedSegment ? (
              <>
                <Text>{`${selectedSegment.label}: ${selectedSegment.value}`}</Text>
                <FlatList
                  data={expenses}
                  keyExtractor={(budgetExpense) => budgetExpense._id.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.listItem}>
                      <Text style={styles.budgetItem}>{item.title}</Text>
                      <Text style={styles.value}>
                        {`$ ${parseFloat(item.value).toFixed(2)}` || "$0.00"}
                      </Text>
                    </View>
                  )}
                />
              </>
            ) : (
              <Text>No data selected</Text>
            )}
            <Button title="Close" onPress={() => handleCloseModal()} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

BudgetPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
});
