import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import Carousel from "react-native-snap-carousel";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Ionicons } from "@expo/vector-icons";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const HorizontalDaySliderCard = ({ date, onDateChange }) => {
  // const [date, setDate] = useState(new Date());

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      const newDate = moment(selectedDate).format("MM/DD/YYYY");
      onDateChange(newDate);
      setDate(selectedDate);
    }
    setShowDatePicker(false);
  };

  const showPicker = () => {
    setShowDatePicker(true);
  };

  const onDayPress = (index) => {
    const newDate = moment(date, "MM/DD/YYYY").day(index).toDate();
    setActiveDayIndex(index);
    onDateChange(moment(newDate).format("MM/DD/YYYY"));
    setShowDatePicker(true);
  };

  const [activeDayIndex, setActiveDayIndex] = useState(
    daysOfWeek.indexOf(moment(date, "MM/DD/YYYY").format("ddd"))
  );

  const renderItem = ({ item, index }) => {
    const isActive = index === activeDayIndex;
    const currentDate = moment().format("MM/DD/YYYY");
    const isToday =
      currentDate ===
      moment(date, "MM/DD/YYYY").day(index).format("MM/DD/YYYY");
    return (
      <TouchableOpacity
        style={styles.dayContainer}
        onPress={() => onDayPress(index)}
      >
        <Text style={[styles.dayText, isActive && styles.activeDayText]}>
          {item}
        </Text>
        <Text style={[styles.dayNumber, isActive && styles.activeDayText]}>
          {moment(date, "MM/DD/YYYY").day(index).format("DD")}
        </Text>
        {isToday && <Text style={styles.todayText}>Today</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="#fff" />
      <Carousel
        data={daysOfWeek}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={60}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.6}
        firstItem={activeDayIndex}
      />
      <Ionicons
        name="calendar-sharp"
        size={24}
        color="#fff"
        onPress={showPicker}
      />

      {/* {showPicker && (
        <DateTimePicker
          value={moment(date, "MM/DD/YYYY").toDate()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          customStyles={{
            datePicker: {
              backgroundColor: "#fff",
            },
            datePickerText: {
              color: "#000",
              fontSize: 18,
            },
            datePickerButton: {
              backgroundColor: "#007BFF",
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            },
            datePickerButtonText: {
              color: "#fff",
              fontSize: 18,
            },
          }}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  dayContainer: {
    alignItems: "center",
  },
  dayText: {
    fontSize: 18,
    textAlign: "center",
    color: "#fff",
  },
  dayNumber: {
    fontSize: 24,
    textAlign: "center",
    color: "#fff",
  },
  activeDayText: {
    fontWeight: "bold",
  },
  todayText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  datePicker: {
    marginTop: 20,
    width: 50,
    borderRadius: 5,
    padding: 5,
  },
});

export default HorizontalDaySliderCard;
