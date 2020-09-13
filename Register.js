
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity,Image} from 'react-native';

import { useFonts } from "expo-font";
import { AppLoading } from "expo"
import * as firebase from 'firebase';;
import Logo from './Logo';
import Home from './Home';
import RegisterTextInput from './RegisterTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view-fix';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";






export default function Register({ navigation }) {
  let [fontsLoaded] = useFonts({
    "Bahij_TheSansArabic-Bold": require("./assets/fonts/Bahij_TheSansArabic-Bold.ttf"),
    "Bahij_TheSansArabic-Light": require("./assets/fonts/Bahij_TheSansArabic-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <KeyboardAwareScrollView>
  
    <View style={styles.container}>
     
     <Logo/>
     <TouchableOpacity 
      onPress={() => navigation.navigate('Home')}
     >
        <Text   >   إنشاء حساب  </Text>
       
        </TouchableOpacity>
    
    <View style={styles.registerBackground}>


      <Text style={styles.header}>إنشاء حساب </Text>
           <Text style={styles.textInputTitle}>الاسم </Text>
          
           <RegisterTextInput/>
           <Text style={styles.textInputTitle}> البريد الإلكتروني  </Text>
           <RegisterTextInput/>
           <Text style={styles.textInputTitle}> كلمة السر </Text>
           <RegisterTextInput secureTextEntry={true}/>
           <Text style={styles.textInputTitle}> إعادة كلمة السر </Text>
            <RegisterTextInput secureTextEntry={true}/>
           <Text  style = {styles.signinText}>هل لديك حساب؟<Text style = {{ color: '#57694C' }}  onPress={() => navigation.navigate('login')} > تسجيل دخول</Text></Text>
           <View style={styles.buttonContainer}>
      
       
        <TouchableOpacity style={[styles.button,{backgroundColor:'#D4CEC9'}]}
        onPress={() => navigation.navigate('Home')}
        >
        <Text   style={styles.buttonText}  >   إالغاء  </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,{backgroundColor:'#CBCA9E'}]}>
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
    fontFamily: "Bahij_TheSansArabic-Light",
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
        
    fontFamily: "Bahij_TheSansArabic-Light",
    color: '#404040',
    fontSize:30,
    margin:20,
     top:30,
    textAlign:'center',
   justifyContent: 'center',

},
textInputTitle:{
    fontFamily: "Bahij_TheSansArabic-Light",
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
    fontFamily: "Bahij_TheSansArabic-Light",
     textAlign:'center',
    
 },
 buttonContainer:{
    flexDirection: 'row',

     alignItems:'center',
     marginLeft:80,
     fontSize:30,
  
 },
 signinText:{
    fontFamily: "Bahij_TheSansArabic-Light",
     marginTop:10,
    textAlign:'center',
 }

});


