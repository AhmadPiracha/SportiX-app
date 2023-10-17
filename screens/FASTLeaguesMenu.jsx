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
import Carousel from 'react-native-snap-carousel';
import { windowWidth } from '../utils/dimensions';
import { sliderData } from "../model/matchesData";
import BannerSlider from "../components/BannerSlider";

import axios from 'axios';
const commonStyles = {
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
  searchBarContainer: {
    flexDirection: "row",
    borderColor: "#1b263b",
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#1b263b",
  },
  searchIcon: {
    marginRight: windowWidth * 0.02,
    marginTop: windowWidth * 0.01,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
  },
  scheduleContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    padding: 10,
  },
};

const FASTLeaguesMenu = ({ route, navigation }) => {

  const { nname } = route.params;
  const [searchInput, setSearchInput] = useState("");
  const [switchTab, setSwitchTab] = useState(1);
  const [teamsName, setTeamName] = useState([]);
  const [matchSchedule, setMatchSchedule] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);

  const upcomingMatches = matchSchedule.slice(0, 5);

  useEffect(() => {
    const fetchTeamsName = async () => {
      try {
        const response = await axios.get(`http://10.54.9.188:5001/getLeagueTeams?League_Name=${nname}`);
        if (response?.data) {
          setTeamName(response.data);
          console.log("Team Name:", JSON.stringify(response.data, null, 2));
          setFilteredTeams(response.data);


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
        const response = await axios.get(`http://10.54.9.188:5001/getLeagueSchedule?League_Name=${nname}`);
        if (response?.data) {
          setMatchSchedule(response.data);
          console.log("Match Schedule:", JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMatchesSchedule();
  }, []);


  const formatDate = (dateString) => {
    const matchDate = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
    return matchDate.toLocaleDateString(undefined, options);
  };

  const onSelectSwitch = (value) => {
    setSwitchTab(value);
  };

  const onPressBack = () => {
    navigation.navigate("Fast Leagues");
  };

  const handleSearchInput = (text) => {
    setSearchInput(text);
    const filtered = teamsName.filter((team) =>
      team.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTeams(filtered);
  };
  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} index={index} />;
  };
  const renderHomeView = () => {
    return (
      <ScrollView style={styles.homeContainer}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Gallery</Text>
        </View>

        <Carousel
          ref={(c) => {
            this._carousel = c;
          }}
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={windowWidth - 40}
          itemWidth={300}
          loop={true}
        />
        {/* Team Slider */}
        <Text style={styles.sectionHeader}>Teams</Text>
        <FlatList
          data={teamsName}
          horizontal={true} // Make it horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.teamCard}>
              <Image source={require('../assets/logo/islamabad-united.jpg')} style={styles.teamCardImage} />
              <Text style={styles.teamCardName}>{item.name}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.teamSlider} // Add some padding to the list
        />

        {/* Upcoming Matches Slider */}
        <Text style={styles.sectionHeader}>Upcoming Matches</Text>
        <Carousel
          data={upcomingMatches}
          renderItem={({ item }) => (
            <>
            <View style={styles.matchCardContainer}>
            <View style={styles.matchCard}>
                <View style={styles.matchContent}>
                  <View style={styles.teamLogoContainer}>
                    <Image
                      source={require("../assets/logo/islamabad-united.jpg")}
                      style={styles.teamLogo}
                    />
                    <Text style={styles.matchCardTitle}>{item.team1}</Text>
                  </View>
                  <View style={styles.teamLogoContainer}>
                    <Image
                      source={require("../assets/logo/lahore-qalandars.jpg")}
                      style={styles.teamLogo}
                    />
                    <Text style={styles.matchCardTitle}>{item.team2}</Text>
                  </View>
                </View>
                <View style={styles.matchDetails}>
                  <Text style={styles.matchCardDate}>{item.slot}</Text>
                  <Text style={styles.matchCardDate}>{formatDate(item.Match_Date)}</Text>
                </View>
              </View>
              <View style={styles.matchDetails}>
                <Text style={styles.matchCardVenue}>{item.League_Name}</Text>
              </View>
            </View>
            
            </>
          )}
          sliderWidth={windowWidth}
          itemWidth={windowWidth - 100}
          loop={true}
          autoplay={true}
          autoplayDelay={5000}
          layout="default"
          layoutCardOffset={18} // Space between cards
          activeAnimationType="spring" // Animation type for active card
          useScrollView={true} // Use ScrollView for navigation
          enableSnap={true}
          lockScrollWhileSnapping={true}
          removeClippedSubviews={true}
          inactiveSlideScale={0.9} // Scale of inactive slides
          inactiveSlideOpacity={0.7} // Opacity of inactive slides
          activeSlideAlignment="start" // Alignment of the active slide
        />
      </ScrollView>
    );
  };

  const renderTeamsView = () => {
    const renderTeamItem = ({ item }) => (
      <View style={styles.teamItem}>
        <Image
          source={require('../assets/logo/islamabad-united.jpg')}
          style={styles.teamCardImage}
        />
        <Text style={styles.teamName}>{item.name}</Text>
      </View>
    );

    return (
      <View style={styles.teamContainer}>
        <View style={styles.searchBarContainer}>
          <Feather
            name="search"
            size={20}
            color="#ffffff"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={searchInput}
            onChangeText={handleSearchInput}
          />
        </View>
        <FlatList
          data={filteredTeams}
          renderItem={renderTeamItem}
          keyExtractor={(item, index) => index.toString()}
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
      name: match.nname,
    });
  };

  const renderMatchesView = () => {
    return (
      <SafeAreaView style={styles.scheduleContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {matchSchedule.map((match) => (
            <TouchableOpacity
              key={match.Match_Id}
              onPress={() => handleMatchPress(match)}
              style={styles.card}
            >
              <View style={styles.headerContainer}>
                <View style={styles.teamContainer}>
                  <Image
                    source={require("../assets/logo/islamabad-united.jpg")}
                    style={styles.matchLogo}
                  />
                  <Text style={styles.scheduleTeamName}>{match.team1}</Text>
                </View>
                <Text style={styles.versus}>VS</Text>
                <View style={styles.teamContainer}>
                  <Image
                    source={require("../assets/logo/lahore-qalandars.jpg")}
                    style={styles.matchLogo}
                  />
                  <Text style={styles.scheduleTeamName}>{match.team2}</Text>
                </View>
              </View>



              <View style={styles.VenueTeamContainer}>
                <Text style={styles.venue}>{formatDate(match.Match_Date)}</Text>
              </View>
              <View style={styles.VenueTeamContainer}>
                <Text style={styles.venue}>{match.slot}</Text>
              </View>
              <View style={styles.VenueTeamContainer}>
                <Text style={styles.venue}>{match.League_Name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  };

  // const renderPointsTableView = () => {
  //   return (
  //     <View style={styles.contentContainer}>
  //       <Text>Points Table View</Text>
  //       {/* Add your Points Table content here */}
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.header}>
        <Ionicons
          onPress={onPressBack}
          name="arrow-back-outline"
          size={20}
          color="#000"
          style={commonStyles.backButton}
        />
        <Text style={commonStyles.headerText}>{nname}</Text>
      </View>

      <View style={commonStyles.switchContainer}>
        <LeaguesOptionSwitch
          selectionMode={switchTab}
          Option1="HOME"
          Option2="TEAMS"
          Option3="MATCHES"
          Option4="POINTS TABLE"
          onSelectSwitch={onSelectSwitch}
        />
      </View>

      {switchTab === 1 && renderHomeView()}
      {switchTab === 2 && renderTeamsView()}
      {switchTab === 3 && renderMatchesView()}
      {/* {switchTab === 4 && renderPointsTableView()} */}
      
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
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  teamList: {
    padding: 16,
  },
  // Search Bar
  searchBarContainer: {
    flexDirection: "row",
    borderColor: "#1b263b",
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#1b263b",
    margin: windowWidth * 0.06,
  },
  searchIcon: {
    marginRight: windowWidth * 0.02,
    marginTop: windowWidth * 0.01,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
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

  // New styles for home screen
  homeContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  teamCard: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamCardImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  teamCardName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },

  // New styles for match card on home screen
  matchCardContainer:{
    backgroundColor: '#1b263b',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,    

  },
  matchCard: {
  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  matchContent: {
    padding: 10,
  },
  teamLogoContainer: {
    display: 'flex',
    flexDirection: 'row',

  },
  teamLogo: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginBottom: 10,
  },

  matchLogo: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 10,
  },
  matchDetails: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  matchCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#ffffff',
  },
  matchCardDate: {
    fontSize: 16,
    marginRight: 10,
    color: '#ffffff',

  },
  matchCardVenue: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    flex: 1,
  },

});

export default FASTLeaguesMenu;

