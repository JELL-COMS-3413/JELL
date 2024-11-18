
import React, { useEffect } from "react";

import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { Text as SvgText } from "react-native-svg";
import loadFonts from "./styles/fonts";

// Helper function to calculate percentage
const calculatePercentage = (value, total) => {
  return ((parseFloat(value) / total) * 100).toFixed(1);
};

export default function BudgetPieChart({ data }) {
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
      arc: { outerRadius: "100%", cornerRadius: 10 },
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
          fontFamily={"LouisGeorgeCafe"}
        >
          {`${data.label} (${data.percentage}%)`}{" "}
        </SvgText>
      );
    });
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
          marginTop: 10,
        }}
        data={pieData}
      >
        <Labels />
      </PieChart>
    </View>
  );
}

BudgetPieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};
