import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  TextInput,

} from 'react-native';
import { LeaguesOptionSwitch } from '../components/leaguesOptionSwitch';
import { Ionicons } from "@expo/vector-icons";
import Feather from "react-native-vector-icons/Feather";

import { windowWidth } from '../utils/dimensions';
import axios from 'axios';

const FASTLeaguesMenu = ({ route, navigation }) => {

  const { nname } = route.params;
  const [searchInput, setSearchInput] = useState("");
  const [switchTab, setSwitchTab] = useState(1);
  const [teamsName, setTeamName] = useState([]);
  const [matchSchedule, setMatchSchedule] = useState([]);

  useEffect(() => {
    const fetchTeamsName = async () => {
      try {
        const response = await axios.get(`http://192.168.10.5:5001/getLeagueTeams?League_Name=${nname}`);
        if (response?.data) {
          setTeamName(response.data);

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTeamsName();
  }, []);

  useEffect(() => {
    const fetchMatchesSchedule = async () => {
      try {
        const response = await axios.get(`http://192.168.10.5:5001/getLeagueSchedule?League_Name=${nname}`);
        if (response?.data) {
          setMatchSchedule(response.data);
          // console.log("Match Schedule:", JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMatchesSchedule();
  }, []);

  const formatDate = (dateString) => {
    const matchDate = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return matchDate.toLocaleDateString(undefined, options);
  };

  const onSelectSwitch = (value) => {
    setSwitchTab(value);
  };

  const onPressBack = () => {
    navigation.navigate("Fast Leagues");
  };
  
const renderHomeView = () => {
  return (
    <View style={styles.contentContainer}>
      <Text>Home View</Text>
    </View>
  );
};



  const renderTeamsView = () => {
    
    const renderTeamItem = ({ item }) => (
      <>
      {/* <View style={styles.searchBarContainer}>
       <Feather
         name="search"
         size={20}
         color="#1b263b"
         style={styles.searchIcon}
       />
       <TextInput
         style={styles.searchInput}
         placeholder="Search matches..."
         value={searchInput}
         onChangeText={(text) => setSearchInput(text)}
       />
     </View> */}
       <View style={styles.teamItem}>
        <Image source={require('../assets/logo/islamabad-united.jpg')} style={styles.teamLogo} />
        <Text style={styles.teamName}>{item.name}</Text>
      </View>
       </>
    );

    return (
      <View style={styles.teamContainer}>
        <FlatList
          data={teamsName}
          renderItem={renderTeamItem}
          keyExtractor={(item) => item.name}
          numColumns={2}
          contentContainerStyle={styles.teamList}
        />
      </View>
    );
  };

  const handleMatchPress = (match) => {
    navigation.navigate("LeagueMatchCardDetails", {
      match_id: match.Match_Id,
      team1_name: match.team1,
      team2_name: match.team2,
      venue: match.League_Name,
      date: match.Match_Date,
      time: match.slot,
      name:match.nname,
    });
  };

  const renderMatchesView = () => {
    return (
      <SafeAreaView style={styles.scheduleContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {matchSchedule.map((match) => (
            <TouchableOpacity
              key={match.name}
              onPress={() => handleMatchPress(match)}
              style={styles.card}
            >
              <View style={styles.headerContainer}>
                <View style={styles.teamLogoContainer}>
                  <Image
                    source={require("../assets/logo/islamabad-united.jpg")}
                    style={styles.teamLogo}
                  />
                  <Text style={styles.scheduleTeamName}>{match.team1}</Text>
                </View>
                <Text style={styles.versus}>VS</Text>
                <View style={styles.teamLogoContainer}>
                  <Image
                    source={require("../assets/logo/lahore-qalandars.jpg")}
                    style={styles.teamLogo}
                  />
                  <Text style={styles.scheduleTeamName}>{match.team2}</Text>
                </View>
              </View>
  
              <View style={styles.VenueTeamContainer}>
                <Text style={styles.venue}>{match.League_Name}</Text>
              </View>
              
              <View style={styles.VenueTeamContainer}>
                <Text style={styles.venue}>{formatDate(match.Match_Date)}</Text>
              </View>
              <View style={styles.VenueTeamContainer}>
                <Text style={styles.venue}>{match.slot}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };

  const renderPointsTableView = () => {
    return (
      <View style={styles.contentContainer}>
        <Text>Points Table View</Text>
        {/* Add your Points Table content here */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerTeams}>
      <View style={styles.header}>
        <Ionicons
          onPress={onPressBack}
          name="arrow-back-outline"
          size={20}
          color="#000"
          style={styles.backButton}
        />
        <Text style={styles.headerText}>{nname}</Text>
      </View>

      <View style={styles.switchContainer}>
        <LeaguesOptionSwitch
          selectionMode={switchTab}
          Option1="HOME"
          Option2="TEAMS"
          Option3="MATCHES"
          Option4="POINTS TABLE"
          onSelectSwitch={onSelectSwitch}
        />
      </View>

      {/* Render content based on the selected tab */}
      {switchTab === 1 && renderHomeView()}
      {switchTab === 2 && renderTeamsView()}
      {switchTab === 3 && renderMatchesView()}
      {switchTab === 4 && renderPointsTableView()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: windowWidth * 0.1,
  },
  backButton: {
    marginLeft: 10,
  },
  headerText: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  switchContainer: {
    padding: 10,
  },
  teamContainer: {
    padding: 16,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTeams: {
    flex: 1,
    padding: 16,
  },
  teamItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 8,
  },
  teamLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  teamList: {
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: "row",
    borderColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#ffffff",
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    color: "#1b263b",
  },
  // Schedule Match

  scheduleContainer: {
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
  scheduleTeamName: {
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

export default FASTLeaguesMenu;

