import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity,Image,} from 'react-native';

import LogInForm from './LogInForm';
import * as Font from 'expo-font';
import Logo from './Logo';
// import * as firebase from 'firebase';

// // Optionally import the services that you want to use
// import "firebase/auth";
// import "firebase/database";
// //import "firebase/firestore";
// import "firebase/functions";
// import "firebase/storage";
// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyAk1h8iy3kyvm1iE2Bn2QobFbnQlj-thhs",
//   authDomain: "madeen-f60fd.firebaseapp.com",
//   databaseURL: "https://madeen-f60fd.firebaseio.com",
//   projectId: "madeen-f60fd",
//   storageBucket: "madeen-f60fd.appspot.com",
//   messagingSenderId: "681393300747",
//   appId: "1:681393300747:web:f6c211cf9a434ae9ceee0e",
//   measurementId: "G-SW29L8EJPH"
// };

// firebase.initializeApp(firebaseConfig);

export default function login() {
  return (
    //logo
    <View style={styles.container}>
       
     <Logo/>

    <View  style={styles.registerBackground}>


  <LogInForm style = {styles.register } />
     </View>

     <StatusBar style="auto"/>
    </View>
  );
}

     

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: '#EEF2ED',
    // alignItems: 'center',
    justifyContent: 'center',
    fontSize:25,
  
  },
 
  register:{
    marginBottom:-40,
  },
  registerBackground:{

    overflow: 'hidden',
    flex:1,
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
    backgroundColor:'#fff',
 
  }

 

 // Get a reference to the database service
});
