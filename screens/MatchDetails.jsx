import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { windowWidth, windowHeight } from "../utils/dimensions";
import axios from "axios";
import { useState } from "react";

const MatchDetails = () => {
  const navigation = useNavigation();
  const [cricket, setCricket] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.54.4.219:5001/teamSchedule",
          {
            "Content-Type": "application/json",
          }
        );
        if (response?.data) {
          setCricket(response.data);
          // console.log(response.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleMatchPress = (item) => {
    navigation.navigate("MatchTeamCard", {
      match_id: item.id,
      team1_name: item.teamA,
      team2_name: item.teamB,
      venue: item.venue,
      date: item.date,
      time: item.time,
    });
    // console.log("Match team Card Pressed")
  };

  const renderMatchItem = ({ item }) => (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={() => handleMatchPress(item)}>
          <View style={styles.detailsContainer}>
            <Image
              source={require("../assets/logo/islamabad-united.jpg")}
              style={styles.teamLogo}
            />
            <Text style={styles.teamsName}>{item.teamA}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Image
              source={require("../assets/logo/lahore-qalandars.jpg")}
              style={styles.teamLogo}
            />
            <Text style={styles.teamsName}>{item.teamB}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={cricket}
        keyExtractor={(item) => item.id}
        renderItem={renderMatchItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#0d1b2a",
  },
  container: {
    backgroundColor: "#1b263b",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },
  subContainer: {
    flexDirection: "column",
  },
  detailsContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
  },
  teamLogo: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  teamsName: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
  flatListContent: {
    width: windowWidth,
    height: windowHeight,
  },
});

export default MatchDetails;
