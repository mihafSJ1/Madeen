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
import "firebase/database";
import "firebase/firestore";
//import database from '@react-native-firebase/database';

import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { render } from "react-dom";

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
var requestArray = [];
var usersArray = [];

// firebase
//   .database()
//   .ref("users")
//   .once("value", function (snapshot) {
//     snapshot.forEach(function (childSnapshot) {
      
//       usersArray.push(childSnapshot.val());
//     });
//   });

firebase
  .database()
  .ref("requests")
  .once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var Data = childSnapshot.val();
      // var expectedDate = childSnapshot.expectedDate;
      // var installemntDuration = childSnapshot.installemntDuration;
      // var installemntPrice = childSnapshot.installemntPrice;
      //  var installmentsType = childSnapshot.installmentsType;
      // var price = childSnapshot.price;
      // var reason=childSnapshot.reason;
      // var repaymentType=childSnapshot.repaymentType;
      // var rqeuestStatus=childSnapshot.rqeuestStatus;
      //  var submittedDate=childSnapshot.submittedDate;
      // var userid = childSnapshot.userid;
      
          requestArray.push(Data);
           console.log(Data);
    });
  });
//   // firebase
//   // .database()
//   // .ref("users")
//   // .once("value", function (snapshot) {
//   //   snapshot.forEach(function (childSnapshot) {
//   //     var user = childSnapshot.val();
//   //     // var expectedDate = childSnapshot.expectedDate;
//   //     // var installemntDuration = childSnapshot.installemntDuration;
//   //     // var installemntPrice = childSnapshot.installemntPrice;
//   //     //  var installmentsType = childSnapshot.installmentsType;
//   //     // var price = childSnapshot.price;
//   //     // var reason=childSnapshot.reason;
//   //     // var repaymentType=childSnapshot.repaymentType;
//   //     // var rqeuestStatus=childSnapshot.rqeuestStatus;
//   //     //  var submittedDate=childSnapshot.submittedDate;
//   //     // var userid = childSnapshot.userid;
      
//   //        usersArray.push(user);
//   //          console.log(user);
//   //   });
//   // });
firebase
        .database()
        .ref("users/")
        .on("value", (snapshot) => {
          snapshot.forEach((child) => {
            //console.log(child.val().uid);
              usersArray.push(child.val());
            
          });
        });
export default class Timeline extends React.Component {
  //state = { currentUser: null };
  //const [modalVisible, setModalVisible] = useState(false);
  
  
 
