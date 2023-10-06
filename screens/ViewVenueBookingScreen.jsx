import React, { useState, useEffect } from 'react';
import VenueBookingCard from '../components/VenueBookingCard';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { auth, db } from '../database/firebase';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ViewVenueBookingScreen = () => {
  const navigation = useNavigation();

  const [bookings, setBookings] = useState([]);

  const [userEmail, setUserEmail] = useState('');
  const [userRollNo, setUserRollNo] = useState(null);

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

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://192.168.10.5:5001/viewVenueBookings?userRollNo=${userRollNo}`);
        const bookingData = response.data;
        setBookings(bookingData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [userRollNo]);

  const onPressBack = () => {
    navigation.navigate('View your Bookings');
  };

  return (
    <View style={styles.container}>
      {/* <Ionicons onPress={onPressBack} name="arrow-back-outline" size={20} color="#fff" style={styles.containerBtn} />

      <Text style={styles.header}>Your Sports Venue Bookings</Text> */}
      {/* Use flex: 1 on the surrounding View */}
      <View style={{ flex: 1 }}>
        {/* Set a specific height or use flex for ScrollView */}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {bookings.map((booking, index) => (
            <VenueBookingCard key={index} booking={booking} />
          ))}
        </ScrollView>
      </View>
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
  },
});

export default ViewVenueBookingScreen;
