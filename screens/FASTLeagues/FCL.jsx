import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Matches } from "../../model/matchesData";

const FCL = () => {
  const navigation = useNavigation();

  const handleMatchPress = (item) => {
    navigation.navigate("FCLMatchCard", {
      match_id: item.id,
      team1_name: item.TeamA,
      team2_name: item.TeamB,
      venue: item.venue,
      date: item.date,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Matches.map((match) => (
          <TouchableOpacity
            key={match.id}
            onPress={() => handleMatchPress(match)}
            style={styles.card}
          >
            <View style={styles.headerContainer}>
              <View style={styles.teamLogoContainer}>
                <Image
                  source={require("../../assets/logo/islamabad-united.jpg")}
                  style={styles.teamLogo}
                />
                <Text style={styles.teamName}>{match.TeamA}</Text>
              </View>
              <Text style={styles.versus}>VS</Text>
              <View style={styles.teamLogoContainer}>
                <Image
                  source={require("../../assets/logo/lahore-qalandars.jpg")}
                  style={styles.teamLogo}
                />
                <Text style={styles.teamName}>{match.TeamB}</Text>
              </View>
            </View>

            <View style={styles.VenueTeamContainer}>
              <Text style={styles.venue}>{match.venue}</Text>
            </View>
            <View style={styles.VenueTeamContainer}>
              <Text style={styles.venue}>{match.date}</Text>
            </View>
            <View style={styles.VenueTeamContainer}>
              <Text style={styles.venue}>{match.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    padding: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    padding: 10,

  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  card: {
    marginTop: 20,
    elevation: 5,
    padding: 10,
    backgroundColor: "#1b263b",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  teamLogoContainer: {
    alignItems: "center",
  },
  teamLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#ffffff",
  },
  versus: {
    fontSize: 14,
    color: "#ffffff",
  },
  VenueTeamContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  venue: {
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    color: "#ffffff",
  },

  containerBtn: {
    top: 10,
    zIndex: 1,
    padding: 5,
    margin: 5,
  },
  matchId: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },

  switchContainer: {
    marginVertical: 20,
  },
});

export default FCL

