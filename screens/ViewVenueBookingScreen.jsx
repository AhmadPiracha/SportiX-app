import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const ViewVenueBookingScreen = ({ route }) => {
  const { userRollNo } = route.params;

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://192.168.10.2:5001/viewVenueBookings?userRollNo=${userRollNo}`);
        const bookingData = response.data;
        setBookings(bookingData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, [userRollNo]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Your Sports Venue Bookings</Text>
      {bookings.map((booking, index) => (
        <View key={index} style={styles.bookingItem}>
          <View style={styles.cardContainer}>
            <Text style={styles.bookingInfo}>Name: {booking.displayName}</Text>
            <Text style={styles.bookingInfo}>Roll No: {booking.userRollNo}</Text>
            <Text style={styles.bookingInfo}>Ground Name: {booking.name}</Text>
            <Text style={styles.bookingInfo}>Location: {booking.location}</Text>
            <Text style={styles.bookingInfo}>Time Slot: {booking.timeSlotDuration}</Text>
            <Text style={styles.bookingInfo}>Status: {booking.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#0d1b2a",
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#fff",
    marginBottom: 20, 
    marginTop: 40,
    textAlign: 'center',
  },
  bookingItem: {
    backgroundColor: "transparent",
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: "#283442",
    padding: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bookingInfo: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
});

export default ViewVenueBookingScreen;
