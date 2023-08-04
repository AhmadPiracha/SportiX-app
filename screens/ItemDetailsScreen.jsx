
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ItemDetailsScreen = ({ route }) => {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(item.quantity);

  const handleBooking = () => {
    if (quantity > 0) {
      // Perform the booking action or navigate to 'Booking' screen
      // navigation.navigate('Booking', { item, quantity });
    }  };

  const incrementQuantity = () => {
    if (quantity < item.maxQuantity) {
      setQuantity(prevQuantity => Math.min(prevQuantity + 1, item.maxQuantity));
    }
  };

  const decrementQuantity = () => {
    if (quantity > 0) { // Ensure quantity does not go below 0
      setQuantity(prevQuantity => Math.max(prevQuantity - 1, 0));
    }
  };

  const totalAvailableItems = item.maxQuantity - item.quantity;

  const getStatusText = () => {
    if (totalAvailableItems === 0) {
      return "Not available";
    } else if (totalAvailableItems === item.maxQuantity) {
      return "Available";
    } else {
      return `Available - ${totalAvailableItems} left`;
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.itemText}>{item.title}</Text>
        <Text style={styles.itemStatus}>{getStatusText()}</Text>
        <Text style={styles.totalAvailableText}>
          Total Available Items: {totalAvailableItems}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={decrementQuantity}
            style={[
              styles.quantityButton,
              quantity === 0 && styles.disabledButton,
              totalAvailableItems === 0 && styles.disabledButton,
            ]}
            disabled={quantity === 0 || totalAvailableItems === 0}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            onPress={incrementQuantity}
            style={[
              styles.quantityButton,
              quantity === item.maxQuantity && styles.disabledButton,
              totalAvailableItems === 0 && styles.disabledButton,
            ]}
            disabled={quantity === item.maxQuantity || totalAvailableItems === 0}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleBooking}
          style={[
            styles.bookButton,
            quantity === 0 && styles.disabledButton,
          ]}
          disabled={quantity === 0}
        >
          <Text style={styles.buttonText}>Book {quantity} Items</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ItemDetailsScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemStatus: {
    color: '#888',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 18,
  },
  bookButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
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

});

