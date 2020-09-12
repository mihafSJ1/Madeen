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

/*

import * as firebase from 'firebase';
// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
import "firebase/functions";

import "firebase/storage";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAk1h8iy3kyvm1iE2Bn2QobFbnQlj-thhs",
  authDomain: "madeen-f60fd.firebaseapp.com",
  databaseURL: "https://madeen-f60fd.firebaseio.com",
  projectId: "madeen-f60fd",
  storageBucket: "madeen-f60fd.appspot.com",
  messagingSenderId: "681393300747",
  appId: "1:681393300747:web:f6c211cf9a434ae9ceee0e",
  measurementId: "G-SW29L8EJPH"
};

firebase.initializeApp(firebaseConfig);
*/
export default function App() {
  let [fontsLoaded] = useFonts({
    "Bahij_TheSansArabic-Bold": require("./assets/fonts/Bahij_TheSansArabic-Bold.ttf"),
    "Bahij_TheSansArabic-Light": require("./assets/fonts/Bahij_TheSansArabic-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const clickHandler = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Image style={styles.logo} source={require("./assets/logo.png")} />
        
<LinearGradient
colors={["#FCFCFC", "#EEF2ED"]}
      style = {{
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 2.1,
        height: Dimensions.get('window').width * 3,
        left:-440,
        top:-55,
        position:"absolute",
        
      }}
      
    >
      <Text> </Text>
    </LinearGradient>


        <TouchableOpacity
          style={[styles.Gbutton, { backgroundColor: "#57694C" }]}
        >
          <Text style={styles.buttonText}> إنشاء حساب </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.Wbutton, { backgroundColor: "#FFFF" }]}
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
