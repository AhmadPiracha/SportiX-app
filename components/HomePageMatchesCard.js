import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { windowWidth, windowHeight } from "../utils/dimensions";

const HomePageMatchesCard = React.memo(
  ({ homeTeam, homeTeamLogo, awayTeam, awayTeamLogo, venue, time, date }) => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.container}>
            <View style={styles.teamLogoContainer}>
              {homeTeamLogo && (
                <Image source={homeTeamLogo} style={styles.teamLogo} />
              )}
              <Text style={styles.teamName}>{homeTeam}</Text>
            </View>
            <Text style={styles.versus}>vs</Text>
            <View style={styles.teamLogoContainer}>
              {awayTeamLogo && (
                <Image source={awayTeamLogo} style={styles.teamLogo} />
              )}
              <Text style={styles.teamName}>{awayTeam}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.venue}>{venue}</Text>

            <Text style={styles.date}>{date}</Text>
          </View>
        </Card.Content>
      </Card>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    margin: 10,
    elevation: 5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 10,
    justifyContent: "center",
  },
  teamLogoContainer: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  teamLogo: {
    width: 50,
    height: 50,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  versus: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  venue: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
  },
  time: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default HomePageMatchesCard;
