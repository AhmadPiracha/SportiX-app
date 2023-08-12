import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
const DateTImePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

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
      <View style={styles.pickerContainer}>
        <View style={styles.mainContainer}>
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
        </View>
      </View>
    </View>
  )
}

export default DateTImePicker


const styles = StyleSheet.create({
  container: {
    padding: 20,

  },
  mainContainer: {
    width: '100%',
    maxWidth: 400,
  },

  pickerContainer: {
    width: '100%',   
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
});
