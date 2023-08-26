import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { auth, db } from '../database/firebase';

const ViewYourBookingsScreen = ({ navigation }) => {
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

  const handleViewEquipmentBookings = () => {
    navigation.navigate('ViewEquipmentBookings', { userRollNo: userRollNo });
  };

  const handleViewVenueBookings = () => {
    navigation.navigate('ViewVenueBookings', { userRollNo: userRollNo });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleViewEquipmentBookings}
        activeOpacity={0.7} // Opacity when touched
      >
        <Text style={styles.buttonText}>View Equipment Bookings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleViewVenueBookings}
        activeOpacity={0.7} // Opacity when touched
      >
        <Text style={styles.buttonText}>View Venue Bookings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d1b2a',
  },
  button: {
    backgroundColor: '#3282b8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ViewYourBookingsScreen;
