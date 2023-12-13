import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { windowWidth } from "../utils/dimensions";
import axios from "axios";

const PlayersList = ({ team }) => {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(`http://192.168.1.4:5001/getPlayers?team=${team}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response?.data) {
          setPlayerData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {playerData.map((item) => (
          <View key={item.id} style={styles.playerContainer}>
            <View style={styles.playerMain}>
              <Text style={styles.playerName}>{item.playername}</Text>
              <Text style={styles.rollNumber}>{item.rollno}</Text>
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: windowWidth * 0.04,
    paddingTop: windowWidth * 0.02,
  },
  scrollViewContent: {
    paddingBottom: windowWidth * 0.02,
  },
  playerContainer: {
    paddingVertical: windowWidth * 0.03,
  },
  playerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerName: {
    fontSize: windowWidth * 0.04,
    fontWeight: "bold",
    color: "#ffffff",
  },
  rollNumber: {
    fontSize: windowWidth * 0.04,
    color: "#ffffff", 
  },
  separator: {
    height: 1,
    backgroundColor: "#ffffff",
    marginTop: windowWidth * 0.02,
  },
});

export default PlayersList;
