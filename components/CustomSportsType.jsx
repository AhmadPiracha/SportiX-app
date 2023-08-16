import React, { useState } from "react";
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
import { SportsType } from "../model/matchesData";

const CustomSportsType = ({title}) => {
    
  const onPressBack = () => {
    navigation.navigate("Home");
  };
const navigation = useNavigation();
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
          <Text style={styles.headerGameTxt}>{title}</Text>
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
                  <Text style={styles.itemTitle}>{item.title}</Text>
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
    backgroundColor: "#0d1b2a",
    paddingTop: 30,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    width: windowWidth,
    height: windowHeight,
  },
  containerOne: {
    backgroundColor: "#0d1b2a",
    padding: 10,
  },
  containerTwo: {
    backgroundColor: "#0d1b2a",
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
  },
  containerBtn: {
    marginTop: 40,  
    marginLeft: 10,
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
  containerItemBtn: {
    backgroundColor: "#283442",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
});

export default CustomSportsType;
