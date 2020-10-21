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
import { Formik } from "formik";
import * as yup from "yup";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import Logo from "./Logo";
import Home from "./Home";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view-fix";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirebaseKeys from "./FirebaseKeys";
const firebaseConfig = {
  apiKey: "AIzaSyALc3LJdCzNeP3fbeV2MvTLYDbH8dP-Q-8",
  authDomain: "madeendb2.firebaseapp.com",
  databaseURL: "https://madeendb2.firebaseio.com",
  projectId: "madeendb2",
  storageBucket: "madeendb2.appspot.com",
  messagingSenderId: "814154412010",
  appId: "1:814154412010:web:435cac99ae40206a1ecc93",
  measurementId: "G-SXS9Z8NESC",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function PaymentButton({ navigation,route }) {
 
const requestId =  JSON.stringify(route.params.requestId)
// retrieve the request 
// get the amount from the form 
//in debtor form check if the remaining 0 replace the status and remove pay button 

// subtract from the repay amount in debtor 
// in creditor change the status to undeprocess hessah

//need retrive request info then abstract the remaining if the id is the debtor  not the creditor 
// if it is a creditor navigate them to the card screen directly 
// if it is a debtor navigate them to the pay button first. 







  // firebase
  // .database()
  // .ref("requests/" +requestId)
  // .on("value", (snapshot) => {
  

  // });

 const repaySchema = yup.object({
    remaining: yup.number()
      .typeError("المبلغ لا بد أن يكون بأرقام إنجليزية")
      .required("المبلغ مطلوب")
      .integer("المبلغ لا بد أن  يكون عدد صحيح")
      .min(1, "المبلغ  مطلوب و لا بد أن يكون أكبر من أو يساوي ١٠ ريال"),

    repayamount:yup.number()
    .typeError("المبلغ لا بد أن يكون بأرقام إنجليزية")
    .required("المبلغ مطلوب")
    .integer("المبلغ لا بد أن  يكون عدد صحيح")
    .max(1000,"المبلغ المطلوب لابد أن يكون أقل من أو يساوي المبلغ المبتقي من السلف ")
    .min(0, "المبلغ  مطلوب و لا بد أن يكون أكبر من أو يساوي ١٠ ريال"),

   
  });





  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
      <Formik
              // validationSchema={this.repaySchema}
              initialValues={{
                remaining: 0,
                repayamount:0,
  
              }}
              onReset={(values, { resetForm }) => {
                this.navigation.navigate("TimeLine")
              
              }}
              onSubmit={(values, action) => {
                action.resetForm();
             // need navigation 
                this.onSubmitPress(values, this.props.navigation);
              }}
            >
              {(formprops, setFieldValue) => (

        <View style={styles.registerBackground}>
          <Text style={styles.header}>الدفع   </Text>
          <Text style={styles.textInputTitle}>المبلغ المستحق <Text style={styles.textError}> *</Text> </Text>
     

          <TextInput
            style={styles.textInput}
            placeholder="المبلغ المستحق "
            // value={fullName}
            // onChangeText={(text) => setFullName(text)}
          />
        
        <View style={styles.buttonContainer}>
                    <TouchableOpacity
                          style={[styles.button, { backgroundColor: "#D4CEC9" }]}
                      onPress={ ()=>  formprops.handleReset()}
                                   
                    >
                      {/* <button type='reset'></button> */}
                      <Text style={styles.buttonText}> إلغاء </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
              style={[styles.button, { backgroundColor: "#CBCA9E" }]}
            //   onPress={() => onPaymentPress()}
          
            onPress={() =>  formprops.handleSubmit()}
            >
              <Text style={styles.buttonText}> دفع  </Text>
            </TouchableOpacity>
                  </View>
         
       
       
      
          <StatusBar style="auto" />
        </View>
          )}
           </Formik>

      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:200,
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
    height: 85,
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
    margin: 60,
    top: 30,
    marginBottom:80,
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
    marginBottom:500,
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
