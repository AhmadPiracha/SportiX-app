import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomDrawerButton = ({ title,logoName, handleButtonCLick }) => {

    return (
        <TouchableOpacity onPress={handleButtonCLick} style={styles.mainContainer}>
            <View style={styles.container}>
                <Ionicons name={logoName} size={22} />
                <Text style={styles.text}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomDrawerButton

const styles = StyleSheet.create({
   
    mainContainer: {
        paddingVertical: 15
    },
    container: {
        flexDirection: "row",
        alignItems: "center"
    },
    text: {
        fontSize: 15,
        marginLeft: 5,
    }

})