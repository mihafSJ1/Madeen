import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RegisterTextInput from './RegisterTextInput';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity} from 'react-native';


export default function LogInForm() {
    return (
        <View style={styles.registerContainer}>

           <Text style={styles.header}>تسجيل دخول  </Text>
           <Text style={styles.textInputTitle}> البريد الإلكتروني  </Text>
           {/* <TextInput style={styles.RegisterTextInput}/> */}
           <RegisterTextInput/>
           <Text style={styles.textInputTitle}> كلمة السر </Text>
           <RegisterTextInput secureTextEntry={true}/>
           <Text style = {styles.signinText}>هل نسيت كلمة السر؟<Text onPress={()=> someAction()} style = {{ color: '#57694C' }}>   اعادة تعيين كلمة السر</Text></Text>
           <View style={styles.buttonContainer}>
        

           <TouchableOpacity style={[styles.button,{backgroundColor:'#D4CEC9'}]}>
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

        },
        textInputTitle:{
            fontSize:20,
            margin:20,
            textAlign:'right',
            color:'#404040',
            marginRight:40,
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