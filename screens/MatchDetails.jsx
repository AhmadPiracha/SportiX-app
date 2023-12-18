import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { windowWidth, windowHeight } from "../utils/dimensions";
import axios from "axios";

const MatchDetails = ({ type }) => {
  const navigation = useNavigation();
  const [cricket, setCricket] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.10.5:5001/teamSchedule?type=${type}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response?.data) {
          setCricket(response.data);
          // console.log(
          //   "Match Details: ",
          //   JSON.stringify(response.data, null, 2)
          // );
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
      time:item.time,
    });
  };

  const renderMatchItem = ({ item }) => (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          onPress={() => handleMatchPress(item)}
          style={styles.card}
        >
          <View style={styles.headerContainer}>
            <View style={styles.teamLogoContainer}>
              <Image
                source={require("../assets/logo/islamabad-united.jpg")}
                style={styles.teamLogo}
              />
              <Text style={styles.teamName}>{item.teamA}</Text>
            </View>
            <Text style={styles.versus}>VS</Text>
            <View style={styles.teamLogoContainer}>
              <Image
                source={require("../assets/logo/lahore-qalandars.jpg")}
                style={styles.teamLogo}
              />
              <Text style={styles.teamName}>{item.teamB}</Text>
            </View>
          </View>
          <View style={styles.VenueTeamContainer}>
            <Text style={styles.venue}>{item.date}</Text>
            <Text style={styles.venue}>{item.time}</Text>
          </View>
          <View style={styles.VenueTeamContainer}>
            <Text style={styles.venue}>{item.venue}</Text>
          </View>

        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={cricket}
        keyExtractor={(item, index) => index.toString()} 
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
    elevation: 2,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,

  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 15,

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
    color: "#000000",
  },
  versus: {
    fontSize: 14,
    color: "#000000",
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
    color: "#000000",
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

export default MatchDetails;
