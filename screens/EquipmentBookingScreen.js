import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../utils/dimensions";
import CustomButton from "../components/CustomButton";
import { SportsType } from "../model/matchesData";
const EquipmentBooking = ({ navigation }) => {
  const onPressBack = () => {
    navigation.navigate("Booking");
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
          {SportsType.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ItemDetails", { item })}
              >
                <View style={styles.containerItemBtn}>
                  <Text style={styles.headerGameTxt}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    width: windowWidth,
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  containerOne: {
    backgroundColor: "#0d1b2a",
    padding: 10,
  },
  containerTwo: {
    backgroundColor: "#0d1b2a",
    padding: 10,
    marginTop: 20,
  },

  headerGameContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerGameTxt: {
    fontSize: 25,
    fontWeight: "600",
    color: "#fff",
  },
  caretIcon: {
    marginTop: 6,
    marginLeft: 3,
  },
  containerBtn: {
    top: 20,
    zIndex: 1,
    padding: 5,
    margin: 5,
  },
  containerItemBtn: {
    flexDirection: "row",

    padding: 10,
    margin: 10,
    backgroundColor: "#00B4D8",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EquipmentBooking;
