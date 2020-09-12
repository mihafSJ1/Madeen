import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity} from 'react-native';
import RegisterTextInput from './RegisterTextInput';


export default function RegisterForm() {
    return (
        <View style={styles.registerContainer}>

           <Text style={styles.header}>إنشاء حساب </Text>
           <Text style={styles.textInputTitle}>الاسم </Text>
          
           <RegisterTextInput/>
           <Text style={styles.textInputTitle}> البريد الإلكتروني  </Text>
     
           <Text style={styles.textInputTitle}> كلمة السر </Text>
           <RegisterTextInput secureTextEntry={true}/>
           <Text style={styles.textInputTitle}> إعادة كلمة السر </Text>
            <RegisterTextInput secureTextEntry={true}/>
           <Text style = {styles.signinText}>هل لديك حساب؟<Text onPress={()=> someAction()} style = {{ color: '#57694C' }}> تسجيل دخول</Text></Text>
           <View style={styles.buttonContainer}>
      
       
        <TouchableOpacity style={[styles.button,{backgroundColor:'#D4CEC9'}]}>
        <Text   style={styles.buttonText}  >   إالغاء  </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button,{backgroundColor:'#CBCA9E'}]}>
        <Text style={styles.buttonText}  >   إنشاء حساب  </Text>
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

        },
        textInputTitle:{
            fontSize:20,
            margin:8,
            textAlign:'right',
            color:'#404040',
            marginRight:40,
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
         }
       
    
    });      