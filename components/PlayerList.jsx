import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { windowWidth } from "../utils/dimensions";
import axios from "axios";

const PlayersList = ({ team }) => {
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.10.19:5001/getPlayers?team=${team}`, {
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
      <View style={styles.container}>
        {playerData.map((item) => (
          <View key={item.id} style={styles.playerContainer}>
            <View style={styles.playerMain}>
              <Text style={styles.playerName}>{item.playername}</Text>
              <Text style={styles.rollNumber}>{item.rollno}</Text>
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  playerContainer: {
    backgroundColor: "#0d1b2a",
    paddingVertical: 12,
  },
  playerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rollNumber: {
    fontSize: 16,
    color: "#ffffff", 
  },
  playerName: {
    fontSize: 16,
    color: "#ffffff", 
  },
  separator: {
    height: 1,
    backgroundColor: "#ffffff",
    marginTop: 8,
  },
});

export default PlayersList;
