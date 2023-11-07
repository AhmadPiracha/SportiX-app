import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EquipBookingCard = ({ booking }) => {

    const { type, displayName, userRollNo, name, status, timeSlotDuration, booking_date } = booking;
    // console.log("Value of booking_date:", booking_date);

    var dateBook = null;

    if (booking_date == null || booking_date == undefined) {
        // console.error("booking_date is null or undefined.");
        dateBook = "Not Available";

    } else {
        dateBook = booking_date.split('T')[0];
    }
    return (
        <View style={styles.container}>
            <View style={styles.leftCard}>
                <Text style={styles.eventName}>Booked Item: {name}</Text>
                <Text style={styles.ticketHead}>Name: {displayName}</Text>
                <Text style={styles.ticketHead}>Roll No: {userRollNo}</Text>
                <Text style={styles.ticketHead}>Sports: {type}</Text>
                <Text style={styles.ticketHead}>Booked Date: {dateBook}</Text>
            </View>
            <View style={styles.rightCard}>
                <Text style={styles.ticketInfo}>Time Slot: {timeSlotDuration}</Text>
                <Text style={styles.ticketInfo}>Status: {status}</Text>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
        padding: 5,

    },
    leftCard: {
        flex: 2,
        backgroundColor: '#007BFF',
        padding: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,

    },
    rightCard: {
        flex: 1,
        backgroundColor: '#90E0EF',
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },

    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 5,
    },
    ticketHead: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    ticketInfo: {
        fontSize: 16,
        color: '#000000',
    },
});

export default EquipBookingCard;
