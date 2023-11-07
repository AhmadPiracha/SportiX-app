import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { windowWidth, windowHeight } from "../utils/dimensions";

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    account: {
      editProfile: true,
      security: true,
      notifications: true,
      privacy: true,
    },
    supportAndAbout: {
      helpAndSupport: true,
      termsAndPolicies: true,
      cacheAndCellular: {
        freeUpSpace: true,
        dataSaver: true,
      },
    },
  });

  const handleChangeSetting = (settingName, value) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [settingName]: value,
    }));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="ios-arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.header}>Settings</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity onPress={() => handleChangeSetting("account.editProfile", !settings.account.editProfile)}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleChangeSetting("account.security", !settings.account.security)}>
            <Text style={styles.buttonText}>Security</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleChangeSetting("account.notifications", !settings.account.notifications)}>
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleChangeSetting("account.privacy", !settings.account.privacy)}>
            <Text style={styles.buttonText}>Privacy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & About</Text>

          <TouchableOpacity onPress={() => handleChangeSetting("supportAndAbout.helpAndSupport", !settings.supportAndAbout.helpAndSupport)}>
            <Text style={styles.buttonText}>Help & Support</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleChangeSetting("supportAndAbout.termsAndPolicies", !settings.supportAndAbout.termsAndPolicies)}>
            <Text style={styles.buttonText}>Terms and Policies</Text>
          </TouchableOpacity>

          <View style={styles.nestedSection}>
            <Text style={styles.nestedSectionTitle}>Cache & Cellular</Text>

            <TouchableOpacity onPress={() => handleChangeSetting("supportAndAbout.cacheAndCellular.freeUpSpace", !settings.supportAndAbout.cacheAndCellular.freeUpSpace)}>
              <Text style={styles.buttonText}>Free Up Space</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handleChangeSetting("supportAndAbout.cacheAndCellular.dataSaver", !settings.supportAndAbout.cacheAndCellular.dataSaver)}>
              <Text style={styles.buttonText}>Data Saver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0", 
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  section: {
    marginTop: 16,
    backgroundColor: "lightgrey",
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nestedSection: {
    marginTop: 12,
  },
  nestedSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 16,
    padding: 8,
  },
});

export default SettingsScreen;
