import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MatchDetailsCard = () => {
  console.log(matches);
  return (
      <SafeAreaView>
        <View>
          <Text>Match Details</Text>
        </View>
      </SafeAreaView>
  );
};

export default MatchDetailsCard;

const styles = StyleSheet.create({});
