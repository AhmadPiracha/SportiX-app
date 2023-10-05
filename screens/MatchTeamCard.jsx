import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import CustomSwitch from "../components/CustomSwitch";
import PlayersList from "../components/PlayerList";
import { useNavigation } from "@react-navigation/native";
import { windowWidth, windowHeight } from "../utils/dimensions";

const MatchTeamCard = ({ route }) => {
  const { id, team1_name, team2_name, venue, date, time } = route.params;
  const [playersList, setPlayersList] = useState(1);
  const navigation = useNavigation();

  const onSelectSwitch = (value) => {
    setPlayersList(value);
  };

  const handleGoBack = () => {
    navigation.navigate("Schedule");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.headerBar}>
          <View style={styles.leftIcon}>
            <Ionicons
              onPress={handleGoBack}
              name="arrow-back-outline"
              size={windowWidth * 0.05}
              color="#fff"
              style={styles.containerBtn}
            />
          </View>
          <View style={styles.shareBtn}>
            <Ionicons
              name="share-social-outline"
              size={windowWidth * 0.05}
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
            <Text style={styles.venue}>{date}</Text>
            <Text style={styles.venue}>{time}</Text>
          </View>
          <View style={styles.VenueTeamContainer}>
            <Text style={styles.venue}>{venue}</Text>
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

        {playersList === 1 && (
          <PlayersList key={id} team={team1_name} />
        )}
        {playersList === 2 && (
          <PlayersList key={id} team={team2_name} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
  },
  mainContainer: {
    flex: 1,
    margin: windowWidth * 0.02,
    borderRadius: windowWidth * 0.02,
    marginTop: windowWidth * 0.06,

  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: windowWidth * 0.02,
  },

  card: {
    elevation: 5,
    padding: windowWidth * 0.03,
    borderRadius: windowWidth * 0.05,
    margin: windowWidth * 0.02,
    backgroundColor: '#ffffff',
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
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: windowWidth * 0.075,
  },
  teamName: {
    fontSize: windowWidth * 0.04,
    fontWeight: "600",
    textAlign: "center",
    color: "#000000",
  },
  versus: {
    fontSize: windowWidth * 0.03,
    color: "#000000",
  },
  VenueTeamContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: windowWidth * 0.02,
  },
  venue: {
    fontSize: windowWidth * 0.035,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flex: 1,
    color: "#000000",
  },

  containerBtn: {
    top: windowWidth * 0.02,
    zIndex: 1,
    padding: windowWidth * 0.005,
    margin: windowWidth * 0.005,
  },
  matchId: {
    marginTop: windowWidth * 0.02,
    fontSize: windowWidth * 0.035,
    textAlign: "center",
  },

  switchContainer: {
    margin: windowHeight * 0.03,
  },
});

export default MatchTeamCard;
