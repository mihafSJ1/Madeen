import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RegisterTextInput from './RegisterTextInput';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity,  Keyboard,KeyboardAvoidingView} from 'react-native';
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { render } from 'react-dom';
import Home from './Home';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

export default function LogInForm({ navigation }) {
    let [fontsLoaded] = useFonts({
        "Bahij_TheSansArabic-Bold": require("./assets/fonts/Bahij_TheSansArabic-Bold.ttf"),
        "Bahij_TheSansArabic-Light": require("./assets/fonts/Bahij_TheSansArabic-Light.ttf"),
      });
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }
   
    return (  
   <View style={styles.registerContainer}>
         
           <Text style={styles.header}>تسجيل دخول  </Text>
           <Text style={styles.textInputTitle}> البريد الإلكتروني  </Text>
           <RegisterTextInput/>
           <Text style={styles.textInputTitle}> كلمة السر </Text>
           <RegisterTextInput secureTextEntry={true}/>
           <Text style = {styles.signinText}>هل نسيت كلمة السر؟<Text 
          onPress={() =>navigation.navigate('ResetPassword')} style = {{ color: '#57694C' }}>   اعادة تعيين كلمة السر</Text></Text>
          
           <View style={styles.buttonContainer}>
    
           <TouchableOpacity style={[styles.button,{backgroundColor:'#D4CEC9'}]}
             onPress={() =>navigation.navigate('Home')}
           >
        <Text   style={styles.buttonText}  >   إالغاء  </Text>

        
     
        </TouchableOpacity>


        <TouchableOpacity style={[styles.button,{backgroundColor:'#CBCA9E'}]}>
        <Text   style={styles.buttonText}  >   تسجيل دخول  </Text>
     
        </TouchableOpacity>

       
        </View>
            </View>
            
    
        
        );


    }

    
    const styles = StyleSheet.create({
        registerContainer: {
          backgroundColor: '#fff',
        },
        header:{
        
            color: '#404040',
            fontSize:35,
            marginTop:20,
             top:30,
            textAlign:'center',
           justifyContent: 'center',
           marginBottom: 20,
           fontFamily: "Bahij_TheSansArabic-Light",

        },
        textInputTitle:{
            fontSize:20,
            margin:20,
            textAlign:'right',
            color:'#404040',
            marginRight:40,
            fontFamily: "Bahij_TheSansArabic-Light",
        }, 
         registerTextInput:{
            //  marginTop:15,
             marginLeft:30,
             alignItems:'center',
             borderColor:'#CBCA9E',
             width:350,
             backgroundColor:'#fff',
             height:40,
             borderRadius:15,
             borderWidth:2,
             fontFamily: "Bahij_TheSansArabic-Light",

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
             textAlign:'center',
             fontFamily: "Bahij_TheSansArabic-Light",
            
         },
         buttonContainer:{
            flexDirection: 'row',
            //  flex:1,
             alignItems:'center',
             marginLeft:80,
             fontSize:30,
          
         },
         signinText:{
             marginTop:10,
            textAlign:'center',
            fontFamily: "Bahij_TheSansArabic-Light",
         }
       
    
    });      