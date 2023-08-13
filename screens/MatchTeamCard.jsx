import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity } from "react-native";
import CustomSwitch from "../components/CustomSwitch";
import PlayersList from "../components/PlayerList";
import { useNavigation } from "@react-navigation/native";
const MatchTeamCard = ({ route }) => {
  const { team1_name, team2_name, venue, date, time } = route.params;
  const [playersList, setPlayersList] = useState(1);
  const navigation = useNavigation();


  const onSelectSwitch = (value) => {
    setPlayersList(value);
  };
  
  const handleGoBack = () => {
    navigation.navigate("Schedule")
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerBar}>
          <View style={styles.leftIcon}>
            <Ionicons
              onPress={handleGoBack}
              name="arrow-back-outline"
              size={20}
              color="#fff"
              style={styles.containerBtn}
            />
          </View>
          <View style={styles.shareBtn}>
            <Ionicons
              name="share-social-outline"
              size={20}
              color="#fff"
              style={styles.containerBtn}
            />
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.headerContainer}>
            <View style={styles.teamLogoContainer}>
              <Image
                source={require("../assets/logo/islamabad-united.jpg")}
                style={styles.teamLogo}
              />
              <Text style={styles.teamName}>{team1_name}</Text>
            </View>
            <Text style={styles.versus}>VS</Text>
            <View style={styles.teamLogoContainer}>
              <Image
                source={require("../assets/logo/lahore-qalandars.jpg")}
                style={styles.teamLogo}
              />
              <Text style={styles.teamName}>{team2_name}</Text>
            </View>
          </View>

          <View style={styles.VenueTeamContainer}>
            <Text style={styles.venue}>{venue}</Text>
          </View>
          <View style={styles.VenueTeamContainer}>
            <Text style={styles.venue}>{date}</Text>
          </View>
          <View style={styles.VenueTeamContainer}>
            <Text style={styles.venue}>{time}</Text>
          </View>
        </View>

        {/* Teams Players */}

        <View style={styles.switchContainer}>
          <CustomSwitch
          Option1={team1_name}
            Option2={team2_name}
            selectionMode={playersList}
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        {playersList === 1 && <PlayersList key={team1_name} team={team1_name} />}
        {playersList === 2 && <PlayersList key={team2_name} team={team2_name} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b263b",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#0d1b2a",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  card: {
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

export default MatchTeamCard;
