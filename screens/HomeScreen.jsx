import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
  Dimensions
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { DateTime } from "luxon"; // Import DateTime from luxon
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, db } from "../database/firebase";
import BannerSlider from "../components/BannerSlider";
import CustomSwitch from "../components/CustomSwitch";
import { sliderData } from "../model/matchesData";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {

  const [searchInput, setSearchInput] = useState("");
  const [matchTab, setMatchTab] = useState(1);
  const [displayName, setDisplayName] = useState("");
  const [matches, setMatches] = useState({ todayMatches: [], upcomingMatches: [] });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const doc = await db.collection("users").doc(auth.currentUser.uid).get();
        if (doc.exists) {
          setDisplayName(doc.data().displayName);
        } else {
          console.log("User Not Found");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    fetchUserData();

    const fetchData = async () => {
      try {
        const pktDate = DateTime.local().setZone("Asia/Karachi"); // Get PKT current date and time
        // console.log("PKT Current Date:", pktDate.toISO()); // Log PKT current date

        const response = await axios.get(
          `http://192.168.1.6:5001/teamSchedule?date=${pktDate.toISO()}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("API Response:", JSON.stringify(response.data, null, 2)); // Log the API response

        if (response?.data) {
          const allMatches = response.data;

          const todayMatches = allMatches.filter(
            (match) =>
              DateTime.fromISO(match.date).toISODate() === pktDate.toISODate()
          );

          const upcomingMatches = allMatches.filter(
            (match) => DateTime.fromISO(match.date) > pktDate
          );

          setMatches({ todayMatches, upcomingMatches });
          // console.log("Today's Matches:", JSON.stringify(todayMatches, null, 2));
          // console.log("Upcoming Matches:", JSON.stringify(upcomingMatches, null, 2));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} index={index} />;
  };

  const onSelectSwitch = (value) => {
    setMatchTab(value);
  };

  const renderMatchDetails = (match, index) => (
    <View style={styles.card} key={index}>
      <View style={styles.headerContainer}>
        <View style={styles.teamLogoContainer}>
          <Image
            source={require("../assets/logo/islamabad-united.jpg")}
            style={styles.teamLogo}
          />
          <Text style={styles.teamName}>{match.teamA}</Text>
        </View>
        <Text style={styles.versus}>VS</Text>
        <View style={styles.teamLogoContainer}>
          <Image
            source={require("../assets/logo/lahore-qalandars.jpg")}
            style={styles.teamLogo}
          />
          <Text style={styles.teamName}>{match.teamB}</Text>
        </View>
      </View>
      <View style={styles.VenueTeamContainer}>
        <Text style={styles.venue}>{match.venue}</Text>
      </View>
      <View style={styles.VenueTeamContainer}>
        <Text style={styles.venue}>{match.date}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons
              name="reorder-three-outline"
              size={28}
              color="#ffffff"
              style={styles.drawerIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBarContainer}>
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
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Gallery</Text>
        </View>

        {/* <Carousel
        ref={(c) => {
          this._carousel = c;
        }}
        data={sliderData}
        renderItem={renderBanner}
        sliderWidth={width - 40}
        itemWidth={300}
        loop={true}
      /> */}

        <View style={styles.switchContainer}>
          <CustomSwitch
            selectionMode={matchTab}
            Option1="Today's Match"
            Option2="Upcoming Match"
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        {/* Display match schedule */}
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.matchesContainer}>
            {matchTab === 1 ? (
              // Filter and map today's matches
              matches.todayMatches
                .filter((match) =>
                  match.teamA.toLowerCase().includes(searchInput.toLowerCase()) ||
                  match.teamB.toLowerCase().includes(searchInput.toLowerCase()) ||
                  match.venue.toLowerCase().includes(searchInput.toLowerCase())
                )
                .map(renderMatchDetails)
            ) : (
              // Filter and map upcoming matches
              matches.upcomingMatches
                .filter((match) =>
                  match.teamA.toLowerCase().includes(searchInput.toLowerCase()) ||
                  match.teamB.toLowerCase().includes(searchInput.toLowerCase()) ||
                  match.venue.toLowerCase().includes(searchInput.toLowerCase())
                )
                .map(renderMatchDetails)
            )}
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b263b",
    padding: width * 0.05,
  },
  contentContainer: {
    flex: 1,
    padding: width * 0.05,
  },
  card: {
    elevation: 5,
    padding: width * 0.04,
    backgroundColor: "#ffffff",
    borderRadius: width * 0.03,
    marginHorizontal: width * 0.02,
    marginVertical: height * 0.02,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 20,
  },
  headerText: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  drawerIcon: {
    overflow: "hidden",
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
  sectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  sectionLink: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  switchContainer: {
    marginVertical: 20,
  },
  matchesContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,

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
    color: "#1b263b",
  },
  versus: {
    fontSize: 14,
    color: "#1b263b",
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
    color: "#1b263b",
  },
});

export default HomeScreen;