 state = {
      modalVisible: false,
      pic:"https://firebasestorage.googleapis.com/v0/b/madeen-46af8.appspot.com/o/Draft%2FUserImageProfile.png?alt=media&token=647ebe23-8753-4e8f-a29a-c902048a810a",
    };


  
  
  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    firebase
      .database()
      .ref("requests/")
      .on("value", (snapshot) => {
        snapshot.forEach((child) => {
          if (child.val().uid != currentUser.uid) {
            requestArray.push(child.val());
          }
        });
      });
    }
    
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  
  openModalWithItem(item) {
    this.setState({
      modalVisible: true,
      Name: item.userName,
      Type: item.repaymentType,
      Price: item.price,
      EDate: item.expectedDate,
      Reason: item.reason,
    Duration:item.installemntDuration,
    Tprice:item.installemntPrice,
    iType:item.installmentsType,
    });
  }
  

 
  setPic(picNew) {
    this.setState({ pic: picNew });
  }


  list = () => {
    const currentUser = firebase.auth().currentUser.uid;
   
    return requestArray.map((c) => {
      
      if (c.userid != currentUser) {
      
        if (c.creditor == "") {
       
         
      return (
        <View>
          <TouchableOpacity
            margin={10}
            style={styles.card}
            onPress={() => {
              this.openModalWithItem(c);
            }}
          >
            <View style={styles.rightItems}>
              <Ionicons
                name="ios-arrow-back"
                size={25}
                color="#9B9B7A"
                solid
                style={{ marginTop: 30, marginRight: 45 }}
              />
              <Ionicons name="ios-star" size={17} color="#ECD246" solid />
              <Ionicons name="ios-star" size={17} color="#ECD246" solid />
              <Ionicons name="ios-star" size={17} color="#ECD246" solid />
              <Ionicons name="ios-star" size={17} color="#ECD246" solid />
              <Ionicons name="ios-star" size={17} color="#ECD246" solid />

              <View style={styles.textContainer}>
                <Text style={styles.textLabel}>
                  الإسم |<Text style={styles.textData}> {c.userName}</Text>
                </Text>

                <Text style={styles.textLabel}>
                  المبلغ |<Text style={styles.textData}> {c.price} </Text>
                </Text>

                <Text style={styles.textLabel}>
                  {c.reason == "" ? null : <Text> السبب |</Text>}
                  {c.reason == "" ? null : (
                    <Text style={styles.textData}> {c.reason} </Text>
                  )}
                </Text>
              </View>
            
              <Image
                 source={require("./assets/UserImagePlaceholder.png")}
              ></Image>
            </View>
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <AntDesign
                    style={styles.close}
                    name="close"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <Text style={styles.header}>تفاصيل الطلب </Text>
                <Text style={styles.textInputTitle}>
                  {" "}
                  اسم الدائن |{" "}
                  <Text style={styles.textData}> {this.state.Name} </Text>
                </Text>
                <Text style={styles.textInputTitle}>
                  نوع التسديد |{" "}
                  <Text style={styles.textData}> {this.state.Type} </Text>
                </Text>
           
                <Text style={styles.textInputTitle}>
                  {" "}
                  المبلغ|
                  <Text style={styles.textData}> {this.state.Price} </Text>{" "}
                </Text>

                <Text style={styles.textInputTitle}>
                  {" "}
                  التاريخ النهائي المتوقع لإكمال التسديد|{" "}
                  <Text style={styles.textData}> {this.state.EDate} </Text>{" "}
                </Text>
                <Text style={styles.textInputTitle}>
                  {" "}
                  {this.state.Reason == "" ? null : <Text> السبب |</Text>}
                  {this.state.Reason == "" ? null : (
                    <Text style={styles.textData}> {this.state.Reason} </Text>
                  )}
                </Text>
                <Text style={styles.textInputTitle}>

                  {this.state.Duration == "" ? null : <Text> فترة التقسيط |</Text>}
                  {this.state.Duration == "" ? null : (
                    <Text style={styles.textData}> {this.state.Duration} </Text>
                  )}
                </Text>
                <Text style={styles.textInputTitle}>
                  {" "}
                  {this.state.iType == "" ? null : <Text> طريقة التقسيط |</Text>}
                  {this.state.iType == "" ? null : (
                    <Text style={styles.textData}> {this.state.iType} </Text>
                  )}
                </Text>
                <Text style={styles.textInputTitle}>
                  {" "}
                  {this.state.Tprice == "" ? null : <Text> مبلغ التقسيط |</Text>}
                  {this.state.Tprice == "" ? null : (
                    <Text style={styles.textData}> {this.state.Tprice} </Text>
                  )}
                </Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#D4CEC9" }]}
                  >
                    <Text style={styles.buttonText}> رفض </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#CBCA9E" }]}
                  >
                    <Text style={styles.buttonText}> قبول </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );}}
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[
            "rgba(217,174,148,0.36)",
            "rgba(241,220,167,0.43)",
            "#EEF2ED",
          ]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          useAngle
          angle={180}
          style={{
            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,
            width: Dimensions.get("window").width * 2.1,
            height: Dimensions.get("window").width * 3.1,
            right: -660,
            top: -630,
            position: "absolute",
          }}
        ></LinearGradient>

        {/* -------------------------------------- CARD 1*/}

        <ScrollView>{this.list()}</ScrollView>

        {/*View request */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F8F4",
  },
  container2: {
    marginTop: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.11,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  rightItems: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },

  textContainer: {
    marginRight: 10,
  },

  textLabel: {
    color: "#404040",
    // fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "right",
    fontSize: 16,
  },

  textData: {
    color: "#CBCA9E",
    // fontFamily: "Bahij_TheSansArabic-Bold",
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
  imageT:{
    width: 60,
    height: 60,
    resizeMode: "stretch",
  
    zIndex:2, 
    borderWidth:10,
    borderColor:'red',
  },
  
});
