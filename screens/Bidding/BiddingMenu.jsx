import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { windowHeight, windowWidth } from "../../utils/dimensions";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const BiddingMenu = () => {
  const navigation = useNavigation();
  const [teamName, setTeamName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get("http://192.168.1.8:5001/getLeagueBids");
=======
        const response = await axios.get("http://192.168.1.4:5001/getLeagueBids");
>>>>>>> f56abb628e6d22e5d319ee60097fe97084f49462
        if (response?.data) {
          setTeamName(response.data);
          // console.log("Team Name:", JSON.stringify(response.data, null, 2));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onPressBack = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerOne}>
        <Ionicons
          onPress={onPressBack}
          name="arrow-back-outline"
          size={20}
          color="#fff"
          style={styles.containerBtn}
        />
        <View style={styles.headerLeagueContainer}>
          <Text style={styles.headerTxt}>LEAGUES BIDDING</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {Array.isArray(teamName) && teamName.length > 0 ?
        
        (
          teamName.map((item) => (
            <TouchableOpacity
              key={item.League_name}
              onPress={() =>
                navigation.navigate("CustomBidding", { League_name: item.League_name })
              }
              style={styles.card}
            >
              <View style={styles.rowContainer}>
                <View style={styles.imageContainer}>
                  {item.League_name === "FAST PREMIER LEAGUE" ? (
                    <Image source={require("../../assets/logo/FPL_Logo.jpg")} style={styles.cardImage} />
                  ) : item.League_name === "FAST Cricket League" ? (
                    <Image source={require("../../assets/logo/FCL_Logo.jpg")} style={styles.cardImage} />
                  ) : (
                    <Image source={require('../../assets/logo/FCL_Logo.jpg')} style={styles.cardImage} />
                  )}
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.League_name}</Text>
                  <Text style={styles.itemSubTitle}>{item.ground_name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noBiddingContainer}>
            <Text style={styles.noBiddingText}>League Bidding Not Started</Text>
          </View>
        )}
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    paddingTop: 30,
  },
  containerOne: {
    backgroundColor: "#0d1b2a",
    padding: windowWidth * 0.02,
  },
  containerBtn: {
    marginTop: windowWidth * 0.03,
    marginLeft: windowWidth * 0.02,
  },
  headerLeagueContainer: {
    flexDirection: "row",
    marginHorizontal: windowWidth * 0.02,
    marginVertical: windowWidth * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTxt: {
    fontSize: windowWidth * 0.05,
    fontWeight: "600",
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: windowWidth * 0.03,
    overflow: "hidden",
    margin: windowWidth * 0.03,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    padding: windowWidth * 0.02,
  },
  textContainer: {
    flex: 2,
    padding: windowWidth * 0.02,
  },
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  itemTitle: {
    fontSize: windowWidth * 0.04,
    fontWeight: "500",
    color: "#000000",
  },
  itemSubTitle: {
    fontSize: windowWidth * 0.03,
    fontWeight: "bold",
    color: "#000000",
  },
  scrollContainer: {
    padding: 10,
  },
  noBiddingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set your background color
  },
  noBiddingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', // Set your text color
    textAlign: 'center',
  },
  

});

export default BiddingMenu;
