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
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import Home from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CustomAlertComponent from "./CustomAlertComponent";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view-fix";







// import BottomNavigator from "./BottomNavigator";
 

import { Ionicons } from "@expo/vector-icons";

export default function login({ navigation }) {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          style={styles.UserImage}
          source={require("./assets/UserImageProfile.png")}
        />

        <View style={styles.registerBackground}>
          <Text style={styles.UserName}>أريج الجريوي</Text>

          {/* field number1  */}

          <Text style={styles.Email}> Areej@gmail.com </Text>

          <Text style={styles.RateStarts}>
            <Ionicons name="ios-star" size={33} color="#ECD246" solid />
            <Ionicons name="ios-star" size={33} color="#ECD246" solid />
            <Ionicons name="ios-star" size={33} color="#ECD246" solid />
            <Ionicons name="ios-star" size={33} color="#ECD246" solid />
            <Ionicons name="ios-star" size={33} color="#ECD246" solid />
          </Text>
          <Text style={styles.subsidy}> عدد التسليف </Text>
          <Text style={styles.debts}> عدد الاستلاف </Text>
          <View style={styles.PinkRectangleShapeView}>
            <Text style={styles.buttonText}> ١٠</Text>
          </View>
          <View style={styles.YellowRectangleShapeView}>
            <Text style={styles.buttonText}> ١٦</Text>
          </View>

          {/* <RegisterTextInput/> */}

          {/* faild number1  */}

          {/* link */}

          {/* <Text style={styles.textInputTitle}> كلمة السر </Text>
           <RegisterTextInput secureTextEntry={true}/>
           <Text style = {styles.signinText}>هل نسيت كلمة السر؟<Text 
         style = {{ color: '#57694C' }} onPress={() => navigation.navigate('ResetPassword')}>   اعادة تعيين كلمة السر</Text></Text> */}

          <StatusBar style="auto" />
          <View></View>
        
          {/* < BottomNavigator />  */}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // zIndex:-10,
    backgroundColor: "#EEF2ED",
    //alignItems: 'center',
    justifyContent: "center",
    fontSize: 25,
  },

  RateStarts: {
    left: 133,
    bottom: -180,
  },

  PinkRectangleShapeView: {
    width: 148,
    height: 100,
    marginTop: 0,
    padding: 5,
    borderRadius: 15,
    marginLeft: 33,
    marginBottom: 0,
    left: 192,
    top: 200,
    backgroundColor: "#D9AE94",
    borderColor: "#D3CECA",
    borderWidth: 2,
  },
  YellowRectangleShapeView: {
    alignItems: "center",
    width: 148,
    height: 100,
    marginTop: 0,
    padding: 5,
    borderRadius: 15,
    marginLeft: 33,
    marginBottom: 0,
    right: -3,
    top: 100,
    backgroundColor: "#F1DCA7",
    borderColor: "#D3CECA",
    borderWidth: 2,
  },
  registerBackground: {
    //overflow: "hidden",
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    bottom: 115,
    height: 750,
    backgroundColor: "#fff",
  },

  UserImage: {
    alignItems: "center",
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    left: 110,
    top: 110,
    zIndex: 2,
    width: 180,
    height: 180,
    resizeMode: "stretch",
  },

  scrollView: {
    paddingHorizontal: 20,
  },
  UserName: {
    fontFamily: "Bahij_TheSansArabic-Bold",
    color: "#404040",
    fontSize: 28,
    margin: 20,
    marginBottom: 40,
    bottom: -220,
    right: 5,
    textAlign: "center",
    justifyContent: "center",
  },
  Email: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
    marginBottom: 0,
    textAlign: "right",
    color: "#404040",
    marginRight: 0,
    top: 180,
    right: 134,
  },

  debts: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 21,
    textAlign: "left",
    color: "#404040",
    top: 200,
    left: 54,
    zIndex: 2,
  },
  subsidy: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 21,
    textAlign: "right",
    color: "#404040",
    top: 230,
    right: 58,
  },
  buttonText: {
    textAlign: "center",
    top: 10,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 40,
    color: "#fff",
  },

  // Get a reference to the database service
});
