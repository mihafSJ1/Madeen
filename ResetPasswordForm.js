import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput,Button,TouchableOpacity} from 'react-native';
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

import RegisterTextInput from './RegisterTextInput';

export default function ResetPasswordForm() {
  let [fontsLoaded] = useFonts({
    "Bahij_TheSansArabic-Bold": require("./assets/fonts/Bahij_TheSansArabic-Bold.ttf"),
    "Bahij_TheSansArabic-Light": require("./assets/fonts/Bahij_TheSansArabic-Light.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
    return (
        <View style={styles.registerContainer}>
     
        <Text style={styles.resetMessage}> لُطفًا أدخل بريدك الالكتروني المسجل لدينا
                        لاستعادة كلمة المرور </Text>
        <Text style={styles.resetTilte}>  البريد الإلكتروني </Text>
        {/* <TextInput style={styles.registerTextInput}/> */}
        <InputField
            customStyle={{ marginTop: 100 }}
            textColor={colors.white}
            labelText="EMAIL ADDRESS"
            labelTextSize={14}
            labelColor={colors.white}
            borderBottomColor={colors.white}
            defaultValue={this.state.email}
            onChangeText={etext => this.setState({ email: text })}
          />
  
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
        fontFamily: "Bahij_TheSansArabic-Light",
        fontSize:20,
        margin:8,
        textAlign:'right',
        color:'#404040',
        marginRight:40,
    },   
    button:{

 
      alignSelf:'center', 
      width:200,
      height:35,
      marginTop:120,
      padding:5,
      borderRadius:15,
      marginLeft:10,
      marginBottom:250,
    
       },
   buttonText:{
    fontFamily: "Bahij_TheSansArabic-Light",
       textAlign:'center',
       color:'#fff',
      
   },
   resetMessage:{
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign:'right',
    fontSize:15,
    margin:30,
  

   },
   resetTilte:{
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize:20,
    margin:8,
    textAlign:'right',
    color:'#404040',
    marginRight:40,

   }
  
    });