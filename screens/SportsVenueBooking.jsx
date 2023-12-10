
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { auth, db } from "../database/firebase";
import { timeSlots } from '../model/matchesData';
import { Ionicons } from "@expo/vector-icons";
import { windowWidth,windowHeight } from '../utils/dimensions';
const SportsVenueBookingScreen = ({navigation}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [sportGrounds, setSportGrounds] = useState([]);
  const [sportGround, setSportGround] = useState(sportGround || 'Select Sport Ground');
  const [sportVenue, setSportVenue] = useState(sportVenue || 'Select Sport Venue');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [bookingData, setBookingData] = useState({
    name: '',
    type: '',
    location: '',
    userEmail: '',
    displayName: '',
    timeSlotDuration: '',
    booking_date: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const doc = await db.collection("users").doc(auth.currentUser.uid).get();
        if (doc.exists) {
          const userData = doc.data();
          // console.log("User Data:", JSON.stringify(userData, null, 2));
          setUserEmail(userData.email);
          setDisplayName(userData.displayName);

        }
      }
      catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.10.6:5001/getVenue");
        if (response?.data) {
          setSportGrounds(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (sportGround !== 'Select Sport Ground') {
      const selectedGround = sportGrounds.find(item => item.name === sportGround);
      if (selectedGround) {
        setSportVenue(selectedGround.location);
      }
    }
  }, [sportGround, sportGrounds]);

  const handleBooking = () => {
    if (!selectedTimeSlot) {
      Alert.alert("Time Slot Required", "Please select a time slot for booking.");
      return;
    }
  
    if (sportGround === 'Select Sport Ground' || sportVenue === 'Select Sport Venue') {
      Alert.alert("Venue Selection Required", "Please select a Sport Ground and Venue for booking.");
      return;
    }
  
    const sportType = sportGround.toLowerCase().split(' ')[0];
    const capitalizedType = sportType.charAt(0).toUpperCase() + sportType.slice(1);
    const userRollNo = userEmail.match(/([a-z]\d+)/i)[0];
  
    // Combine the selectedDate and selectedTime to create a new Date
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());
    const formattedBookingDate = selectedDateTime.toISOString().slice(0, 19).replace('T', ' ');

    const bookingInfo = {
      name: sportGround,
      type: capitalizedType,
      location: sportVenue,
      userRollNo,
      displayName,
      timeSlotDuration: selectedTimeSlot.duration,
      booking_date: formattedBookingDate,
    };
  
    Alert.alert(
      "Booking Details",
      "Name: " + displayName + "\n" +
      "Sport Ground: " + sportGround + "\n" +
      "Sport Venue: " + sportVenue + "\n" +
      "Time Slot: " + selectedTimeSlot.duration + "\n" +
      "Date: " + selectedDate.toDateString() + "\n" +
      "Time: " + selectedTime.toLocaleTimeString(),
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Book Now", onPress: async () => {
            try {
              const response = await axios.post(
                'http://192.168.10.6:5001/venue_booking',
                bookingInfo
              );
              console.log('Booking response:', response.data);

            } catch (error) {
              console.error('Error booking:', error);
            }


            Alert.alert(
              "Successful",
              "Your booking request is Forwarded to Sports Officer.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    setSportGround(null);
                    setSportVenue(null)
                    setSelectedTimeSlot(null);
                    setSelectedDate(new Date());
                    setSelectedTime(new Date());
                  },
                  style: "cancel"
                },
              ]
            );
          }
        }
      ]
    );

  };

  const handleDateChange = (event, selected) => {
    const currentDate = selected || selectedDate;
    setShowDatePicker(false);

    // Get the current date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to 00:00:00

    if (currentDate >= today) {
      setSelectedDate(currentDate);
    } else {
      Alert.alert("Invalid Date", "Please select a date for future bookings.", [
        {
          text: "OK",
          onPress: () => {
            setSportGround(null);
            setSportVenue(null)
            setSelectedTimeSlot(null);
            setSelectedDate(new Date());
            setSelectedTime(new Date());
          },
          style: "cancel"
        }
      ]);
    }
  };

  const handleTimeChange = (event, selected) => {
  const currentTime = selected || selectedTime;
  if (event.type === "set") {
    const newSelectedTime = new Date(selectedDate);
    newSelectedTime.setHours(currentTime.getHours());
    newSelectedTime.setMinutes(currentTime.getMinutes());
    setSelectedTime(newSelectedTime);
  }
  setShowTimePicker(false);
};

  const clearSelections = () => {
    setSelectedTimeSlot(null);
  };

  const onPressBack = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerOne}>
        <Ionicons
          onPress={onPressBack}
          name="arrow-back-outline"
          size={20}
          color="#fff"
          style={styles.containerBtn}
        />
        <View style={styles.headerGameContainer}>
          <Text style={styles.headerGameTxt}>Sports Venue Booking</Text>
        </View>
      </View>
      <View style={styles.mainContainer} >
        <View style={styles.timeSlotContainer}>
          <Text style={styles.timeSlotHeading}>Time Slots</Text>
          {timeSlots.map((timeSlot) => (
            <TouchableOpacity
              key={timeSlot.id}
              style={[
                styles.timeSlotButton,
                selectedTimeSlot && selectedTimeSlot.id === timeSlot.id && styles.selectedTimeSlotButton,
              ]}
              onPress={() => setSelectedTimeSlot(timeSlot)}
            >
              <Text
                style={[
                  styles.timeSlotText,
                  selectedTimeSlot && selectedTimeSlot.id === timeSlot.id && styles.selectedTimeSlotText,
                ]}
              >
                {timeSlot.duration}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={sportGround}
            onValueChange={itemValue => setSportGround(itemValue)}
          >
            {sportGrounds.map((item, index) => {
              return (
                <Picker.Item key={index} label={item.name} value={item.name} />
              );
            })}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={sportVenue}
            onValueChange={itemValue => setSportVenue(itemValue)}
          >
            {sportGrounds.map((item, index) => {
              return (
                <Picker.Item key={index} label={item.location} value={item.location} />
              );
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
        <TouchableOpacity
          onPress={handleBooking}
          style={styles.bookButton}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>

        {selectedTimeSlot ? (
          <TouchableOpacity onPress={clearSelections} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Selections</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#0d1b2a",
  },
  containerOne: {
    padding: windowWidth * 0.02,
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
  timeSlotHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    marginLeft: 10,
  },


  timeSlotButton: {
    flexDirection: 'row',
    backgroundColor: '#0077b6',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },

  selectedTimeSlotButton: {
    backgroundColor: '#004466',
  },

  timeSlotText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  selectedTimeSlotText: {
    color: '#fff',
  },

  clearButton: {
    backgroundColor: '#b30000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  disabledButton: {
    backgroundColor: 'gray',
  },
  containerBtn: {
    marginTop: windowWidth * 0.03,
    marginLeft: windowWidth * 0.02,
  },
  headerGameContainer: {
    flexDirection: "row",
    marginHorizontal: windowWidth * 0.02,
    marginVertical: windowWidth * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
  headerGameTxt: {
    fontSize: windowWidth * 0.05,
    fontWeight: "600",
    color: "#fff",
    
  
  },
});

export default SportsVenueBookingScreen;

