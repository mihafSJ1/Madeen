
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity,Image} from 'react-native';
import   RegisterForm from './RegisterForm';
import * as Font from 'expo-font';
import * as firebase from 'firebase';
import Logo from './Logo';



export default function Register() {
  return (
  
    <View style={styles.container}>
     
     <Logo/>
    
    <View style={styles.registerBackground}>
  
      <RegisterForm style={styles.register}/>
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
