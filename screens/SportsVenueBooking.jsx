
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Grounds } from "../model/matchesData";

const SportsVenueBookingScreen = () => {
  const [sportType, setSportType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleBooking = () => {
    console.log('Booking details:', sportType, selectedDate, selectedTime);
    Alert.alert(
      "Booking Details",
      "Sport Ground: " + sportType + "\n" +
      "Date: " + selectedDate.toDateString() + "\n" +
      "Time: " + selectedTime.toLocaleTimeString(),
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Book Now", onPress: () => {
          // Show success alert
          Alert.alert(
            "Booking Successful",
            "Your booking has been confirmed.",
            [
              {
                text: "OK",
                onPress: () => {
                  // Reset all data to default values
                  setSportType('');
                  setSelectedDate(new Date());
                  setSelectedTime(new Date());
                },
                style: "cancel"
              },
            ]
          );
        } }
      ]
    );

  };

  const handleDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const handleTimeChange = (event, selected) => {
    const currentTime = selected || selectedTime;
    setShowTimePicker(false);
    setSelectedTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Sports Venue Booking</Text>
      </View>


      <View style={styles.mainContainer} >
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={sportType}
            onValueChange={itemValue => setSportType(itemValue)}
          >
            {Grounds.map((item, index) => {
              return (
                <Picker.Item key={index} label={item.name} value={item.name} />

              )
            })}

          </Picker>
        </View>

        <Text style={styles.label}>Select Date:</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.label}>{selectedDate.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            onChange={handleDateChange}
          />
        )}
        <Text style={styles.label}>Select Time:</Text>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.label}>{selectedTime.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            onChange={handleTimeChange}
          />
        )}
        <TouchableOpacity onPress={handleBooking} style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#0d1b2a",
  },
  mainContainer: {
    width: '100%',
    maxWidth: 400,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#fff",
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,

    color: "#fff",
  },
  picker: {
    width: '100%',
    color: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fff",
  },
  datePicker: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    color: "#fff",
  },
  bookButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SportsVenueBookingScreen;

