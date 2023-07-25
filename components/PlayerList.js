import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { windowWidth } from "../utils/dimensions";

const PlayersList = ({ name }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.playerContainer}>
          <View style={{ width: windowWidth - 220 }}>
            <Text style={styles.playerName}>{name}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  playerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#ffffff",
  },
});

export default PlayersList;
