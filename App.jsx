import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth } from "./database/firebase";

// Screens
import HomeScreen from "./screens/HomeScreen";
import SportsSchedule from "./screens/SportsSchedule";
import CustomDrawer from "./components/CustomDrawer";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MatchTeamCard from "./screens/MatchTeamCard";
import ViewResultsScreen from "./screens/ViewResultsScreen.jsx";
import MatchDetails from "./screens/MatchDetails";
import EquipmentBooking from "./screens/EquipmentBookingScreen";
import SportsVenueBooking from "./screens/SportsVenueBooking";
import ItemDetailsScreen from "./screens/ItemDetailsScreen";

// Initialize navigators
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

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

      <Drawer.Screen
        name="Equipment Booking"
        component={EquipmentBooking}
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
      <Drawer.Screen
        name="Venue Booking"
        component={SportsVenueBooking}
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

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return null; // You can return a loading component here if needed
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="DrawerRoot" component={DrawerNavigator} />
            <Stack.Screen name="MatchTeamCard" component={MatchTeamCard} />
            <Stack.Screen name="MatchDetails" component={MatchDetails} />
            <Stack.Screen name="ViewResults" component={ViewResultsScreen} />
            <Stack.Screen
              name="ItemDetails"
              component={ItemDetailsScreen}
              options={{ title: "Item Details" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
