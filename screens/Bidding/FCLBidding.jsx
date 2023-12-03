// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

// const FCLBidding = () => {
//   const [events, setEvents] = useState([
//     { id: '1', name: 'Football Match 1', bidAmount: 10 },
//   ]);

//   const handleBid = (eventId) => {
//     // Implement bidding logic here
//     console.log(`Placed bid for event ${eventId}`);
//   };

//   const renderEventItem = ({ item }) => (
//     <View style={styles.eventItem}>
//       <Text style={styles.eventName}>{item.name}</Text>
//       <Text style={styles.bidAmount}>Bid Amount: ${item.bidAmount}</Text>
//       <TouchableOpacity onPress={() => handleBid(item.id)} style={styles.bidButton}>
//         <Text style={styles.bidButtonText}>Place Bid</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Sports Bidding Game</Text>
//       <FlatList
//         data={events}
//         keyExtractor={(item) => item.id}
//         renderItem={renderEventItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   eventItem: {
//     marginBottom: 16,
//     padding: 16,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//   },
//   eventName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   bidAmount: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   bidButton: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 4,
//   },
//   bidButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

// export default FCLBidding;



import React from 'react'
import CustomBidding from '../../components/CustomBidding'

const FCLBidding = () => {
  return (
   <CustomBidding type="FAST Cricket League" />
  )
}

export default FCLBidding
