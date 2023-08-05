import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

const ItemDetailsScreen = ({ route,navigation }) => {
  const { item } = route.params;
  const [equipmentList, setEquipmentList] = useState(item.equipment);

  const handleBooking = () => {
    const totalCount = equipmentList.reduce((total, equipment) => total + equipment.quantity, 0);
    if (totalCount > 0) {
      // Perform the booking action or navigate to 'Booking' screen
      // navigation.navigate('Booking', { item, quantity: totalCount });
    }
  };

  const onPressBack = () => {
    navigation.navigate("EquipmentBooking");
  };


const decrementQuantity = (equipmentId) => {
  setEquipmentList((prevList) =>
    prevList.map((equipment) =>
      equipment.id === equipmentId
        ? {
            ...equipment,
            quantity: Math.max(equipment.quantity - 1, 0),
            maxQuantity: Math.min(equipment.maxQuantity + 1, equipment.maxQuantity),
          }
        : equipment
    )
  );
};

const incrementQuantity = (equipmentId) => {
  setEquipmentList((prevList) =>
    prevList.map((equipment) =>
      equipment.id === equipmentId
        ? {
            ...equipment,
            quantity: Math.min(equipment.quantity + 1, equipment.maxQuantity),
            maxQuantity: Math.max(equipment.maxQuantity - 1, equipment.maxQuantity),
          }
        : equipment
    )
  );
};


  // const totalAvailableItems = item.equipment.reduce(
  //   (total, equipment) => total + equipment.maxQuantity - equipment.quantity,
  //   0
  // );


  // const getStatusText = (equipment) => {
  //   if (equipment.maxQuantity === 0) {
  //     return 'Not available';
  //   } else if (equipment.quantity === equipment.maxQuantity) {
  //     return 'Available';
  //   } else {
  //     return `Available - ${equipment.maxQuantity - equipment.quantity} left`;
  //   }
  // };
  const totalItemCount = equipmentList.reduce((total, equipment) => total + equipment.quantity, 0);

  return (
    <SafeAreaView style={styles.mainContainer}>
       <Ionicons
          onPress={onPressBack}
          name="arrow-back-outline"
          size={20}
          color="#fff"
          style={styles.containerBtn}
        />
      <View style={styles.container}>
       
        <View style={styles.containerOne}>
          <Text style={styles.itemText}>{item.title}</Text>
          {/* <Text style={styles.itemStatus}>{getStatusText(item)}</Text> */}

        </View>
        
        {equipmentList.map((equipment) => (
          <View key={equipment.id} style={styles.equipmentContainer}>
            
            <Text style={styles.equipmentName}>{equipment.name}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => decrementQuantity(equipment.id)}
                style={[
                  styles.quantityButton,
                  equipment.quantity === 0 && styles.disabledButton,
                  equipment.maxQuantity === 0 && styles.disabledButton,
                ]}
                disabled={equipment.quantity === 0 || equipment.maxQuantity === 0}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{equipment.quantity}</Text>
              <TouchableOpacity
                onPress={() => incrementQuantity(equipment.id)}
                style={[
                  styles.quantityButton,
                  equipment.quantity === equipment.maxQuantity && styles.disabledButton,
                  equipment.maxQuantity === 0 && styles.disabledButton,
                ]}
                disabled={equipment.quantity === equipment.maxQuantity || equipment.maxQuantity === 0}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.maxCountText}>Remaining: {equipment.maxQuantity - equipment.quantity}</Text>
          </View>
        ))}
        <TouchableOpacity
          onPress={handleBooking}
          style={[styles.bookButton, totalItemCount === 0 && styles.disabledButton]}
          disabled={totalItemCount === 0}
        >
          <Text style={styles.buttonText}>
            Book {totalItemCount} {totalItemCount === 1 ? 'Item' : 'Items'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#0d1b2a",

  },
  container: {
    flex: 1,
    padding: 20,
   
  },
   containerOne: {
    backgroundColor: "#0d1b2a",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTwo: {
    backgroundColor: "#0d1b2a",
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
  },
  itemText: {
    fontSize: 25,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,


  },
  itemStatus: {
    color: '#ffffff',
    marginBottom: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  equipmentContainer: {
    flexDirection: 'row',
    backgroundColor: "#283442",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: 'bold',
        color: '#ffffff',

  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',  },
  quantityButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  bookButton: {
    backgroundColor: '#0077b6',
    padding: 10, 
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
  totalAvailableText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
   maxCountText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
    paddingLeft:20,
  },
  containerBtn: {
    top: 20,
    zIndex: 1,
    padding: 5,
    margin: 5,
  },
});

export default ItemDetailsScreen;
