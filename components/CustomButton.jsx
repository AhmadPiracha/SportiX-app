import { Text, TouchableOpacity } from "react-native";
import React from "react";
export default function CustomButton({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#AD40AF",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
      }}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
