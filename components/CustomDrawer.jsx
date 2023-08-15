import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { auth, db } from "../database/firebase";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Alert } from "react-native";
const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      const userId = auth.currentUser.uid; // Get the user ID from the currently authenticated user object
      db.collection("users")
        .doc(userId) // Provide the user ID as the document ID
        .get()
        .then((doc) => {
          if (doc.exists) {
            setDisplayName(doc.data().displayName);
          } else {
            console.log("User not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
        console.log("User signed out Successfully!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const signOutConfirmBtn = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to Sign Out?",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Yes", onPress: () => signOut() },
      ],
      { cancelable: false }
    );
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
          <Image
            source={require("../assets/images/user-profile.jpg")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text style={{ color: "#fff", fontSize: 18 }}>{displayName}</Text>
          <View style={{ flexDirection: "row" }}>
            {/* <Text style={{ color: "#fff", fontSize: 14, marginRight: 5 }}>
              10 Coins
            </Text>
            <FontAwesome5 name="coins" size={15} color="#fff" /> */}
          </View>
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
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={signOutConfirmBtn}
          style={{ paddingVertical: 15 }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
