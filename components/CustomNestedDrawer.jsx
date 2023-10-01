import React from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

const CustomNestedDrawer = (props) => {
  const navigation = useNavigation();

  const handleBackToBookings = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#00B4D8" }}
      >
        <ImageBackground
          source={require("../assets/images/menu-bg.jpeg")}
          style={{ padding: 20 }}
        >
          <TouchableOpacity onPress={handleBackToBookings}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18 }}>
                View Your Bookings
              </Text>
            </View>
          </TouchableOpacity>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingTop: 20,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      {/* <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
      </View> */}
    </View>
  );
};

export default CustomNestedDrawer;
