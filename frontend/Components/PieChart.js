import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { Text as SvgText } from "react-native-svg";

// Helper function to calculate percentage
const calculatePercentage = (value, total) => {
  return ((value / total) * 100).toFixed(1);
};

export default function BudgetPieChart({ data }) {
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  // Calculate the total value for percentage calculation
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  const pieData = data
    .map((item, index) => ({
      key: item._id,
      value: item.value,
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
        >
          {`${data.label} (${data.percentage}%)`}{" "}
        </SvgText>
      );
    });
  };

  return (
    <View style={{alignItems: "center", marginVertical: 20 }}>
      <PieChart style={{ height: 200, width: 200 }} data={pieData}>
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
