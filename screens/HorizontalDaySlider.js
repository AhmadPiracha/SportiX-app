import { View } from "react-native";
import React, { useState } from "react";
import moment from "moment";

import HorizontalDaySliderCard from "../components/HorizontalDaySliderCard";

const HorizontalDaySlider = () => {
  const [selectedDate, setSelectedDate] = useState(
    moment().format("MM/DD/YYYY")
  );

  const onDateChange = (newDate) => {
    setSelectedDate(newDate);
  };
  return (
    <View
      style={{
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        borderTopColor: "#fff",
        borderTopWidth: 1,
      }}
    >
      <HorizontalDaySliderCard
        date={selectedDate}
        onDateChange={onDateChange}
      />
    </View>
  );
};

export default HorizontalDaySlider;
