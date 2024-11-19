import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { PieChart } from "react-native-svg-charts";
import { G, Text as SvgText } from "react-native-svg";
import loadFonts from "./styles/fonts";

// Helper function to calculate percentage
const calculatePercentage = (value, total) => {
  return ((parseFloat(value) / total) * 100).toFixed(1);
};

export default function BudgetPieChart({ data }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedSegmentId, setSelectedSegmentId] = useState(null);
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

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
    setModalVisible(true);
  };
  /*//reset back to size after the textbox is closed
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedSegmentId(null);
  };
*/
  return (
    <View style={{ alignItems: "center" }}>
      <PieChart
        style={{
          height: 200,
          width: 320,
          paddingLeft: 40,
          paddingRight: 40,
          alignSelf: "center",
          marginTop: 10,
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
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedSegment ? (
              <Text>{`${selectedSegment.label}: ${selectedSegment.value}`}</Text>
            ) : (
              <Text>No data selected</Text>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
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
