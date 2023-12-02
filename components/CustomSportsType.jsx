import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../utils/dimensions";
import axios from "axios";

const CustomSportsType = () => {
  const navigation = useNavigation();
  const [sportsType, setSportsType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.10.8:5001/getSportsType");
        if (response?.data) {
          // console.log("Data fetched successfully:", JSON.stringify(response.data, null, 2));
          setSportsType(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onPressBack = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.containerOne}>
          <Ionicons
            onPress={onPressBack}
            name="arrow-back-outline"
            size={20}
            color="#fff"
            style={styles.containerBtn}
          />
          <View style={styles.headerGameContainer}>
            <Text style={styles.headerGameTxt}>Sports Equipment Booking</Text>
          </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.containerTwo}>
          {sportsType.map((item) => (
            <TouchableOpacity
              key={item.type}
              onPress={() => navigation.navigate("ItemDetails", { type: item.type })}
            >
              <View style={styles.containerItemBtn}>
                <Text style={styles.itemTitle}>{item.type}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    paddingTop: 30,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    width: windowWidth,
    height: windowHeight,
    padding: windowWidth * 0.04,
  },
  containerOne: {
    backgroundColor: "#0d1b2a",
    padding: windowWidth * 0.02,
  },
  containerTwo: {
    backgroundColor: "#0d1b2a",
    padding: windowWidth * 0.02,
    marginTop: windowWidth * 0.02,
    marginLeft: windowWidth * 0.02,
  },
  containerBtn: {
    marginTop: windowWidth * 0.03,
    marginLeft: windowWidth * 0.02,
  },
  headerGameContainer: {
    flexDirection: "row",
    marginHorizontal: windowWidth * 0.02,
    marginVertical: windowWidth * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
  headerGameTxt: {
    fontSize: windowWidth * 0.05,
    fontWeight: "600",
    color: "#fff",
    
  
  },
  containerItemBtn: {
    backgroundColor: "#283442",
    padding: windowWidth * 0.04,
    borderRadius: 8,
    marginBottom: windowWidth * 0.03,
  },
  itemTitle: {
    fontSize: windowWidth * 0.04,
    fontWeight: "500",
    color: "#fff",
    
  },
});

export default CustomSportsType;
