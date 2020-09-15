import React, { Component ,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity,Image, Alert, ActivityIndicator} from 'react-native';

import { AppLoading } from "expo"
import * as firebase from 'firebase';

import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import Logo from './Logo';
import Home from './Home';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view-fix';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirebaseKeys from './FirebaseKeys';


if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseKeys.firebaseConfig);
}






export default function  Register({ navigation}) {

  // let [fontsLoaded] = useFonts({
  //   "Bahij_TheSansArabic-Bold": require("./assets/fonts/Bahij_TheSansArabic-Bold.ttf"),
  //   "Bahij_TheSansArabic-Light": require("./assets/fonts/Bahij_TheSansArabic-Light.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }
  // register backend

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
 

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
        alert("Passwords don't match.")
        return
    }
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                fullName,
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                    navigation.navigate('Home', {user: data})
                })
                .catch((error) => {
                    alert(error)
                });
        })
        .catch((error) => {
            alert(error)
    });
}



  return (
    <KeyboardAwareScrollView>
  
    <View style={styles.container}>
     
     <Logo/>
     
    <View style={styles.registerBackground}>


      <Text style={styles.header}>إنشاء حساب </Text>
           <Text style={styles.textInputTitle}>الاسم </Text>
          
           <TextInput style={styles.textInput}
              
              placeholder="Name"
              value={fullName}
              onChangeText={(text) => setFullName(text)}
           />
           <Text style={styles.textInputTitle}> البريد الإلكتروني  </Text>
           <TextInput style={styles.textInput}
          
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          
             underlineColorAndroid="transparent"
             autoCapitalize="none"
            keyboardType='email-address'

           />
           <Text style={styles.textInputTitle}> كلمة السر </Text>
           <TextInput style={styles.textInput}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            maxLength={15}
            secureTextEntry={true}
             underlineColorAndroid="transparent"
             autoCapitalize="none"
             />
           <Text style={styles.textInputTitle}> إعادة كلمة السر </Text>
            <TextInput style={styles.textInput}
            secureTextEntry={true}
             placeholder='Confirm Password'
             onChangeText={(text) => setConfirmPassword(text)}
             value={confirmPassword}
             maxLength={15}
             underlineColorAndroid="transparent"
             autoCapitalize="none"/>

           <Text  style = {styles.signinText}>هل لديك حساب؟
           <Text style = {{ color: '#57694C' }}  onPress={() => navigation.navigate('login')} > تسجيل دخول</Text>
           </Text>

           <View style={styles.buttonContainer}>
      
       
        <TouchableOpacity style={[styles.button,{backgroundColor:'#D4CEC9'}]}
        onPress={() => navigation.navigate('Home')}
        >
        <Text   style={styles.buttonText}  >   إالغاء  </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,{backgroundColor:'#CBCA9E'}]}
        onPress={() => onRegisterPress()}
        >
        <Text style={styles.buttonText}  >   إنشاء حساب  </Text>
       
        </TouchableOpacity>

      
     

      </View>
    
      <StatusBar style="auto"/>
    </View>
    </View>
    </KeyboardAwareScrollView>
     );
    }

  
const styles = StyleSheet.create({
  container: {
    // fontFamily: "Bahij_TheSansArabic-Light",
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
  },header:{
        
    // fontFamily: "Bahij_TheSansArabic-Light",
    color: '#404040',
    fontSize:30,
    margin:20,
     top:30,
    textAlign:'center',
   justifyContent: 'center',

},
textInputTitle:{
    // fontFamily: "Bahij_TheSansArabic-Light",
    fontSize:20,
    marginBottom:2,
   
    textAlign:'right',
    color:'#404040',
    marginRight:60,
}, 

 button:{
   
    alignItems:'center', 
    width:100,
    height:30,
    marginTop:20,
    padding:5,
    borderRadius:15,
    marginLeft:10,
    marginBottom:250,
    backgroundColor: '#fff',
 },
 buttonText:{
    // fontFamily: "Bahij_TheSansArabic-Light",
     textAlign:'center',
    
 },
 buttonContainer:{
    flexDirection: 'row',

     alignItems:'center',
     marginLeft:80,
     fontSize:30,
  
 },
 signinText:{
  
  backgroundColor: 'transparent',
    // fontFamily: "Bahij_TheSansArabic-Light",
     marginTop:10,
    textAlign:'center',
 },
 textInput:{
       //  marginTop:15,
       marginLeft:30,
       alignItems:'center',
       borderColor:'#CBCA9E',
       width:350,
       backgroundColor:'#fff',
       height:40,
       borderRadius:15,
       borderWidth:2,
        textAlign:'right',

 }

});


