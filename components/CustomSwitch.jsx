import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
export default function CustomSwitch({
  selectionMode,
  Option1,
  Option2,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };
  return (
    <View
      style={{
        height: 44,
        width: "100%",
        backgroundColor: "#e4e4e4",
        borderRadius: 10,
        borderColor: "#0d1b2a",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {/* 1ST BUTTON */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode === 1 ? "#0d1b2a" : "#e4e4e4",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: getSelectionMode === 1 ? "#fff" : "#0d1b2a",
            fontSize: 14,
            // fontFamily: "Roboto-Medium",
          }}
        >
          {Option1}
        </Text>
      </TouchableOpacity>

      {/* 2ND BUTTON */}
      <TouchableOpacity
        activeOpacity={2}
        onPress={() => updateSwitchData(2)}
        style={{
          flex: 1,
          backgroundColor: getSelectionMode === 2 ? "#0d1b2a" : "#e4e4e4",
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: getSelectionMode === 2 ? "#fff" : "#0d1b2a",
            fontSize: 14,
            // fontFamily: "Roboto-Medium",
          }}
        >
          {Option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
