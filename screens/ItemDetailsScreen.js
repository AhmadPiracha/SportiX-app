import React from "react";
import { SafeAreaView,View, Text, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";


import { Ionicons } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { Button } from "react-native-elements";
import CustomButton from "../components/CustomButton";

const ItemDetailsScreen = ({ route }) => {
  const { item } = route.params;

  const onPressBack = () => {
    navigation.navigate("Booking");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image source={item.image} style={styles.image} /> */}
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <MaterialIcons name="access-time" size={24} color="#777" />
            <Text style={styles.featureText}>
              Open Hours: 9:00 AM - 9:00 PM
            </Text>
          </View>
          {/* Add more feature items as needed */}
        </View>
        <View style={styles.bookNowButton}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  bookNowButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  bookNowText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ItemDetailsScreen;
