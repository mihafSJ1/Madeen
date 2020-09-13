import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity,ScrollView ,Image,KeyboardAvoidingView, SafeAreaView} from 'react-native';
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import LogInForm from './LogInForm';
import * as Font from 'expo-font';

import * as firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view-fix'
import '@firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAk1h8iy3kyvm1iE2Bn2QobFbnQlj-thhs",
  authDomain: "madeen-f60fd.firebaseapp.com",
  databaseURL: "https://madeen-f60fd.firebaseio.com",
  projectId: "madeen-f60fd",
  storageBucket: "madeen-f60fd.appspot.com",
  messagingSenderId: "681393300747",
  appId: "1:681393300747:web:098865c0188fd840ceee0e",
  measurementId: "G-CYV0E47J1W"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

export default function App() {
  

  return (
    <KeyboardAwareScrollView>
  
    <View style={styles.container}>
       
       <Image style={styles.logo}
     source={require('./assets/logo.png')}
     />

    <View  style={styles.registerBackground}>

      

  <LogInForm style = {styles.register } />



     </View>

     <StatusBar style="auto"/>
    </View>
    </KeyboardAwareScrollView>
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
 
  },

  logo :{
    alignItems:'center',
    marginLeft:100,
    marginTop:100,
    marginBottom:-40,
    zIndex:2,
  },

 form: {
  
  position: "absolute",
 },

 scrollView: {
  paddingHorizontal: 20,
},


 // Get a reference to the database service
});
