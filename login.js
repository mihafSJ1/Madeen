import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

import * as Font from "expo-font";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view-fix";
import "@firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAmXanlf80n5Sd_mEQiV9O9hEj4Z3i4B1g",
  authDomain: "madeen-46af8.firebaseapp.com",
  databaseURL: "https://madeen-46af8.firebaseio.com",
  projectId: "madeen-46af8",
  storageBucket: "madeen-46af8.appspot.com",
  messagingSenderId: "289377001222",
  appId: "1:289377001222:web:9aba3ddf0baa5ef74b0887",
  measurementId: "G-KWKWGXNQRN",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMsg] = useState("");

  const onLoginPress = () => {
    //Null fields validation
    if (email == "" || password == "") {
      alert("عفوًا، جميع الحقول مطلوبة");
      return;
    }
    console.log("handleLogin1");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate("request"))
      .catch((error) => {
        switch (error.code) {
          
         
          case "auth/invalid-email":

      

            alert("تحقق من صحة بريدك الالكتروني");
            break;
          case "auth/user-not-found":

          case "auth/wrong-password":
            alert(
              "من فضلك تحقق من البريد الالكتروني أو كلمة المرور المسجلة لدى مدين!" 
            );
            break;
          case "auth/network-request-failed":
            alert("فضلًا تحقق من اتصالك بالانترنت");
            break;
        }
        
      });

    console.log("handleLogin");
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("./assets/logo.png")} />

        <View style={styles.registerBackground}>
          <Text style={styles.header}>تسجيل دخول </Text>

          {/* faild number1  */}

          <Text style={styles.textInputTitle}> البريد الإلكتروني </Text>
          <TextInput
            style={styles.textInput}
            placeholder="البريد الالكتروني "
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          {/* <RegisterTextInput/> */}

          {/* faild number1  */}
          <Text style={styles.textInputTitle}> كلمة السر </Text>
          <TextInput
            style={styles.textInput}
            placeholder="كلمة المرور"
            value={password}
            onChangeText={(text) => setPassword(text)}
            maxLength={15}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

          {/* link */}
          <Text style={styles.signinText}>
            هل نسيت كلمة السر؟
            <Text
              style={{ color: "#57694C" }}
              onPress={() => navigation.navigate("ResetPassword")}
            >
              اعادة تعيين كلمة السر
            </Text>
          </Text>

          {/* <Text style={styles.textInputTitle}> كلمة السر </Text>
           <RegisterTextInput secureTextEntry={true}/>
           <Text style = {styles.signinText}>هل نسيت كلمة السر؟<Text 
         style = {{ color: '#57694C' }} onPress={() => navigation.navigate('ResetPassword')}>   اعادة تعيين كلمة السر</Text></Text> */}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#D4CEC9" }]}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}> إلغاء </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#CBCA9E" }]}
              onPress={() => onLoginPress()}
            >
              <Text style={styles.buttonText}> تسجيل دخول </Text>
            </TouchableOpacity>
          </View>

          <StatusBar style="auto" />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#EEF2ED",
    // alignItems: 'center',
    justifyContent: "center",
    fontSize: 25,
  },

  register: {
    marginBottom: -40,
  },
  registerBackground: {
    overflow: "hidden",
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: "#fff",
  },

  logo: {
    alignItems: "center",
    marginLeft: 100,
    marginTop: 100,
    marginBottom: -40,
    zIndex: 2,
  },

  form: {
    position: "absolute",
  },

  scrollView: {
    paddingHorizontal: 20,
  },
  header: {
    marginBottom:30,
    fontFamily: "Bahij_TheSansArabic-Light",
    color: "#404040",
    fontSize: 30,
    margin: 20,
    top: 30,
    textAlign: "center",
    justifyContent: "center",
  },
  textInputTitle: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
    marginBottom: 2,
    textAlign: "right",
    color: "#404040",
    marginRight: 35,
  },
  registerTextInput: {
    //  marginTop:15,
    marginLeft: 30,
    alignItems: "center",
    borderColor: "#CBCA9E",
    width: 350,
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 15,
    borderWidth: 2,
    fontFamily: "Bahij_TheSansArabic-Light",
  },
 
    button: {
      alignItems: "center",
      width: 170,
      height: 30,
      marginTop: 10,
      padding: 5,
      borderRadius: 15,
      marginLeft: 10,
      backgroundColor: "#fff",
    },
  

  buttonText: {
    textAlign: "center",
    fontFamily: "Bahij_TheSansArabic-Light",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
    fontSize: 30,
    marginBottom:200,
  },
  signinText: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Bahij_TheSansArabic-Light",
  },

  textInput: {
    marginBottom: 13,
    marginLeft: 35,
    alignItems: "center",
    borderColor: "#CBCA9E",
    width: 350,
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 15,
    borderWidth: 2,
    textAlign: "right",
    fontFamily: "Bahij_TheSansArabic-Light",
  },

});
