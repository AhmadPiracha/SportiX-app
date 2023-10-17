import React, { useState, useEffect } from "react";
import { auth, db } from './database/firebase';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
// Icons
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens

// Authentication Screens
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
// HomeScreen
import HomeScreen from "./screens/HomeScreen";
// Sports Schedule Screens
import SportsSchedule from "./screens/SportsSchedule";
import MatchDetails from "./screens/MatchDetails";
import MatchTeamCard from "./screens/MatchTeamCard";
// Sports Type Options Screens
import Cricket from "./screens/SportsTypeOptions/Cricket";
import Badminton from "./screens/SportsTypeOptions/Badminton";
import Futsal from "./screens/SportsTypeOptions/Futsal";
import BasketBall from "./screens/SportsTypeOptions/BasketBall";
// Sports Inventory Screens
import EquipmentBooking from "./screens/EquipmentBookingScreen";
import SportsVenueBooking from "./screens/SportsVenueBooking";
import ItemDetailsScreen from "./screens/ItemDetailsScreen";
import ViewEquipmentBookingScreen from "./screens/ViewEquipmentBookingScreen";
import ViewVenueBookingScreen from "./screens/ViewVenueBookingScreen";
// Leagues Screens
import FASTLeagues from "./screens/FASTLeagues/FASTLeagues";
import FASTLeaguesMenu from "./screens/FASTLeaguesMenu";
import LeagueMatchCardDetails from "./screens/FASTLeagues/LeagueMatchCardDetails";

// Custom Drawer Components
import CustomDrawer from "./components/CustomDrawer";
import CustomNestedDrawer from "./components/CustomNestedDrawer";

// Initialize navigators
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const NestedDrawer = createDrawerNavigator();

// Custom Nested Booking Navigator

const NestedBookingMenu = () => {
  return (
    <NestedDrawer.Navigator
      drawerContent={(props) => <CustomNestedDrawer {...props} />}
    >
      <NestedDrawer.Screen
        name="View Equipment Bookings"
        component={ViewEquipmentBookingScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "ios-basketball" : "ios-basketball-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <NestedDrawer.Screen
        name="View Venue Bookings"
        component={ViewVenueBookingScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "ios-pin" : "ios-pin-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </NestedDrawer.Navigator>
  );
};

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
        name="Home"
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
        name="Schedule"
        component={SportsSchedule}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "hourglass" : "hourglass-outline"}
              size={size}
              color={focused ? "#00B4D8" : "#000"}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Equipment Booking"
        component={EquipmentBooking}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "baseball" : "baseball-outline"}
              size={size}
              color={focused ? "#00B4D8" : "#000"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Venue Booking"
        component={SportsVenueBooking}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "pin" : "pin-outline"}
              size={size}
              color={focused ? "#00B4D8" : "#000"}
            />
          ),
        }}
      />

      {/* Nested Navigator for View Your Bookings */}
      <Drawer.Screen
        name="View Your Bookings"
        component={NestedBookingMenu}
        options={{
          drawerLabel: "View Your Bookings",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={size}
              color={focused ? "#00B4D8" : "#000"}
            />
          ),
        }}
      />

      {/* Nested Navigator for Fast Leagues */}
      <Drawer.Screen
        name="Fast Leagues"
        component={FASTLeagues}
        options={{
          drawerLabel: "FAST NU Leagues",
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name={focused ? "basketball" : "basketball-outline"}
              size={size}
              color={focused ? "#00B4D8" : "#000"}
            />
          ),
        }}
      />

    </Drawer.Navigator>
  );
};


const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#00B4D8" />
      <Text>Loading...</Text>
    </View>
  );
};


const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="DrawerRoot" component={DrawerNavigator} />
            {/* Sports Schedule Screens */}
            <Stack.Screen name="Cricket" component={Cricket} />
            <Stack.Screen name="Badminton" component={Badminton} />
            <Stack.Screen name="Futsal" component={Futsal} />
            <Stack.Screen name="Basketball" component={BasketBall} />
            <Stack.Screen name="MatchTeamCard" component={MatchTeamCard} />
            <Stack.Screen name="MatchDetails" component={MatchDetails} />
            {/* Sports Equipment nd Venue Booking Items Screen */}
            <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: "Item Details" }} />
            {/* FAST Sports League */}
            <Stack.Screen name="FASTLeaguesMenu" component={FASTLeaguesMenu} />
            <Stack.Screen name="LeagueMatchCardDetails" component={LeagueMatchCardDetails} />
          </>
        ) : (
          <>
          {/* Auth Screens */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;