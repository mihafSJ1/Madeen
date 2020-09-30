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
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { useFonts } from "expo-font";
import { AntDesign } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CustomAlertComponent from "./CustomAlertComponent";
import BottomNavigator from "./BottomNavigator";
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

export default function ResetPassword({ navigation }) {
  //let [fontsLoaded] = useFonts({
  // "Bahij_TheSansArabic-Bold": require("./assets/fonts/Bahij_TheSansArabic-Bold.ttf"),
  // "Bahij_TheSansArabic-Light": require("./assets/fonts/Bahij_TheSansArabic-Light.ttf"),
  //});
  // if (!fontsLoaded) {
  // return <AppLoading />;
  //}
  //backend
  const [email, setEmail] = useState("");

  const submitEmail = () => {
    if (email == "") {
      Alert.alert("","أدخل البريد الإلكتروني من فضلك",
      [  
        {text: 'حسناً'}, ],
        {cancelable: false}  
        );
      navigation.navigate("ResetPassword");
    } else {
      firebase
        .auth()

        .sendPasswordResetEmail(email)

        .then(function () {
          Alert.alert("",
            " تم إرسال  رابط استعادة كلمة المرور على بريدك الالكتروني، لُطفًا تفقده",
            [  
              {text: 'حسناً'}, ],
              {cancelable: false}  
          );
          navigation.navigate("login");
        })

        .catch(function (error) {
          if (
            error.message ==
            "There is no user record corresponding to this identifier. The user may have been deleted."
          ) {
            Alert.alert("","لا يوجد مستخدم بهذا البريد الإلكتروني",
            [  
              {text: 'حسناً'}, ],
              {cancelable: false}  
              );
          } else if (error.message == "The email address is badly formatted.") {
            Alert.alert("","فضلًا، قم بإدخال بريد إلكتروني صحيح",
            [  
              {text: 'حسناً'}, ],
              {cancelable: false}  
              );
            if (
              error.message ==
              "There is no user record corresponding to this identifier. The user may have been deleted."
            )
              Alert.alert("","لا يوجد مستخدم بهذا البريد الإلكتروني",
              [  
                {text: 'حسناً'}, ],
                {cancelable: false}  
                );
          }

          // Alert.alert(error.massage);
        });
    }
  };
  return (
    <View style={styles.container}>
      <Image style={styles.resetImage} source={require("./assets/Reset.png")} />

      <Text style={styles.resetHeader}> استعادة كلمة المرور </Text>
      <Image source={require("./assets/ArrowIcon.svg")} />
      <View style={styles.registerBackground}>
        <Text style={styles.resetMessage}>
          {" "}
          لُطفًا أدخل بريدك الالكتروني المسجل لدينا لاستعادة كلمة المرور{" "}
        </Text>
        <Text style={styles.resetTilte}>  البريد الإلكتروني </Text>
        {/* <TextInput style={styles.registerTextInput}/> */}
        <TextInput
          style={styles.textInput}
          placeholder="البريد الإلكتروني"
          inputType="email"
          onChangeText={(email) => setEmail(email)}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#D4CEC9" }]}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.buttonText}> إالغاء </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#CBCA9E" }]}
            onPress={() => submitEmail()}
          >
            <Text style={styles.buttonText}> استعادة </Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomNavigator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#EEF2ED",
    // alignItems: 'center',
    justifyContent: "center",
  },
  resetHeader: {
    fontSize: 30,
    fontFamily: "Bahij_TheSansArabic-Bold",
    textAlign: "right",
    marginRight: 15,
    bottom: 55,
    fontWeight: "bold",
  },

  registerBackground: {
    overflow: "hidden",
    flex: 1,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: "#fff",
    marginTop: -50,
  },
  resetImage: {
    alignSelf: "flex-end",
    left: 40,
  },
  backArrow: {
    left: 30,
    bottom: 20,
  },
  textInputTitle: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
    marginBottom: 2,
    textAlign: "right",
    color: "#404040",
    marginRight: 30,
  },
  button: {
    alignItems: "center",
    width: 170,
    height: 30,
    marginTop: 20,
    padding: 5,
    borderRadius: 15,
    marginLeft: 10,
    marginBottom: 350,
    backgroundColor: "#fff",
  },
  textInput: {
    marginBottom: 10,
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

  buttonText: {
    textAlign: "center",
    fontFamily: "Bahij_TheSansArabic-Light",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
    fontSize: 30,
  },
  resetMessage: {
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "right",
    fontSize: 15,
    margin: 30,
    marginBottom: -1,
  },
  resetTilte: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
    margin: 8,
    textAlign: "right",
    color: "#404040",
    marginRight: 40,
  },
});
