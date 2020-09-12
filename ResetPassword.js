import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity,Image} from 'react-native';
import   ResetPasswordForm from './ResetPasswordForm';
import * as firebase from 'firebase';




export default function ResetPasswordٍ() {
  return (
    <View style={styles.container}>
        <Image style={styles.resetImage}
        source={require('./assets/Reset.png')}
        />
   <Image 
        source={require('./assets/ArrowIcon.svg')}
        />
           <Text style={styles.resetHeader} > استعادة كلمة المرور </Text>
           <Image 
        source={require('./assets/ArrowIcon.svg')}
        />
 <View style={styles.registerBackground}>
 <ResetPasswordForm />
 </View>

    </View>
  );}

  const styles = StyleSheet.create({
    container: {
        flex: 1,
       
        backgroundColor: '#EEF2ED',
        // alignItems: 'center',
        justifyContent: 'center',
        fontSize:25,
      
      },
      resetHeader:{
        fontSize:30,
        textAlign:'right',
        marginRight:15,
        bottom:55,
        fontWeight:'bold',
       
      },
   
      registerBackground:{
    
        overflow: 'hidden',
        flex:1,
       
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        backgroundColor:'#fff',
     
      },
      resetImage:{
        alignSelf:'flex-end',
        left:40,
         
      }

    
  });