import React, { useState, useEffect } from 'react';
import VenueBookingCard from '../components/VenueBookingCard';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import axios from 'axios';
import { auth, db } from '../database/firebase';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ViewVenueBookingScreen = () => {
  const navigation = useNavigation();

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [userRollNo, setUserRollNo] = useState(null);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchBookings();
    } finally {
      setRefreshing(false);
    }
  };
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const doc = await db.collection("users").doc(auth.currentUser.uid).get();
        if (doc.exists) {
          const userData = doc.data();
          setUserEmail(userData.email);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    if (userEmail) {
      const rollNoMatch = userEmail.match(/([a-z]\d+)/i);
      if (rollNoMatch) {
        setUserRollNo(rollNoMatch[0]);
      }
    }
  }, [userEmail]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(`http://192.168.10.5:5001/viewVenueBookings?userRollNo=${userRollNo}`);
      const bookingData = response.data;
      setBookings(bookingData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  


  useEffect(() => {
    fetchBookings();
  }, [userRollNo]);


  const onPressBack = () => {
    navigation.navigate('View your Bookings');
  };

  return (
    <View style={styles.container}>
          {refreshing ? <ActivityIndicator /> : null}

      {/* <Ionicons onPress={onPressBack} name="arrow-back-outline" size={20} color="#fff" style={styles.containerBtn} /> */}

      {isLoading ? (
        <ActivityIndicator size="large" color="#00B4D8" />
      ) : error ? (
        <Text style={styles.errorText}>Error: Unable to fetch data</Text>
      ) : (
        <View style={{ flex: 1 }}>
          {bookings.length === 0 ? (
            <Text style={styles.noBookingsText}>No equipment bookings found.</Text>
          ) : (
            
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {bookings.map((booking, index) => (
                <VenueBookingCard key={index} booking={booking} />
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#0d1b2a",
    flexGrow: 1,
  },
  containerBtn: {
    marginTop: 20,
    marginLeft: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#fff",
    marginBottom: 20,
    marginTop: 40,
    textAlign: 'center',
  }, errorText: {
    fontSize: 16,
    color: "red",
    textAlign: 'center',
  },
  noBookingsText: {
    fontSize: 16,
    color: "#fff",
    textAlign: 'center',
  },
});

export default ViewVenueBookingScreen;
