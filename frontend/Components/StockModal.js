import React, { useState, useEffect, useCallback } from "react";
import { Modal, Text, TextInput, View, TouchableOpacity } from "react-native";
import { ninjaAPIkey } from "./apikeys";
import styles from "./styles/styles";

export default function StockModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [type, setType] = useState("stock");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState({});

  // for handling selection of gold, stock, or crypto to search
  const handleSelect = (selectedType) => {
    setType(selectedType);
    setResult({});
    setLoaded(false);
  };

  // for handling press of get price button
  const handlePress = () => {
    if (type === "gold") {
      getGoldPrice();
    } else {
      if (symbol.trim()) {
        if (type === "stock") {
          getStockPrice(symbol.trim());
        } else if (type === "crypto") {
          getCryptoPrice(symbol.trim());
        }
      } else {
        alert("Please fill out all fields");
      }
    }
  };

  const getStockPrice = useCallback(async (ticker) => {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/stockprice?ticker=${ticker}`,
        {
          method: "GET",
          headers: { "X-Api-Key": ninjaAPIkey },
          contentType: "application/json",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching stock price for ${ticker}: ${response.statusText}`
        );
      }

      const result = await response.json(); // Parse the JSON data from the response
      setResult(result); // Store the result in state
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message); // Set the error state if something goes wrong
    } finally {
      setLoaded(true); // Set loading to false once data has been loaded or error occurs
    }
  }, []);
  const getCryptoPrice = useCallback(async (symbol) => {
    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/cryptoprice?symbol=${symbol}
`,
        {
          method: "GET",
          headers: { "X-Api-Key": ninjaAPIkey },
          contentType: "application/json",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Error fetching stock price for ${symbol}: ${response.statusText}`
        );
      }

      const result = await response.json(); // Parse the JSON data from the response
      setResult(result); // Store the result in state
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message); // Set the error state if something goes wrong
    } finally {
      setLoaded(true); // Set loading to false once data has been loaded or error occurs
    }
  }, []);
  const getGoldPrice = useCallback(async () => {
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/goldprice`, {
        method: "GET",
        headers: { "X-Api-Key": ninjaAPIkey },
        contentType: "application/json",
      });

      if (!response.ok) {
        throw new Error(`Error fetching gold price: ${response.statusText}`);
      }

      const result = await response.json(); // Parse the JSON data from the response
      setResult(result); // Store the result in state
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message); // Set the error state if something goes wrong
    } finally {
      setLoaded(true); // Set loading to false once data has been loaded or error occurs
    }
  }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.toggleButton, styles.successButton, { marginTop: 0 }]}
      >
        <Text style={styles.buttonText}> Look up stock price </Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { height: "40%" }]}>
            <Text style={styles.modalTitle}>Look up Stock Price</Text>
            <Text
              style={{
                fontFamily: "coolveticarg",
                fontSize: 24,
              }}
            >
              Select Stock, Crypto, or Gold
            </Text>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <TouchableOpacity
                onPress={() => handleSelect("stock")}
                style={{
                  borderRadius: 20,
                  padding: 10,
                  backgroundColor: type == "stock" ? "#89A869" : "#ccc",
                  margin: 10,
                }}
              >
                <Text style={{ fontFamily: "LouisGeorgeCafe", fontSize: 18 }}>
                  Stock
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("crypto")}
                style={{
                  borderRadius: 20,
                  padding: 10,
                  backgroundColor: type == "crypto" ? "#89A869" : "#ccc",
                  margin: 10,
                }}
              >
                <Text style={{ fontFamily: "LouisGeorgeCafe", fontSize: 18 }}>
                  Crypto
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSelect("gold")}
                style={{
                  borderRadius: 20,
                  padding: 10,
                  backgroundColor: type == "gold" ? "#89A869" : "#ccc",
                  margin: 10,
                }}
              >
                <Text style={{ fontFamily: "LouisGeorgeCafe", fontSize: 18 }}>
                  Gold
                </Text>
              </TouchableOpacity>
            </View>
            {type === "crypto" || type === "stock" ? (
              <TextInput
                style={styles.input}
                placeholder="Enter stock ticker or crypto symbol"
                value={symbol}
                onChangeText={(text) => setSymbol(text)}
              />
            ) : (
              <></>
            )}
            {loaded ? (
              <View style={{ alignItems: "flex-start" }}>
                {type === "gold" ? (
                  <Text
                    style={{
                      fontFamily: "coolveticarg",
                      fontSize: 22,
                      alignSelf: "center",
                    }}
                  >
                    Gold
                  </Text>
                ) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontFamily: "coolveticarg",
                        fontSize: 22,
                        marginRight: 10,
                      }}
                    >
                      {type === "stock" ? "Ticker:" : "Symbol:"}
                    </Text>
                    <Text
                      style={{ fontFamily: "LouisGeorgeCafe", fontSize: 20 }}
                    >
                      {type === "stock"
                        ? `${result.ticker}`
                        : `${result.symbol}`}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "coolveticarg",
                      fontSize: 20,
                      marginRight: 10,
                    }}
                  >
                    Price:
                  </Text>
                  <Text style={{ fontFamily: "LouisGeorgeCafe", fontSize: 20 }}>
                    {result.price}
                  </Text>
                </View>
                <Text>{error}</Text>
              </View>
            ) : (
              <></>
            )}
            <View
              style={[
                styles.buttonContainer,
                { width: "50%", alignSelf: "flex-end" },
              ]}
            >
              <TouchableOpacity
                style={[styles.button, styles.successButton]}
                onPress={handlePress}
              >
                <Text style={styles.buttonText}>Get Price</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
