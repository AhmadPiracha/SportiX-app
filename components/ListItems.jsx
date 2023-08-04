import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { windowWidth } from "../utils/dimensions";
// import { useNavigation } from "@react-navigation/native";

export default function ListItems({
  photo,
  title,
  subTitle,
  isFree,
  itemPrice,
  onPress,
}) {
  // const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image
          source={photo}
          style={{ width: 50, height: 50, borderRadius: 10, marginRight: 10 }}
        />
        <View style={{ width: windowWidth - 220 }}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#333" }}>
            {title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 12,
              color: "#C6C6C6",
              textTransform: "uppercase",
            }}
          >
            {subTitle}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          backgroundColor: "#AD40AF",
          padding: 10,
          width: 100,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 12, textAlign: "center" }}>
          {isFree === "Yes" && "Play"}
          {isFree === "No" && itemPrice}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
