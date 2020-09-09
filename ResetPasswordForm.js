import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity} from 'react-native';

import RegisterTextInput from './RegisterTextInput';

export default function ResetPasswordForm() {
    return (
        <View style={styles.registerContainer}>
     
        <Text style={styles.resetMessage}> لُطفًا أدخل بريدك الالكتروني المسجل لدينا
                        لاستعادة كلمة المرور </Text>
        <Text style={styles.resetTilte}>  البريد الإلكتروني </Text>
        {/* <TextInput style={styles.registerTextInput}/> */}
        <RegisterTextInput/>

  
     <TouchableOpacity style={[styles.button,{backgroundColor:'#57694C'}]}>
     <Text   style={styles.buttonText}  >   استعادة كلمة المرور  </Text>
     </TouchableOpacity>
  

  
  </View>

    );}
    const styles = StyleSheet.create({
      registerContainer: {
        backgroundColor: '#fff',
      },
      textInputTitle:{
        fontSize:20,
        margin:8,
        textAlign:'right',
        color:'#404040',
        marginRight:40,
    },   
    button:{

 
      alignSelf:'center', 
      width:200,
      height:30,
      marginTop:120,
      padding:5,
      borderRadius:15,
      marginLeft:10,
      marginBottom:250,
    
       },
   buttonText:{
       textAlign:'center',
       color:'#fff',
      
   },
   resetMessage:{
    textAlign:'right',
    fontSize:15,
    margin:30,
  

   },
   resetTilte:{
    fontSize:20,
    margin:8,
    textAlign:'right',
    color:'#404040',
    marginRight:40,

   }
  
    });