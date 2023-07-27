import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { windowHeight, windowWidth } from "../utils/dimensions";
import { SportsType } from "../model/matchesData";
import HorizontalDaySlider from "./HorizontalDaySlider";
import MatchDetails from "./MatchDetails";

const SportsSchedule = ({navigation}) => {
  const [showList, setShowList] = useState(false);
  const [activeType, setActiveType] = useState("Cricket");

  const toggleList = () => {
    setShowList((prevShowList) => !prevShowList);
  };

  const renderListItem = ({ item }) => {
    const { logo, title } = item;

    const onPressListItem = () => {
      setActiveType(title);
      setShowList(false);
    };

    return (
      <TouchableOpacity onPress={onPressListItem} style={styles.gameItemList}>
        <View style={styles.gameItemContainer}>
          <Ionicons name={logo} size={24} color="#fff" />
          <Text style={styles.gameTitle}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onPressBack = () => {
    navigation.navigate("Home")
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.containerOne}>
            <Ionicons
              onPress={onPressBack}
              name="arrow-back-outline"
              size={20}
              color="#fff"
              style={styles.containerBtn}
            />
            <TouchableOpacity onPress={toggleList}>
              <View style={styles.headerGameContainer}>
                <Text style={styles.headerGameTxt}>{activeType}</Text>
                <Ionicons
                  style={styles.caretIcon}
                  name="caret-down-outline"
                  size={24}
                  color="#fff"
                />
              </View>
            </TouchableOpacity>

            {showList && (
              <View>
                <FlatList
                  data={SportsType}
                  renderItem={renderListItem}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}
          </View>

          <HorizontalDaySlider />

          <MatchDetails />
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    width: windowWidth,
    height: windowHeight,
  },
  containerOne: {
    backgroundColor: "#0d1b2a",
    padding: 10,
  },
  headerGameContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  headerGameTxt: {
    fontSize: 30,
    fontWeight: "600",
    color: "#fff",
  },
  caretIcon: {
    marginTop: 6,
    marginLeft: 3,
  },
  gameItemList: {
    backgroundColor: "#1b263b",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },
  gameItemContainer: {
    flexDirection: "row",
  },
  gameTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#fff",
    marginLeft: 8,
  },
  containerBtn: {
    top: 10,
    zIndex: 1,
    padding: 5,
    margin: 5,
  },
});

export default SportsSchedule;
