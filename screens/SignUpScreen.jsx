// SignUpScreen.jsx
import React, { useState } from "react";
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

import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, db } from "../database/firebase";
import { Keyboard } from "react-native";
import { SHA256 } from "crypto-js";
import { StyleSheet } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    // Keyboard.dismiss();
    let isValid = true;

    if (!displayName) {
      handleError("Please input your Full Name", "Full Name");
      setDisplayName("");
      isValid = false;
    } else if (!displayName.match(/^[a-zA-Z ]+$/)) {
      handleError("Please input a valid name", "Full Name");
      setDisplayName("");
      isValid = false;
    } else {
      db.collection("users")
        .where("displayName", "==", displayName)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            handleError("Name already exists", "Full Name");
            setDisplayName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            isValid = false;
          }
        });

      console.log("Name is valid");
    }

    if (!email) {
      handleError("Please input email", "email");
      setEmail("");
      isValid = false;
    } else if (!email.match(/^[a-z0-9._%+-]+@cfd\.nu\.edu\.pk$/)) {
      handleError("Please input a valid email", "email");
      setEmail("");
      isValid = false;
    } else {
      db.collection("users")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            handleError("Email already exists", "email");
            setDisplayName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            isValid = false;
          }
        });
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

    if (!confirmPassword) {
      handleError("Please input confirm password", "confirmPassword");
      setConfirmPassword("");
      isValid = false;
    }
    else if (confirmPassword.length < 6) {
      handleError("Min password length of 6", "password");
      setPassword("");
      isValid = false;
    }
     else if (password !== confirmPassword) {
      handleError("Password does not match", "confirmPassword");
      setPassword("");
      setConfirmPassword("");
      isValid = false;
    }

    if (isValid) {
      registerUser();
    }
  };

  const handleError = (error, val) => {
    setError((prev) => ({ ...prev, [val]: error }));
  };

  const updateInputVal = (val, prop) => {
    const state = { displayName, email, password, confirmPassword, isLoading };
    state[prop] = val;
    setDisplayName(state.displayName);
    setEmail(state.email);
    setPassword(state.password);
    setConfirmPassword(state.confirmPassword);
    setIsLoading(state.isLoading);
  };

  const registerUser = async () => {
    setIsLoading(true);
  
    const passwordHash = SHA256(password).toString();
  
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, passwordHash);
      const user = userCredential.user;
  
      // Send email verification
      await user.sendEmailVerification();
  
      const userData = {
        displayName: displayName,
        email: email,
        password: passwordHash,
      };
  
      // Add user data to Firestore collection
      await db.collection("users").doc(user.uid).set(userData);
  
      console.log("User registered successfully!");
      setIsLoading(false);
      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigation.navigate("Welcome");
    } catch (error) {
      setIsLoading(false);
      Alert.alert(error.message);
    }
  };


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
       

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/images/SignUpImg.png")}
            style={styles.loginPageImage}
          />
        </View>

        {/* SIGN UP SCREEN */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Register Now</Text>
        </View>

      
        {/* OR TEXT */}
        <Text style={styles.orText}>Register with you CFD email</Text>

        {/* TEXT FIELD FOR FULL NAME */}
        <View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#AD40AF"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={displayName}
              onChangeText={(val) => updateInputVal(val, "displayName")}
            />
          </View>
          {error ? (
            <Text style={styles.errorText}>{error.displayName}</Text>
          ) : null}
        </View>

        {/* TEXT FIELD FOR EMAIL */}
        <View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#AD40AF"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="f190123@cfd.nu.edu.pk"
              keyboardType="email-address"
              value={email}
              autoCapitalize="none"
              onChangeText={(val) => updateInputVal(val, "email")}
            />
          </View>
          {error.email ? (
            <Text style={styles.errorText}>{error.email}</Text>
          ) : null}
        </View>

        {/* TEXT FIELD FOR PASSWORD */}
        <View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#AD40AF"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(val) => updateInputVal(val, "password")}
              secureTextEntry={hidePassword}
              autoCapitalize="none"
              maxLength={8}
            />

            <Ionicons
              onPress={() => setHidePassword(!hidePassword)}
              name={hidePassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#AD40AF"
            />
          </View>
          {error.password ? (
            <Text style={styles.errorText}>{error.password}</Text>
          ) : null}
        </View>

        {/* TEXT FIELD FOR CONFIRM PASSWORD */}
        <View>
          <View style={styles.inputContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#AD40AF"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={(val) => updateInputVal(val, "confirmPassword")}
              secureTextEntry={hideConfirmPassword}
              autoCapitalize="none"
              maxLength={8}
            />

            <Ionicons
              onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
              name={hideConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#AD40AF"
            />
          </View>
          {error.confirmPassword ? (
            <Text style={styles.errorText}>{error.confirmPassword}</Text>
          ) : null}
        </View>

        {/* REGISTER BUTTON */}
        <TouchableOpacity style={styles.registerButton} 
        onPress={validate}>

          <Text style={styles.registerButtonText}>Sign up</Text>
        </TouchableOpacity>

        {/* HAVE AN ACCOUNT SignIn */}
        <View style={styles.loginContainer}>
          <Text>Have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  contentContainer: {
    paddingHorizontal: 25,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  headingContainer: {
    alignItems: "center",
  },
  headingText: {
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 30,
  },
  googleLoginButton: {
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#AD40AF",
  },
  googleLoginButtonText: {
    color: "#fff",
    fontWeight: "700",
    marginRight: 3,
  },
  orText: {
    textAlign: "center",
    color: "#AD40AF",
    marginBottom: 15,
    marginTop: 10,
    fontWeight: "300",
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
  input: {
    flex: 1,
    paddingVertical: 0,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  registerButton: {
    borderRadius: 5,
    backgroundColor: "#AD40AF",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#AD40AF",
    fontWeight: "700",
  },
  loginPageImage: {
    width: 400,
    height: 200,
    resizeMode: "contain",
  },
});
