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
import  { useContext } from 'react';
import { IconButton } from 'react-native-paper';

import { Title } from 'react-native-paper';
// import { AuthContext } from '../navigation/AuthProvider';
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function NotImplementedScreens({ navigation }) {
  return (
    <View style={styles.container}>

<IconButton
       style={styles.chatIcon}
        icon='message-plus'
        size={38}
        color='#f1dca7'
        onPress={() => navigation.navigate('addRoom')}
      />
      <Title>Home Screen</Title>
      <Title>All chat rooms will be listed here</Title>
      {/* <Title>{user.uid}</Title> */}
      {/* <button
        modeValue='contained'
        title='Logout'
        onPress={() => logout()}
      /> */}

      {/* <Button
        modeValue='contained'
        title='Add Room'
        onPress={() => navigation.navigate('addRoom')}
      /> */}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
 
  },


  chatIcon:{
    top:-180,
    left:170,
  }


});
