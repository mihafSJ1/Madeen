import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
  ImageButton,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import TopBar from "./TopBar";
import * as Font from "expo-font";
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Svg, { Defs, G, Path } from "react-native-svg";
//import { Imagebutton } from "react-native-image-button-text";
import BottomNavigator from "./BottomNavigator";
export default function squares({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Bahij_TheSansArabic-Bold": require("./assets/fonts/Bahij_TheSansArabic-Bold.ttf"),
    "Bahij_TheSansArabic-Light": require("./assets/fonts/Bahij_TheSansArabic-Light.ttf"),
  });
  return (
    <View style={styles.container}>
      <TopBar />
      <TouchableOpacity>
        <ImageBackground
          style={styles.orange}
          source={require("./assets/orange.png")}
        >
          <Text
            style={styles.orangeText}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}
            الطلبات العامه
          </Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity>
        <ImageBackground
          style={styles.blue}
          source={require("./assets/blue.png")}
        >
          <Text
            style={styles.blueText}
            onPress={() => navigation.navigate("login")}
          >
            {" "}
            طلباتي
          </Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity>
        <ImageBackground
          style={styles.silver}
          source={require("./assets/silver.png")}
        >
          <Text
            style={styles.silverText}
            onPress={() => navigation.navigate("Register")}
          >
            {" "}
            التقويم
          </Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity>
        <ImageBackground
          style={styles.green}
          source={require("./assets/green.png")}
        >
          <Text
            style={styles.greenText}
            onPress={() => navigation.navigate("ResetPassword")}
          >
            {" "}
            الحاسبة
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <BottomNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orange: {
    alignItems: "center",
    marginLeft: 0,
    marginRight: 0,
    left: 40,
    marginTop: 70,
    marginBottom: -20,
    zIndex: 2,
    height: 201,
    width: 333,
  },

  orangeText: {
    // right: -60,
    // top: 40,
    // zIndex: 1,
    // fontSize: 25,
    // fontFamily: "Bahij_TheSansArabic-Light",
    // alignSelf: "center",

    top: 40,
    zIndex: 1,
    fontSize: 25,
    fontFamily: "Bahij_TheSansArabic-Light",
    alignSelf: "center",
    paddingLeft: 150,
    paddingBottom: 28,
    paddingTop: 20,
  },

  blue: {
    alignItems: "center",
    marginLeft: 0,
    marginRight: 0,
    left: 47,
    marginTop: -55,
    marginBottom: -20,
    zIndex: 1,
    height: 189,
    width: 318,
  },

  blueText: {
    // left: -80,
    // top: 90,
    // fontSize: 25,
    // zIndex: 1,
    // fontFamily: "Bahij_TheSansArabic-Light",
    top: 90,
    fontSize: 25,
    zIndex: 1,
    fontFamily: "Bahij_TheSansArabic-Light",

    paddingRight: 150,
    paddingBottom: 40,
    paddingLeft: 30,
  },

  silver: {
    alignItems: "center",
    marginLeft: 0,
    marginRight: 0,
    left: 49,
    marginTop: 0,
    marginBottom: -40,
    zIndex: 1,
    height: 237,
    width: 315,
  },

  silverText: {
    // right: -90,
    // top: 60,
    // fontSize: 25,
    // fontFamily: "Bahij_TheSansArabic-Light",

    top: 50,
    fontSize: 25,
    fontFamily: "Bahij_TheSansArabic-Light",
    paddingLeft: 215,
    paddingTop: 10,
  },

  green: {
    alignItems: "center",
    marginLeft: 0,
    marginRight: 0,
    left: 40,
    marginTop: -110,
    marginBottom: -40,
    zIndex: 1,
    height: 237,
    width: 333,
  },

  greenText: {
    // left: -80,
    // top: 130,
    // fontSize: 25,
    // zIndex: 1,
    // fontFamily: "Bahij_TheSansArabic-Light",

    top: 120,
    fontSize: 25,
    zIndex: 1,
    fontFamily: "Bahij_TheSansArabic-Light",

    paddingRight: 150,
    paddingLeft: 30,
    paddingBottom: 20,
    paddingTop: 30,
  },

  // Get a reference to the database service
});
