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
  apiKey: "AIzaSyAmXanlf80n5Sd_mEQiV9O9hEj4Z3i4B1g",
  authDomain: "madeen-46af8.firebaseapp.com",
  databaseURL: "https://madeen-46af8.firebaseio.com",
  projectId: "madeen-46af8",
  storageBucket: "madeen-46af8.appspot.com",
  messagingSenderId: "289377001222",
  appId: "1:289377001222:web:9aba3ddf0baa5ef74b0887",
  measurementId: "G-KWKWGXNQRN",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class FirstPage extends React.Component {
  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20 }}>
          {" "}
          Hi
          <Text style={{ color: "#e93766", fontSize: 20 }}>
            {currentUser && currentUser.email}!
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   logo: {
//     alignItems: "center",
//     marginLeft: 0,
//     marginBottom: 0,
//     width: 210,
//     height: 170,
//     resizeMode: "stretch",
//     position: "absolute",
//     left: 50,
//     bottom: 150,
//     zIndex: 2,
//   },

//   background: {
//     alignItems: "center",
//     marginLeft: 0,
//     marginBottom: 0,
//     width: 375,
//     height: 385,
//     resizeMode: "stretch",
//     position: "absolute",
//     left: -40,
//     top: 2,
//     zIndex: -1,
//   },
//   // Get a reference to the database service
// });
