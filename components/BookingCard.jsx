import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookingCard = ({ booking }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftCard}>
                <Text style={styles.eventName}>Type: {booking.type}</Text>
                <Text style={styles.ticketInfo}>Name: {booking.displayName}</Text>
                <Text style={styles.ticketInfo}>Roll No: {booking.userRollNo}</Text>
                <Text style={styles.ticketInfo}>Items: {booking.name}</Text>
                <Text style={styles.ticketInfo}>Time Slot: {booking.timeSlotDuration}</Text>
                <Text style={styles.ticketInfo}>Status: {booking.status}</Text>
            </View>
            <View style={styles.rightCard}>
                <Text style={styles.ticketInfo}>Time Slot: {booking.timeSlotDuration}</Text>
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
        
    },

    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    ticketInfo: {
        fontSize: 16,
        color: '#000000',
    },
});

export default BookingCard;
