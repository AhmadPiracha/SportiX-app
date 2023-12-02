import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { windowWidth, windowHeight } from '../../utils/dimensions';
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { biddingPrice } from '../../model/matchesData';

const FPLBidding = () => {
    const [sportsBiddingTeam, setSportsBiddingTeam] = useState([]);
    const [biddingAmount, setBiddingAmount] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://192.168.10.8:5001/getLeagueTeams?League_Name=FAST Cricket League");
                if (response?.data) {
                    setSportsBiddingTeam(response.data.map(item => item.name));
                    // console.log("Teams:", JSON.stringify(response.data, null, 2));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.containerOne}>
                <View style={styles.headerGameContainer}>
                    <Text style={styles.headerGameTxt}>Bidding</Text>
                </View>
            </View>
            <View style={styles.mainContainer} >
                <View style={styles.TeamContainer}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={sportsBiddingTeam.length > 0 ? sportsBiddingTeam[0] : "Select Team"}
                            onValueChange={(itemValue) => setSportsBiddingTeam(itemValue)}
                        >
                            {sportsBiddingTeam.map((item, index) => {
                                console.log("team", item);
                                return (
                                    <Picker.Item key={index} label={item} value={item} />
                                );
                            })}
                        </Picker>
                    </View>
                </View>
                <View style={styles.AmountContainer}>
                <View style={styles.pickerContainer}>
                    <Picker
                        style={styles.picker}
                        selectedValue={biddingAmount}
                        onValueChange={(itemValue) => setBiddingAmount(itemValue)}
                    >
                        {biddingPrice.map((item, index) => (
                            console.log("price", item),
                            <Picker.Item key={index} label={String(item.price)} value={item.price} />
                        ))}

                    </Picker>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.bookButton}
                >
                    <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "#0d1b2a",
    },
    containerOne: {
        padding: windowWidth * 0.02,
    },
    mainContainer: {
        width: '100%',
        maxWidth: 400,
    },
    headerContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#fff",
    },
    timeSlotHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
        marginLeft: 10,
    },


    timeSlotButton: {
        flexDirection: 'row',
        backgroundColor: '#0077b6',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
    },

    selectedTimeSlotButton: {
        backgroundColor: '#004466',
    },

    timeSlotText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    selectedTimeSlotText: {
        color: '#fff',
    },

    clearButton: {
        backgroundColor: '#b30000',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    pickerContainer: {
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,

        color: "#fff",
    },
    picker: {
        width: '100%',
        color: "#fff",
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: "#fff",
    },
    datePicker: {
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        color: "#fff",
    },
    bookButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    bookButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    disabledButton: {
        backgroundColor: 'gray',
    },
    containerBtn: {
        marginTop: windowWidth * 0.03,
        marginLeft: windowWidth * 0.02,
    },
    headerGameContainer: {
        flexDirection: "row",
        marginHorizontal: windowWidth * 0.02,
        marginVertical: windowWidth * 0.02,
        justifyContent: "center",
        alignItems: "center",
    },
    headerGameTxt: {
        fontSize: windowWidth * 0.05,
        fontWeight: "600",
        color: "#fff",


    },
});

export default FPLBidding
