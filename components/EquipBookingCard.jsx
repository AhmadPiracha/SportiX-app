import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EquipBookingCard = ({ booking }) => {

    const {type,displayName,userRollNo,name,status,timeSlotDuration} = booking;
    return (
        <View style={styles.container}>
            <View style={styles.leftCard}>
                <Text style={styles.eventName}>{name}</Text>
                <Text style={styles.ticketHead}>Name</Text>
                <Text style={styles.ticketInfo}>{displayName}</Text>
                <Text style={styles.ticketHead}>Roll No</Text>
                <Text style={styles.ticketInfo}>{userRollNo}</Text>

                <Text style={styles.ticketInfo}>{type}</Text>
                <Text style={styles.ticketInfo}>Status: {status}</Text>
            </View>
            <View style={styles.rightCard}>
                <Text style={styles.ticketInfo}>Time Slot: {timeSlotDuration}</Text>
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
marginTop: 5,
    },
    ticketHead:{
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
