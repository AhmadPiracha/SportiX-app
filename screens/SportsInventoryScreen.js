import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { Button } from "react-native-elements";
import CustomButton from "../components/CustomButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SportsInventoryScreen = ({ navigation }) => {
  const onPressBack = () => {
    navigation.navigate("Home");
  };

  const handleEquipmentBooking = () => {
    navigation.navigate("EquipmentBooking");
  };

  const handleVenueBooking = () => {
    navigation.navigate("SportsVenueBooking");
  };

  return (
    <>
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
            <Text style={styles.headerGameTxt}>
              Sports Equipment and Venue Booking
            </Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Image
              style={{
                width: 500,
                height: 300,
              }}
              source={require("../assets/images/loginpageImg.png")}
            />
          </View>
        </View>
        <View style={styles.containerTwo}>
          <View>
            <CustomButton
              label="Sports Equipment Booking"
              onPress={handleEquipmentBooking}
            />
          </View>

          <View>
            <CustomButton
              label="Sports Venue Booking"
              onPress={handleVenueBooking}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    width: windowWidth,
    height: windowHeight,
  },

  containerOne: {
    padding: 10,
  },
  containerTwo: {
    padding: 10,
    marginTop: 20,
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    justifyContent: "center",
    alignItems: "center",
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
});

export default SportsInventoryScreen;
