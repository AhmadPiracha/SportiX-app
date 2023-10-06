import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { windowHeight, windowWidth } from "../../utils/dimensions";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

const FASTLeagues = () => {
  const navigation = useNavigation();
  const [teamName, setTeamName] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.10.5:5001/getLeague");
        if (response?.data) {
          // console.log("League Team Name:", JSON.stringify(response.data, null, 2));
          setTeamName(response.data);

          // console.log("Team Name:",teamName);
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
            <Text style={styles.headerTxt}>FAST NU LEAGUES</Text>
          </View>
        
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {teamName.map((item) => (
          <TouchableOpacity
            key={item.nname}
            onPress={() => navigation.navigate("FASTLeaguesMenu", { nname: item.nname })}
            style={styles.card}
          >
            <View style={styles.containerItemBtn}>
              <Text style={styles.itemTitle}>{item.nname}</Text>
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
    backgroundColor: "#0d1b2a",
    paddingTop: 30,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#0d1b2a",
    width: windowWidth,
    height: windowHeight,
    padding: windowWidth * 0.04,
  },
  containerOne: {
    backgroundColor: "#0d1b2a",
    padding: windowWidth * 0.02,
  },
  containerTwo: {
    backgroundColor: "#0d1b2a",
    padding: windowWidth * 0.02,
    marginTop: windowWidth * 0.02,
    marginLeft: windowWidth * 0.02,
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
  itemTitle: {
    fontSize: windowWidth * 0.04,
    fontWeight: "500",
    color: "#000000",
    
  },

  scrollContainer: {
    padding: 10,
  },
  containerItemBtn: {
    backgroundColor: "#FFFFFF",
    padding: windowWidth * 0.04,
    borderRadius: 8,
    marginBottom: windowWidth * 0.03,
  },
});

export default FASTLeagues;

