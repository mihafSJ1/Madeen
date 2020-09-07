import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
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

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 // Get a reference to the database service
});
