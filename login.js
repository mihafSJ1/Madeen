import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity,ScrollView ,Image,KeyboardAvoidingView, SafeAreaView} from 'react-native';
import { useFonts } from "expo-font";
import { AppLoading } from "expo";import RegisterTextInput from './RegisterTextInput';
import * as Font from 'expo-font';
import Home from './Home';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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

export default function login({ navigation }) {
  

  return (
    <KeyboardAwareScrollView>
  
    <View style={styles.container}>
       
       <Image style={styles.logo}
     source={require('./assets/logo.png')}
     />

    <View  style={styles.registerBackground}>

      
    <Text style={styles.header}>تسجيل دخول  </Text>
           <Text style={styles.textInputTitle}> البريد الإلكتروني  </Text>
           <RegisterTextInput/>
           <Text style={styles.textInputTitle}> كلمة السر </Text>
           <RegisterTextInput secureTextEntry={true}/>
           <Text style = {styles.signinText}>هل نسيت كلمة السر؟<Text 
         style = {{ color: '#57694C' }} onPress={() => navigation.navigate('ResetPassword')}>   اعادة تعيين كلمة السر</Text></Text>
        
          
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

     <StatusBar style="auto"/>
    </View>
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


 // Get a reference to the database service
});
