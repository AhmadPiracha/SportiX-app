import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth, db } from "../database/firebase";
import { Picker } from '@react-native-picker/picker';
import { windowWidth, windowHeight } from '../utils/dimensions';
import { Table, Row } from 'react-native-table-component';
import axios from "axios";
import { biddingPrice } from '../model/matchesData'; import { Ionicons } from "@expo/vector-icons";


const CustomBidding = ({ navigation,route }) => {
    var basePrice = 2000;
    const { League_name } = route.params;
    const [sportsBiddingTeam, setSportsBiddingTeam] = useState([]);
    const [biddingAmount, setBiddingAmount] = useState(0);
    const [selectedTeam, setSelectedTeam] = useState("Select Team");

    const [userEmail, setUserEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [team] = useState('');

    const [tableData, setTableData] = useState([
        displayName,
        team,
        biddingAmount,
    ])

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://192.168.1.8:5001/viewAllBiddings?league=${League_name}`);
            if (response?.data) {
                setTableData(response.data.map(item => [item.displayName, item.team, item.biddingAmount]));
                // console.log(JSON.stringify(response.data, null, 2));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const doc = await db.collection("users").doc(auth.currentUser.uid).get();
                if (doc.exists) {
                    const userData = doc.data();
                    // console.log("User Data:", JSON.stringify(userData, null, 2));
                    setUserEmail(userData.email);
                    setDisplayName(userData.displayName);

                }
            }
            catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const postData = async () => {
            try {
                const response = await axios.get(`http://192.168.1.8:5001/getLeagueTeams?League_Name=${League_name}`);
                if (response?.data) {
                    setSportsBiddingTeam(response.data.map(item => item.name));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        postData();
    }, []);

    const handleBidding = async () => {
        const userRollNo = userEmail.match(/([a-z]\d+)/i)[0];

        if (selectedTeam === "Select Team" || !selectedTeam) {
            Alert.alert("Team Selection Required", "Please select a team for bidding.");
            return;
        }

        const totalAmount = basePrice + biddingAmount;

        const BiddingInfo = {
            team: selectedTeam,
            biddingAmount: totalAmount,
        };

        Alert.alert(
            "Confirm Bid",
            `Are you sure you want to place a bid of ${totalAmount} for ${selectedTeam} in ${League_name} league?`,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Bid Cancelled"),
                    style: "cancel"
                },
                {
                    text: "Place Bid",
                    onPress: async () => {
                        try {
                            const response = await axios.post('http://192.168.1.8:5001/placeBid', {
                                displayName: displayName,
                                userRollNo,
                                team: selectedTeam,
                                league: League_name,
                                basePrice,
                                biddingAmount,
                            });

                            console.log(response.data); // Log the server response

                            if (response.data.success) {
                                Alert.alert(
                                    "Successful Bid",
                                    `Congratulations! Your bid of ${totalAmount} for ${selectedTeam} in ${League_name} was successful.`,
                                    [
                                        {
                                            text: "OK",
                                            onPress: () => {
                                                setSelectedTeam("Select Team");
                                                setBiddingAmount(0);
                                                // Refetch the data to update the displayed bids
                                                fetchData();
                                            },
                                            style: "cancel"
                                        },
                                    ]
                                );
                            } else {
                                Alert.alert(
                                    "Bid Unsuccessful",
                                    `Oops! Your bid of ${totalAmount} for ${selectedTeam} in ${League_name} was not successful. Please try again with a higher bid.`,
                                    [
                                        {
                                            text: "OK",
                                            onPress: () => { },
                                            style: "cancel"
                                        },
                                    ]
                                );
                            }

                        } catch (error) {
                            console.error('Error Bidding:', error);
                            Alert.alert("Error", "There was an error processing your bid. Please try again later.");
                        }
                    },
                },
            ]
        );
    };
    const clearSelections = () => {
        setSelectedTeam("Select Team");
        setBiddingAmount(0);

    };
    const onPressBack = () => {
        navigation.navigate("Bidding");
    };
    return (
        <View style={styles.container}>
            <View style={styles.containerOne}>
                <Ionicons
                    onPress={onPressBack}
                    name="arrow-back-outline"
                    size={20}
                    color="#000"
                    style={styles.backButton}
                />
                <View style={styles.headerGameContainer}>
                    <Text style={styles.headerGameTxt}>{League_name}</Text>
                </View>
            </View>
            <View style={styles.mainContainer} >
                <View style={styles.headerTableContainer}>
                    {tableData.length > 0 ? (
                        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                            <Row data={['Name', 'Team Name', 'Bidding Amount']} style={styles.head} textStyle={styles.text} />
                            {tableData.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    style={[styles.row, index % 2 && { backgroundColor: '#ffffff' }]}
                                    textStyle={styles.text}
                                />
                            ))}
                        </Table>
                    ) : (
                        <Text style={styles.noBookingsText}>No Bids found.</Text>
                    )

                    }
                </View>

                <View style={styles.headerContainer}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={selectedTeam}
                            onValueChange={(itemValue) => setSelectedTeam(itemValue)}
                        >
                            <Picker.Item label="Select Team" value="Select Team" />
                            {sportsBiddingTeam.map((item, index) => (
                                <Picker.Item key={index} label={item} value={item} />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.txtHeading}>
                        Base Price : {basePrice}
                    </Text>
                </View>
                <View style={styles.headerContainer}>
                    <View style={styles.pickerContainer}>
                        <Picker
                            style={styles.picker}
                            selectedValue={biddingAmount}
                            onValueChange={(itemValue) => setBiddingAmount(itemValue)}
                        >
                            {biddingPrice.map((item, index) => (
                                <Picker.Item key={index} label={String(item.price)} value={item.price} />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View style={styles.headerContainer}>
                    <Text style={styles.txtHeading}>
                        Total : {basePrice + biddingAmount}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={handleBidding}
                    style={styles.bookButton}
                >
                    <Text style={styles.bookButtonText}>Make Bid</Text>
                </TouchableOpacity>




                <TouchableOpacity onPress={clearSelections} style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Clear Selections</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#fff",
    },
    txtHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 10,
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
    headerTableContainer: {
        marginVertical: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: '#000000',
    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff',
        borderBottomWidth: 2,
        borderBottomColor: '#000000',
    },
    row: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
    },
    text: {
        textAlign: 'center',
        fontWeight: '600',
        color: '#000000',
    },
    noBookingsText: {
        textAlign: 'center',
        color: '#000000',
        marginTop: 10,
    },
    backButton: {
        marginRight: 10,
        color: "#fff",
        marginTop: 10,
        
    },


});

export default CustomBidding;
