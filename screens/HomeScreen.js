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
} from "react-native";
import Carousel from "react-native-snap-carousel";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, db } from "../database/firebase";
import BannerSlider from "../components/BannerSlider";
import CustomSwitch from "../components/CustomSwitch";
import { TodaysMatch, UpcomingMatches, sliderData } from "../model/matchesData";
import { windowWidth } from "../utils/dimensions";

const HomeScreen = ({ navigation }) => {
  const [matchTab, setMatchTab] = useState(1);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const doc = await db
          .collection("users")
          .doc(auth.currentUser.uid)
          .get();
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
  }, []);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} index={index} />;
  };

  const onSelectSwitch = (value) => {
    setMatchTab(value);
  };

  const renderMatches = (matches) => {
    return (
      <View style={styles.container}>
        {matches.map((item, index) => (
          <View style={styles.card} key={index}>
            <View style={styles.headerContainer}>
              <View style={styles.teamLogoContainer}>
                <Image
                  source={require("../assets/logo/islamabad-united.jpg")}
                  style={styles.teamLogo}
                />
                <Text style={styles.teamName}>Malang</Text>
              </View>
              <Text style={styles.versus}>VS</Text>
              <View style={styles.teamLogoContainer}>
                <Image
                  source={require("../assets/logo/lahore-qalandars.jpg")}
                  style={styles.teamLogo}
                />
                <Text style={styles.teamName}>Thunders</Text>
              </View>
            </View>

            <View style={styles.VenueTeamContainer}>
              <Text style={styles.venue}>Fast Cricket Stadium</Text>
            </View>
            <View style={styles.VenueTeamContainer}>
              <Text style={styles.venue}>17/05/2023</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hello {displayName}</Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons
              name="reorder-three-outline"
              size={30}
              color="#ffffff"
              style={styles.drawerIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBarContainer}>
          <Feather
            name="search"
            size={20}
            color="#ffffff"
            style={styles.searchIcon}
          />
          <TextInput style={styles.searchInput} placeholder="Search" />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Gallery</Text>
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

        <View style={styles.switchContainer}>
          <CustomSwitch
            selectionMode={matchTab}
            Option1="Today's Match"
            Option2="Upcoming Match"
            onSelectSwitch={onSelectSwitch}
          />
        </View>

        {matchTab === 1 && renderMatches(TodaysMatch)}
        {matchTab === 2 && renderMatches(UpcomingMatches)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b263b",
  },
  contentContainer: {
    padding: 20,
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
  },
  searchIcon: {
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    color: "#ffffff",
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
  card: {
    elevation: 5,
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
