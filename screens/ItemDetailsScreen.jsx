import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { timeSlots } from '../model/matchesData';
import { auth, db } from "../database/firebase";

const ItemDetailsScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [displayName, setDisplayName] = useState('');

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
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.10.7:5001/getProducts?type=${type}`);
        const data = await response.json();

        // console.log("Data fetched successfully:", JSON.stringify(data, null, 2));

        const equipmentDataWithQuantity = data.map(equipment => ({
          ...equipment,
          quantity: 0,
        }));

        setEquipmentList(equipmentDataWithQuantity);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [type]);

  const handleBooking = () => {
    if (selectedTimeSlot === null) {
      // alert('Please select a time slot to book');
      Alert.alert('Alert', 'Please select a time slot to book');

      return;
    }

    const totalCount = equipmentList.reduce((total, equipment) => total + equipment.quantity, 0);
    if (totalCount === 0) {
      Alert.alert('Alert', 'Please select at least one item to book');
      return;
    }
    else if (totalCount > 0) {
      const selectedEquipments = equipmentList.filter(equipment => equipment.quantity > 0);
      const equipmentNames = selectedEquipments.map(equipment => `${equipment.name} (${equipment.quantity})`).join(', ');
      Alert.alert(
        'Confirm Booking',
        `Are you sure you want to book the following items?\n\n${equipmentNames}`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Book',
            onPress: () => {
              // Perform the booking
              const userRollNo = userEmail.match(/([a-z]\d+)/i)[0];
              const bookingData = {
                type: type,
                name: equipmentNames,
                count: totalCount,
                timeSlotDuration: selectedTimeSlot.duration,
                userRollNo,
                displayName: displayName,
              };

              fetch('http://192.168.10.7:5001/equipment_booking', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Network response was not ok');
                  }
                  return response.json();
                })
                .then(data => {
                  console.log('Booking Response Data:', JSON.stringify(data, null, 2));
                  resetStateValues();
                  Alert.alert('Success', 'Your booking request is Forwarded to Sports Officer.');
                })
                .catch(error => {
                  console.error('Error making booking request:', error);
                });
            },
          },
        ]
      );
    }
  };

  const onPressBack = () => {
    navigation.navigate('Equipment Booking');
  };

  const decrementQuantity = (equipmentId) => {
    setEquipmentList((prevList) =>
      prevList.map((equipment) =>
        equipment.id === equipmentId
          ? {
            ...equipment,
            quantity: Math.max(equipment.quantity - 1, 0),
          }
          : equipment
      )
    );
  };

  const incrementQuantity = (equipmentId) => {
    const updatedEquipmentList = equipmentList.map((equipment) => {
      if (equipment.id === equipmentId) {
        if (equipment.quantity < equipment.count) {
          return {
            ...equipment,
            quantity: equipment.quantity + 1,
          };
        }
      }
      return equipment;
    });
    setEquipmentList(updatedEquipmentList);
  };

  const resetEquipmentQuantity = () => {
    setEquipmentList((prevList) =>
      prevList.map((equipment) => ({
        ...equipment,
        quantity: 0,
      }))
    );
  };

  const clearSelections = () => {
    setSelectedTimeSlot(null);
    resetEquipmentQuantity();
  };

  const resetStateValues = () => {
    setSelectedTimeSlot(null);
    resetEquipmentQuantity();
  };

  const totalItemCount = equipmentList.reduce((total, equipment) => total + equipment.quantity, 0);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Ionicons onPress={onPressBack} name="arrow-back-outline" size={20} color="#fff" style={styles.containerBtn} />
      <View style={styles.container}>
        <View style={styles.containerOne}>
          <Text style={styles.itemText}>{type}</Text>
        </View>
        <ScrollView>
          <View style={styles.containerTwo}>
            <View style={styles.timeSlotContainer}>
              <Text style={styles.timeSlotHeading}>Time Slots</Text>
              {timeSlots.map((timeSlot) => (
                <TouchableOpacity
                  key={timeSlot.id}
                  style={[
                    styles.timeSlotButton,
                    selectedTimeSlot && selectedTimeSlot.id === timeSlot.id && styles.selectedTimeSlotButton,
                  ]}
                  onPress={() => setSelectedTimeSlot(timeSlot)}
                >
                  <Text
                    style={[
                      styles.timeSlotText,
                      selectedTimeSlot && selectedTimeSlot.id === timeSlot.id && styles.selectedTimeSlotText,
                    ]}
                  >
                    {timeSlot.duration}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {equipmentList.map((equipment) => (
              <View key={equipment.id}>
                <View style={styles.equipmentContainer}>
                  <Text style={styles.equipmentName}>{equipment.name}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => decrementQuantity(equipment.id)}
                      style={[
                        styles.quantityButton,
                        equipment.quantity === 0 && styles.disabledButton,
                        equipment.count === 0 && styles.disabledButton,
                      ]}
                      disabled={equipment.quantity === 0 || equipment.count === 0}
                    >
                      <Text style={styles.buttonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{equipment.quantity}</Text>

                    {equipment.count - equipment.quantity > 0 ? (
                      <TouchableOpacity
                        onPress={() => incrementQuantity(equipment.id)}
                        style={[
                          styles.quantityButton,
                          equipment.quantity === equipment.count && styles.disabledButton,
                          equipment.count === 0 && styles.disabledButton,
                        ]}
                        disabled={equipment.quantity === equipment.count || equipment.count === 0}
                      >
                        <Text style={styles.buttonText}>+</Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={[styles.quantityButton, styles.disabledButton]}>
                        <Text style={styles.buttonText}>+</Text>
                      </View>
                    )}

                  </View>
                </View>
                <Text style={styles.maxCountText}>Remaining: {equipment.count - equipment.quantity}</Text>
              </View>
            ))}
            <TouchableOpacity
              onPress={handleBooking}
              style={[styles.bookButton, totalItemCount === 0 && styles.disabledButton]}
              disabled={totalItemCount === 0}
            >
              <Text style={styles.buttonText}>Book {totalItemCount} {totalItemCount <= 1 ? 'Item' : 'Items'}</Text>
            </TouchableOpacity>
            {selectedTimeSlot || totalItemCount > 0 ? (
              <TouchableOpacity onPress={clearSelections} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Clear Selections</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
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
    padding: 15,

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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#283442",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
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
    justifyContent: 'flex-end',
  },
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
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBtn: {
    top: 20,
    zIndex: 1,
    padding: 5,
    margin: 5,
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
});

export default ItemDetailsScreen;
