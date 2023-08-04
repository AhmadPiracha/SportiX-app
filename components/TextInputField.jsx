import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TextInputField = ({
  label,
  icon,
  inputType,
  keyboardType,
  forgetButton,
  forgetButtonFunction,
  value,
  OnChangeText,
}) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "#AD40AF",
          borderBottomWidth: 1,
          paddingBottom: 8,
          marginBottom: 25,
        }}
      >
        {icon}
        {inputType === "password" ? (
          <TextInput
            style={{ flex: 1, paddingVertical: 0 }}
            placeholder={label}
            keyboardType={keyboardType}
            value={value}
            onChangeText={OnChangeText}
            secureTextEntry={true}
          />
        ) : (
          <TextInput
            style={{ flex: 1, paddingVertical: 0 }}
            placeholder={label}
            keyboardType={keyboardType}
            value={value}
            onChangeText={OnChangeText}
          />
        )}
      </View>

      <TouchableOpacity onPress={forgetButtonFunction} style={{ padding: 5 }}>
        <Text
          style={{
            color: "#AD40AF",
            fontWeight: 700,
            alignSelf: "flex-end",
          }}
        >
          {forgetButton}
        </Text>
      </TouchableOpacity>
    </>
  );
};
export default TextInputField;
