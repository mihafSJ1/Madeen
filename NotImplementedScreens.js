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
import TopBar from "./TopBar";

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseKeys.firebaseConfig);
}

export default function NotImplementedScreens({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Not Implemented Yet... </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
