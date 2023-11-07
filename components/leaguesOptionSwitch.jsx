import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function LeaguesOptionSwitch({
  selectionMode,
  Option1,
  Option2,
  Option3,
  Option4,
  onSelectSwitch,
}) {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View style={styles.container}>
      {/* 1ST BUTTON */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={[
          styles.button,
          {
            backgroundColor:
              getSelectionMode === 1 ? "#0d1b2a" : "transparent",
            borderBottomWidth: getSelectionMode === 1 ? 2 : 0, // Add underline when selected
          },
        ]}
      >
        <Text
          style={[
            styles.optionText,
            {
              color: getSelectionMode === 1 ? "#fff" : "#000",
              fontWeight: "bold", // Make text bold
            },
          ]}
        >
          {Option1}
        </Text>
      </TouchableOpacity>

      {/* 2ND BUTTON */}
      <TouchableOpacity
        activeOpacity={2}
        onPress={() => updateSwitchData(2)}
        style={[
          styles.button,
          {
            backgroundColor:
              getSelectionMode === 2 ? "#0d1b2a" : "transparent",
            borderBottomWidth: getSelectionMode === 2 ? 2 : 0,
          },
        ]}
      >
        <Text
          style={[
            styles.optionText,
            {
              color: getSelectionMode === 2 ? "#fff" : "#000",
              fontWeight: "bold",
            },
          ]}
        >
          {Option2}
        </Text>
      </TouchableOpacity>

      {/* 3RD BUTTON */}
      <TouchableOpacity
        activeOpacity={3}
        onPress={() => updateSwitchData(3)}
        style={[
          styles.button,
          {
            backgroundColor:
              getSelectionMode === 3 ? "#0d1b2a" : "transparent",
            borderBottomWidth: getSelectionMode === 3 ? 2 : 0,
          },
        ]}
      >
        <Text
          style={[
            styles.optionText,
            {
              color: getSelectionMode === 3 ? "#fff" : "#000",
              fontWeight: "bold",
            },
          ]}
        >
          {Option3}
        </Text>
      </TouchableOpacity>

      {/* 4TH BUTTON */}
      {/* <TouchableOpacity
        activeOpacity={4}
        onPress={() => updateSwitchData(4)}
        style={[
          styles.button,
          {
            backgroundColor:
              getSelectionMode === 4 ? "#0d1b2a" : "transparent",
            borderBottomWidth: getSelectionMode === 4 ? 2 : 0,
          },
        ]}
      >
        <Text
          style={[
            styles.optionText,
            {
              color: getSelectionMode === 4 ? "#fff" : "#000",
              fontWeight: "bold",
            },
          ]}
        >
          {Option4}
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#0d1b2a",
    borderRadius: 3,
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 14,
    textDecorationLine: "none",
  },
});
