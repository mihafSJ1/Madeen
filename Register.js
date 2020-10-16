import React, { Component, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import Logo from "./Logo";
import Home from "./Home";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view-fix";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirebaseKeys from "./FirebaseKeys";

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseKeys.firebaseConfig);
}

export default function Register({ navigation }) {
  // register backend
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const fullNameRegexAR = /[\u0600-\u06FF]/;
  const fullNameRegexEN =/^[a-zA-Z şüöı]+$/;
 
    const strongPassRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      Alert.alert("","تأكد من تطابق كلمة المرور مع إعادتها",
      [  
        {text: 'حسناً'}, ],
        {cancelable: false}  
        );
     
      return;
    }

    if (
      email == "" ||
      password == "" ||
      fullName.trim() == "" ||
      confirmPassword == ""
    ) {
      
      
      Alert.alert("","عفوًا، جميع الحقول مطلوبة",
      [  
        {text: 'حسناً'}, ],
        {cancelable: false}  
        );

      return;
    }
    
    if (fullNameRegexEN.test(fullName) == false && fullNameRegexAR.test(fullName)==false){
      Alert.alert("",'عفوًا الاسم يجب أن يحتوي على حروف فقط' ,
      [  
        {text: 'حسناً'}, ],
        {cancelable: false}  
        );
      return
    }
    if (strongPassRegex.test(password) == false){
   
    
      Alert.alert("",'يجب ان تكون كلمة المرور مكونة من ٨ خانات وحروف وارقام ورموز', 
      [  
        {text: 'حسناً'}, ],
        {cancelable: false}  
        );
      return
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .database()
          .ref("users/" + res.user.uid)
          .set({
            fullName: fullName,
            email: email,
            UserImage: "https://firebasestorage.googleapis.com/v0/b/madeen-46af8.appspot.com/o/Draft%2FUserImageProfile.png?alt=media&token=647ebe23-8753-4e8f-a29a-c902048a810a",
          });
      })
      .then(() => navigation.navigate("squares"))

      .catch((error) => {
        switch (error.code) {
          case "auth/network-request-failed":
            Alert.alert(
              "",
              "فضلًا تحقق من اتصالك بالانترنت",
              [{ text: "حسناً" }],
              { cancelable: false }
            );
            break;
          case "auth/invalid-email":
            Alert.alert(
              "",
              "تحقق من صحة بريدك الالكتروني",
              [{ text: "حسناً" }],
              { cancelable: false }
            );
            break;
          case "auth/email-already-in-use":
            Alert.alert(
              "",
              "هذا البريد الإلكتروني مستخدم من قبل",
              [{ text: "حسناً" }],
              { cancelable: false }
            );

            break;
          case "auth/weak-password":
            Alert.alert(
              "",
              "كلمة المرور ضعيفة، يجب أن تكون أكثر من ٦ خانات",
              [{ text: "حسناً" }],
              { cancelable: false }
            );
            break;
        }
        // alert(error.code)
        console.log("handleRegister");
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Logo />

        <View style={styles.registerBackground}>
          <Text style={styles.header}>إنشاء حساب </Text>
          <Text style={styles.textInputTitle}>الاسم<Text style={styles.textError}> *</Text> </Text>

          <TextInput
            style={styles.textInput}
            placeholder="الإسم"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
          <Text style={styles.textInputTitle}> البريد الإلكتروني <Text style={styles.textError}> *</Text></Text>
          <TextInput
            style={styles.textInput}
            placeholder="البريد الإلكتروني"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Text style={styles.textInputTitle}> كلمة السر <Text style={styles.textError}> *</Text></Text>
          <TextInput
            style={styles.textInput}
            placeholder="كلمة السر"
            value={password}
            onChangeText={(text) => setPassword(text)}
            maxLength={15}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <Text style={styles.textInputTitle}> تأكيد كلمة السر <Text style={styles.textError}> *</Text></Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            placeholder="تأكيد كلمة السر"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#D4CEC9" }]}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}> إلغاء </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#CBCA9E" }]}
              onPress={() => onRegisterPress()}
            >
              <Text style={styles.buttonText}> إنشاء حساب </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.signinText}>
            هل لديك حساب؟
            <Text
              style={{
                color: "#57694C",
                fontFamily: "Bahij_TheSansArabic-Bold",
              }}
              onPress={() => navigation.navigate("login")}
            >
              {" "}
              تسجيل دخول
            </Text>
          </Text>

          <StatusBar style="auto" />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "Bahij_TheSansArabic-Light",
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
  },
  header: {
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
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
    fontSize: 30,
  },
  signinText: {
    backgroundColor: "transparent",
    fontFamily: "Bahij_TheSansArabic-Light",
    marginTop: 10,
    textAlign: "center",
    marginBottom: 250,
  },
  textInput: {
    marginBottom: 13,
    marginLeft: 35,
    alignItems: "center",
    borderColor: "#DBDBDB",
    width: 350,
    backgroundColor: "#fff",
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 5,
    textAlign: "right",
    paddingRight: 10,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 15,
  },
  textError: {
    color: "#A4161A",
    fontSize: 13,
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "right",
    marginRight: 30,
    bottom: 10,
  },
});
