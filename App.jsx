import React, { useState, useEffect } from "react";
import { auth } from "./database/firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
import MatchTeamCard from "./screens/MatchTeamCard";
import MatchDetails from "./screens/MatchDetails";
// Sports Type Options Screens
import Cricket from "./screens/SportsTypeOptions/Cricket";
import Badminton from "./screens/SportsTypeOptions/Badminton";
import Futsal from "./screens/SportsTypeOptions/Futsal";
import BasketBall from "./screens/SportsTypeOptions/BasketBall";
// Sports Inventory Screens
import EquipmentBooking from "./screens/EquipmentBookingScreen";
import SportsVenueBooking from "./screens/SportsVenueBooking";
import ItemDetailsScreen from "./screens/ItemDetailsScreen";
// Custom Drawer
import CustomDrawer from "./components/CustomDrawer";

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

    // Clean up the listener on unmount
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
            {/* Sports Equipment Booking Items Screen */}
            <Stack.Screen name="ItemDetails" component={ItemDetailsScreen} options={{ title: "Item Details" }}/>
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