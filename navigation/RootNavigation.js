// Imports
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "../database/firebase";
import { TouchableOpacity, Text } from 'react-native';
// Screens
import HomeScreen from "../screens/HomeScreen";
import SportsSchedule from "../screens/SportsSchedule";
import CustomDrawer from "../components/CustomDrawer";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MatchTeamCard from "../screens/MatchTeamCard";
import ViewResultsScreen from "../screens/ViewResultsScreen";
import MatchDetails from "../screens/MatchDetails";
import { useNavigation } from "@react-navigation/native";
// Initialize navigators
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
// Sports Schedule Navigator
// const SportsScheduleNavigator = () => {
//   const navigation = useNavigation()

//   return (
//     <TouchableOpacity
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center"
//       }}
//       onPress={() => navigation.navigate('Register')}>
//       <Text>Click me</Text>
//     </TouchableOpacity>
//     // <SportsSchedule/>
//     // <Stack.Navigator screenOptions={{ headerShown: false }}>
//     // <Stack.Screen name="SportsSchedule" component={SportsSchedule} />
//     // <Stack.Screen
//     //     name="MatchTeamCard"
//     //     component={MatchTeamCard}
//     //   />
//     // </Stack.Navigator>
//   );
// };

// Custom Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerLabelStyle: { marginLeft: -25, fontSize: 15 },
        drawerActiveBackgroundColor: "#03045E",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#000",
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={focused ? "#00B4D8" : "#000"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Sports Schedule"
        component={SportsSchedule}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={focused ? "#00B4D8" : "#000"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={SignUpScreen} />
        <Stack.Screen name="DrawerRoot" component={DrawerNavigator} />
        <Stack.Screen name="SportsSchedule" component={SportsSchedule} />
        <Stack.Screen name="MatchTeamCard" component={MatchTeamCard} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation;
