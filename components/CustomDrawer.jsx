import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { auth, db } from "../database/firebase";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import CustomDrawerButton from "./CustomDrawerButton";
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
        
        <CustomDrawerButton title="Settings" logoName="settings-outline" handleButtonCLick={()=>{}} />
        <CustomDrawerButton title="Tell a Friend" logoName="share-social-outline" handleButtonCLick={()=>{}} />
        <CustomDrawerButton title="Sign Out" logoName="exit-outline" handleButtonCLick={signOutConfirmBtn} />
      </View>
    </View>
  );
};

export default CustomDrawer;
