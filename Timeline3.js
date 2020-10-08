import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import "@firebase/auth";
import { Ionicons } from "@expo/vector-icons";

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

var req="";
export default class Timeline3 extends React.Component {
  // state = { currentUser: null };
  // const requestID = firebase.database().ref("requests/")




  componentDidMount(){
    var ref = firebase.database().ref("requests/");
    console.log("==")
  ref.once('value').then(snapshot => {
    console.log("----")
  // snapshot.val() is the dictionary with all your keys/values from the '/store' path
  // this.setState({ req:snapshot.val() })

  req=snapshot.val()
  console.log(req)
})
    // var req = []

    // ref.once("value")
    // .then(function(snapshot) {
   

    //     //LOOPING EACH CHILD AND PUSHING TO ARRAY
    //     snapshot.forEach(item => {

    //         const temp = item.val();
    //        req.push(temp);
    //         return false;
    //     });

    //     this.setState( {    //PASSING VARIABLE TO STATE
    //         child,
    //         categories
    //     })
       
    // }.bind(this)); //BINDING TO SET STATE
}



render(){
 
  return(



    
    <Text style={styles.UserName}>أريج الجريوي</Text>
     




    

    );//end return
  }//end render 
  
}// end function




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F8F4",
  },

  card: {
    backgroundColor: "#fff",
    marginBottom: -50,
    width: "100%",
    flexDirection: "column-reverse",
    shadowColor: "#000",
    shadowOpacity: 0.11,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  profileImage: {
    zIndex: 2,
    top: 90,
    left: 340,
  },

  rightItems: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    right: 60,
  },

  textContainer: {
    marginRight: 10,
  },

  textLabel: {
    color: "#404040",
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "right",
    fontSize: 16,
  },

  textData: {
    color: "#CBCA9E",
    fontFamily: "Bahij_TheSansArabic-Bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 70,
    borderTopLeftRadius: 70,
    height: 550,
    // margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 100,
  },

  modalText: {
    marginBottom: 15,
    // textAlign: "center"
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
    // fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 25,
    fontSize: 30,
  },
  header: {
    // fontFamily: "Bahij_TheSansArabic-Light",
    color: "#404040",
    fontSize: 30,
    margin: 20,
    top: 30,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  textInputTitle: {
    // fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    color: "#57694C",
    textAlign: "right",

    marginRight: 35,
  },
  close: {
    marginLeft: 20,
  },

  UserImage: {
    alignItems: "center",
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    left: 130,
    top: -20,
    zIndex: 2,
    width: 160,
    height: 160,
    resizeMode: "stretch",
  },
  UserName: {
    fontFamily: "Bahij_TheSansArabic-Bold",
    fontSize: 28,
    margin: 20,
    marginBottom: 40,
    bottom:20,
    right:-7,
    textAlign: "center",
    justifyContent: "center",
    color:'#746356',
  },

  RateStarts: {
    left: 140,
    bottom: 50,
  },
   
  PinkRectangleShapeView: {
    width: 120,
    height: 70,
    marginTop: 0,
    padding: 5,
    borderRadius: 15,
    marginLeft: 33,
    marginBottom: 0,
    left:185,
    top: -35,
    backgroundColor: "#D9AE94",
    borderColor: '#D3CECA',
    borderWidth: 2,
   
    },
    YellowRectangleShapeView: {
        alignItems: "center",
        width: 120,
        height: 70,
        marginTop: 0,
        padding: 5,
        borderRadius: 15,
        marginLeft: 33,
        marginBottom: 0,
        right:-25,
        top: -104,
        backgroundColor: "#F1DCA7",
        borderColor: '#D3CECA',
        borderWidth: 2,
       
        },

        debts: {
          fontFamily: "Bahij_TheSansArabic-Light",
          fontSize: 18,
          textAlign: "left",
          color: "#404040",
          top: -37,
          left: 70,
          zIndex: 2,
      
        },
        subsidy: {
          fontFamily: "Bahij_TheSansArabic-Light",
          fontSize: 18,
          textAlign: "right",
          color: "#404040",
          top: -10,
          right: 75,
      
        },
        buttonText: {
          textAlign: "center",
          top:-1,
          fontFamily: "Bahij_TheSansArabic-Light",
          fontSize: 40,
          color: '#fff',
         
        },
        




});