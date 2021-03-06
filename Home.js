import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import "@firebase/auth";
import FirebaseKeys from "./FirebaseKeys";
const firebaseConfig = {
  apiKey: "AIzaSyALc3LJdCzNeP3fbeV2MvTLYDbH8dP-Q-8",
  authDomain: "madeendb2.firebaseapp.com",
  databaseURL: "https://madeendb2.firebaseio.com",
  projectId: "madeendb2",
  storageBucket: "madeendb2.appspot.com",
  messagingSenderId: "814154412010",
  appId: "1:814154412010:web:435cac99ae40206a1ecc93",
  measurementId: "G-SXS9Z8NESC",
};

  firebase.initializeApp(firebaseConfig);


export default function Home({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Bahij_TheSansArabic-Bold": require("./assets/fonts/Bahij_TheSansArabic-Bold.ttf"),
    "Bahij_TheSansArabic-Light": require("./assets/fonts/Bahij_TheSansArabic-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Image style={styles.logo} source={require("./assets/logo.png")} />

        <LinearGradient
          colors={["#FCFCFC", "#EEF2ED"]}
          style={{
            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,
            width: Dimensions.get("window").width * 2.1,
            height: Dimensions.get("window").width * 3,
            left: -440,
            top: -55,
            position: "absolute",
          }}
        >
          <Text> </Text>
        </LinearGradient>

        <TouchableOpacity
          style={[styles.Gbutton, { backgroundColor: "#57694C" }]}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}> إنشاء حساب </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.Wbutton, { backgroundColor: "#FFFF" }]}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={styles.buttonText}> تسجيل الدخول </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  Gbutton: {
    top: 230,
    marginTop: 0,
    height: 56,
    width: 300,
    alignItems: "center",
    padding: 5,
    borderRadius: 25,
    marginLeft: 0,
    marginBottom: 0,
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowColor: "grey",
    shadowOpacity: 0.8,
  },
  Wbutton: {
    top: 80,
    marginTop: 0,
    height: 56,
    width: 300,
    alignItems: "center",
    padding: 5,
    borderRadius: 25,
    marginLeft: 0,
    marginBottom: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
  },
  buttonText: {
    textAlign: "center",
    marginTop: 4,
    fontSize: 25,
    fontFamily: "Bahij_TheSansArabic-Light",
  },
  logo: {
    alignItems: "center",
    marginLeft: 0,
    marginBottom: 0,
    width: 210,
    height: 170,
    resizeMode: "stretch",
    position: "absolute",
    left: 50,
    bottom: 150,
    zIndex: 2,
  },

  background: {
    alignItems: "center",
    marginLeft: 0,
    marginBottom: 0,
    width: 375,
    height: 385,
    resizeMode: "stretch",
    position: "absolute",
    left: -40,
    top: 2,
    zIndex: -1,
  },
  // Get a reference to the database service
});
