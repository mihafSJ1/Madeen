import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CustomAlertComponent from "./CustomAlertComponent";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import * as firebase from "firebase";
import "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAk1h8iy3kyvm1iE2Bn2QobFbnQlj-thhs",
  authDomain: "madeen-f60fd.firebaseapp.com",
  databaseURL: "https://madeen-f60fd.firebaseio.com",
  projectId: "madeen-f60fd",
  storageBucket: "madeen-f60fd.appspot.com",
  messagingSenderId: "681393300747",
  appId: "1:681393300747:web:098865c0188fd840ceee0e",
  measurementId: "G-CYV0E47J1W",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

export default function Alert() {
  let [fontsLoaded] = useFonts({
    "Bahij_TheSansArabic-Bold": require("./assets/fonts/Bahij_TheSansArabic-Bold.ttf"),
    "Bahij_TheSansArabic-Light": require("./assets/fonts/Bahij_TheSansArabic-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <CustomAlertComponent
        style={{ fontFamily: "Bahij_TheSansArabic-Bold" }}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DADADA",
    alignItems: "center",
    justifyContent: "center",
  },
  // Get a reference to the database service
});
