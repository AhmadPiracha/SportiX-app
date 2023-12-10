// LoginScreen.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SHA256 } from "crypto-js";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";
import { auth, GoogleProvider, db } from "../database/firebase";
import { signInWithPopup } from "firebase/auth";
import { StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const updateInputVal = (val, prop) => {
    const state = { displayName, email, password, isLoading };
    state[prop] = val;
    setDisplayName(state.displayName);
    setEmail(state.email);
    setPassword(state.password);
    setIsLoading(state.isLoading);
  };

  const validate = () => {
    let isValid = true;

    if (!email) {
      handleError("Please input email", "email");
      setEmail("");
      setPassword("");

      isValid = false;
    } else if (!email.match(/^[a-z0-9._%+-]+@cfd\.nu\.edu\.pk$/)) {
      handleError("Please input a valid email", "email");
      setEmail("");
      setPassword("");

      isValid = false;
    }

    if (!password) {
      handleError("Please input password", "password");
      setPassword("");
      isValid = false;
    } else if (
      !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    ) {
      handleError("Please input a valid password", "password");
      setPassword("");
      isValid = false;
    } else if (password.length < 6) {
      handleError("Min password length of 6", "password");
      setPassword("");
      isValid = false;
    }
    if (isValid) {
      userLogin();
    }
  };

  const handleError = (error, val) => {
    setError((prev) => ({ ...prev, [val]: error }));
  };

  const userLogin = () => {
    setIsLoading(true);

    // Generate hash of the entered password using SHA-256
    const enteredPasswordHash = SHA256(password).toString();
    auth
      .signInWithEmailAndPassword(email, enteredPasswordHash)
      .then(async (res) => {
        const userDoc = db.collection("users").doc(res.user.uid).get();
        const storedPasswordHash = (await userDoc).data().password;

        if (enteredPasswordHash === storedPasswordHash) {
          console.log("User logged in successfully!");

          // Save the user's login status to AsyncStorage
          try {
            await AsyncStorage.setItem("isLoggedIn", "true");
          } catch (error) {
            console.log("Error saving login status to AsyncStorage:", error);
          }

          navigation.navigate("Home");
          setIsLoading(false);
          setDisplayName("");
          setEmail("");
          setPassword("");
          setError("");
        } else {
          setIsLoading(false);
          Alert.alert("Invalid credentials");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert(error.message);
        // console.log(error.message);
      });
  };

  // const userLogin = () => {
  //   setIsLoading(true);

  //   // Generate hash of the entered password using SHA-256
  //   const enteredPasswordHash = SHA256(password).toString();

  //   auth
  //     .signInWithEmailAndPassword(email, enteredPasswordHash)
  //     .then(async (res) => {
  //       const user = res.user;
  //       const userDoc = await db.collection("users").doc(user.uid).get();
  //       const storedPasswordHash = userDoc.data().password;

  //       if (enteredPasswordHash === storedPasswordHash) {
  //         if (user.emailVerified) {
  //           console.log("User logged in successfully!");

  //           // Save the user's login status to AsyncStorage
  //           try {
  //             await AsyncStorage.setItem("isLoggedIn", "true");
  //           } catch (error) {
  //             console.log("Error saving login status to AsyncStorage:", error);
  //           }

  //           navigation.navigate("Home");
  //           setIsLoading(false);
  //           setDisplayName("");
  //           setEmail("");
  //           setPassword("");
  //           setError("");
  //         } else {
  //           setIsLoading(false);
  //           Alert.alert("Please verify your email before logging in.");
  //         }
  //       } else {
  //         setIsLoading(false);
  //         Alert.alert("Invalid credentials");
  //       }
  //     })
  //     .catch((error) => {
  //       setIsLoading(false);
  //       Alert.alert(error.message);
  //     });
  // };


  if (isLoading) {
    return (
      <View
        style={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* LOGO IMAGE */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/logo/sportix-logo.png")}
            style={styles.logoImage}
          />
        </View>

        {/*  Image */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/loginpageImg.png")}
            style={styles.loginPageImage}
          />
        </View>

        {/* SIGN IN SCREEN */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Sign In</Text>
        </View>

        {/* TEXT FIELD FOR EMAIL */}
        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#AD40AF"
              style={styles.icon}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="f190123@cfd.nu.edu.pk"
            keyboardType="email-address"
            value={email}
            autoCapitalize="none"
            onChangeText={(val) => updateInputVal(val, "email")}
            error={error.email}
          />
        </View>
        {error.email ? (
          <Text style={styles.errorText}>{error.email}</Text>
        ) : null}

        {/* TEXT FIELD FOR PASSWORD */}
        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#AD40AF"
              style={styles.icon}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(val) => updateInputVal(val, "password")}
            secureTextEntry={hidePassword}
            autoCapitalize="none"
            error={error.password}
            maxLength={8}
          />
          <Ionicons
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="#AD40AF"
            style={styles.icon}
          />
        </View>
        {error.password ? (
          <Text style={styles.errorText}>{error.password}</Text>
        ) : null}

        {/* LOGIN BUTTON */}
        <CustomButton label={"Log in"} onPress={validate} />

        {/* OR TEXT */}
        <Text style={styles.orText}>Or</Text>

        {/* Google Auth */}

        <CustomButton label={"Sign in with Google"} onPress={() => {
        }} />

        {/* DON'T HAVE AN ACCOUNT SIGNUP */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={styles.signupLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    paddingHorizontal: 25,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  signInContainer: {
    alignItems: "center",
  },
  signInText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomColor: "#AD40AF",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25,
  },
  inputIcon: {
    marginRight: 5,
    marginTop: 3,
  },
  icon: {
    marginRight: 5,
    marginTop: 3,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  forgotPassword: {
    padding: 5,
  },
  forgotPasswordText: {
    color: "#AD40AF",
    fontWeight: "700",
    alignSelf: "flex-end",
  },
  orText: {
    textAlign: "center",
    color: "#AD40AF",
    marginBottom: 10,
    marginTop: 10,
    fontWeight: "700",
  },
  googleLoginButton: {
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#AD40AF",
  },
  googleLoginText: {
    color: "#fff",
    fontWeight: "700",
    marginRight: 3,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    marginRight: 5,
  },
  signupLink: {
    color: "#AD40AF",
    fontWeight: "700",
  },
  loginPageImage: {
    width: 500,
    height: 180,
    resizeMode: "contain",
  },
});
export default LoginScreen;
