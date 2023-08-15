import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { windowWidth, windowHeight } from "../utils/dimensions";
import axios from "axios";

const MatchDetails = ({ type }) => {
  const navigation = useNavigation();
  const [cricket, setCricket] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.10.15:5001/teamSchedule?type=${type}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response?.data) {
          setCricket(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [type]);

  const handleMatchPress = (item) => {
    navigation.navigate("MatchTeamCard", {
      match_id: item.id,
      team1_name: item.teamA,
      team2_name: item.teamB,
      venue: item.venue,
      date: item.date,
    });
  };

  const renderMatchItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleMatchPress(item)} style={styles.matchContainer}>
      <Image source={{ uri: item.teamALogo }} style={styles.teamLogo} />
      <View style={styles.teamsInfo}>
        <Text style={styles.teamName}>{item.teamA}</Text>
        <Text style={styles.teamName}>{item.teamB}</Text>
      </View>
      <Image source={{ uri: item.teamBLogo }} style={styles.teamLogo} />
      <View style={styles.matchInfoContainer}>
        <Text style={styles.matchInfoText}>Date: {item.date}</Text>
        <Text style={styles.matchInfoText}>Venue: {item.venue}</Text>
      </View>
    </TouchableOpacity>
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
  matchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1b263b",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  teamLogo: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  teamsInfo: {
    flex: 1,
    marginHorizontal: 10,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  matchInfoContainer: {
    alignItems: "flex-end",
  },
  matchInfoText: {
    fontSize: 14,
    color: "#ccc",
  },
  flatListContent: {
    width: windowWidth,
    paddingVertical: 10,
  },

  
});

export default MatchDetails;
