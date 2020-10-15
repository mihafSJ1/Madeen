// كودنا المدموج
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
  Alert,
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
var requestArray = [];
var usersArray = [];
var namef = "name";
var emailf = "email";
// var pic="https://firebasestorage.googleapis.com/v0/b/madeen-46af8.appspot.com/o/Draft%2FUserImageProfile.png?alt=media&token=647ebe23-8753-4e8f-a29a-c902048a810a";
var UserIDImage = "2";
var UserID = "3";
let namefff = "999999";

firebase
  .database()
  .ref("users")
  .once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var Data = childSnapshot.val();
      usersArray.push(Data);
    });
  });
// firebase
// .database()
// .ref("requests")
// .once("value", function (snapshot) {
//   snapshot.forEach(function (childSnapshot) {
//     var Data = childSnapshot.val();
//     // var expectedDate = childSnapshot.expectedDate;
//     // var installemntDuration = childSnapshot.installemntDuration;
//     // var installemntPrice = childSnapshot.installemntPrice;
//     //  var installmentsType = childSnapshot.installmentsType;
//     // var price = childSnapshot.price;
//     // var reason=childSnapshot.reason;
//     // var repaymentType=childSnapshot.repaymentType;
//     // var rqeuestStatus=childSnapshot.rqeuestStatus;
//     //  var submittedDate=childSnapshot.submittedDate;
//     // var userid = childSnapshot.userid;

//         requestArray.push(Data);
//         // console.log(Data);
//   });
// });

const currentUser = firebase.auth();
//this.setState({ currentUser });
firebase
  .database()
  .ref("requests/")
  .on("value", (snapshot) => {
    snapshot.forEach((child) => {
      //if (child.val().uid != currentUser.uid) {
      requestArray.push(child.val());
      //  }
    });
  });

export default class Timeline extends React.Component {
  state = { currentUser: null };
  //const [modalVisible, setModalVisible] = useState(false);

  state = {
    modalVisible: false,
    modalVisible2: false,
    pic:
      "https://firebasestorage.googleapis.com/v0/b/madeendb.appspot.com/o/draft%2FUserImageProfile.png?alt=media&token=8d72df15-548d-4112-819e-801ba9c2fea0",
    profilePic:
      "https://firebasestorage.googleapis.com/v0/b/madeendb.appspot.com/o/draft%2FUserImageProfile.png?alt=media&token=8d72df15-548d-4112-819e-801ba9c2fea0",
  };

  // componentDidMount() {
  //   const { currentUser } = firebase.auth();
  //   this.setState({ currentUser });
  //   firebase
  //     .database()
  //     .ref("requests/")
  //     .on("value", (snapshot) => {
  //       snapshot.forEach((child) => {
  //         if (child.val().uid != currentUser.uid) {
  //           requestArray.push(child.val());
  //         }
  //       });
  //     });
  //   }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setModalVisible2(visible) {
    this.setState({ modalVisible2: visible });
  }

  // setPic(picNew) {
  //   this.setState({ pic: picNew });
  // }
  setprofilePic(picNew) {
    this.setState({ profilePic: picNew });
  }

  setTimelinePic(picNew) {
    this.setState({ pic: picNew });
  }
  viewProfileFunction(item) {
    firebase.auth();
    // console.log(item.userName);
    console.log("شوفي فوق ");

    firebase
      .database()
      .ref("users/" + item.userid)
      .on("value", (snapshot) => {
        console.log("جوا البيس");

        this.setprofilePic(snapshot.val().UserImage);

        console.log(this.state.profilePic);
      });

    console.log("بتنحل");

    console.log("here");

    console.log("here");

    this.setState({
      modalVisible2: true,
      namef: item.userName,
      UserIDImage: item.userid,
    });
    console.log("يارب١");
    //  console.log(item.userid);
    console.log("يارب٢");
    //  console.log(this.state.namef);
    //   this.findImage(this.state.UserIDImage);
  }
  //Areej Test

  viewTimelineImageFunction(item) {
    firebase.auth();

    firebase
      .database()
      .ref("users/" + item.userid)
      .on("value", (snapshot) => {
        this.setTimelinePic(snapshot.val().UserImage);
        console.log("Areej Test");
        console.log(this.state.setTimelinePic);
      });
  }

  openModalWithItem(item) {
    this.setState({
      submmitedDate: item.submmitedDate,
      modalVisible: true,
      Name: item.userName,
      Type: item.repaymentType,
      Price: item.price,
      EDate: item.expectedDate,
      Reason: item.reason,
      Duration: item.installemntDuration,
      Tprice: item.installemntPrice,
      iType: item.installmentsType,
    });

    //  this.openModalWithItem2(item)
  }

  //رجعيها اذا ما ضبط الحال

  openModalWithItem2(item) {
    console.log(item.userid);
    firebase.auth();
    firebase
      .database()
      .ref("users/" + item.userid)
      .on("value", (snapshot) => {
        console.log(" الثانيه  جوا البيس");
        // console.log(item.userid);
        //  console.log(snapshot.val().UserImage);

        // this.setName(snapshot.val().fullName),
        // this.setEmail(snapshot.val().email),
        console.log("inside retrive");
        this.setTimelinePic(snapshot.val().UserImage);
        // emailf=snapshot.val().email;
        // pic=snapshot.val().UserImage;
      });
    console.log(this.state.pic);
    console.log("انتهى رتريف الصورة");
  }

  list = () => {
    const currentUser = firebase.auth().currentUser.uid;

    return requestArray.map((c) => {
      if (c.userid != currentUser) {
        if (c.creditor == "") {
          return (
            <View>
              {/* {this.openModalWithItem2(c)} */}
              <TouchableOpacity
                // margin={10}
                style={styles.card}
                onPress={() => {
                  console.log("نداااء");
                  // console.log(c.UserID);
                  this.openModalWithItem(c);
                  // this.openModalWithItem2(c);
                  // this.viewProfileFunction(c);
                  console.log("رغد الحلوه");
                  //   console.log(c);
                  //   console.log(c.userid);
                  //  console.log(this.state.UserID);
                  // this.viewProfileFunction(this.state.UserID);
                }}
              >
                <View style={styles.leftItems}>
                  <Ionicons
                    name="ios-arrow-back"
                    size={25}
                    color="#9B9B7A"
                    solid
                    style={{ marginTop: 30, marginRight: 45 }}
                  />
                  <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                  <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                  <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                  <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                  <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                </View>
                <View style={styles.rightItems}>
                  <View style={styles.textContainer}>
                    <Text style={styles.textLabel}>
                      الإسم |{" "}
                      <Text
                        style={styles.textData}
                        onPress={() => this.viewProfileFunction(c)}
                      >
                        {" "}
                        {c.userName}
                      </Text>
                    </Text>

                    <Text style={styles.textLabel}>
                      {" "}
                      المبلغ |<Text style={styles.textData}> {c.price} <Text>ريال سعودي </Text></Text>
                    </Text>

                    

                    <Text style={styles.textLabel}>
                      {c.reason == "" ? null : <Text> السبب |</Text>}
                      {c.reason == "" ? null : (
                        <Text style={styles.textData}> {c.reason} </Text>
                      )}
                    </Text>
                  </View>
                  {/* <TouchableOpacity style={styles.imageT} 
           onPress={() => {
            // this.setModalVisible2(!this.state.modalVisible2);
             this.viewProfileFunction(c);
           }}>  */}
                  {/* {console.log(this.state.pic)} */}
                  {/* <Image style={styles.imageT}
            // source={{uri: this.state.pic}}
            source={{uri: this.state.pic}}
          ></Image> */}
                  {/* </TouchableOpacity> */}
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

                    {/* <Text style={styles.textInputTitle}>
                      {" "}
                  تاريخ الطلب |{" "}
                      <Text style={styles.textData}>
                        {" "}
                        {this.state.submmitedDate}{" "}
                      </Text>{" "}
                    </Text> */}
                    <Text style={styles.textInputTitle}>
                      نوع التسديد |{" "}
                      <Text style={styles.textData}> {this.state.Type} </Text>
                    </Text>
                    <Text style={styles.textInputTitle}>
                      {" "}
                      المبلغ|
                      <Text style={styles.textData}>
                        {" "}
                        {this.state.Price}{" "}
                        <Text>ريال سعودي </Text>
                      </Text>{" "}
                    
                    </Text>

                    <Text style={styles.textInputTitle}>
                      {" "}
                      التاريخ المتوقع لإكمال التسديد|{" "}
                      <Text style={styles.textData}>
                        {" "}
                        {this.state.EDate}{" "}
                      </Text>{" "}
                    </Text>
                    <Text style={styles.textInputTitle}>
                      {" "}
                      {this.state.Reason == "" ? null : <Text> السبب |</Text>}
                      {this.state.Reason == "" ? null : (
                        <Text style={styles.textData}>
                          {" "}
                          {this.state.Reason}{" "}
                        </Text>
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

              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible2}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setModalVisible2(!this.state.modalVisible2);
                      }}
                    >
                      <AntDesign
                        style={styles.close}
                        name="close"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                    <Image
                      style={styles.UserImage}
                      source={{ uri: this.state.profilePic }}
                    />
                    {/* namef   = snapshot.val().fullName;
      emailf   = snapshot.val().email;
      pic */}

                    {/* <Text style={styles.header}> الملف الشخصي </Text> */}
                    {/* {console.log(c.userName)} */}
                    {/* {console.log(this.state.UserID)} */}
                    <Text style={styles.UserName}>{this.state.namef}</Text>
                    {/* <Text style={styles.UserName}>{this.state.UserID}</Text>
            <Text style={styles.UserName}>{this.state.UserID}</Text>
            <Text style={styles.UserName}> {this.state.Name}</Text>
            <Text style={styles.UserName}> hiiiiiiiiiii</Text> */}

                    {/* {c.userName} */}
                    <Text style={styles.RateStarts}>
                      <Ionicons
                        name="ios-star"
                        size={33}
                        color="#E4E4E4"
                        solid
                      />
                      <Ionicons
                        name="ios-star"
                        size={33}
                        color="#E4E4E4"
                        solid
                      />
                      <Ionicons
                        name="ios-star"
                        size={33}
                        color="#E4E4E4"
                        solid
                      />
                      <Ionicons
                        name="ios-star"
                        size={33}
                        color="#E4E4E4"
                        solid
                      />
                      <Ionicons
                        name="ios-star"
                        size={33}
                        color="#E4E4E4"
                        solid
                      />
                    </Text>

                    <Text style={styles.subsidy}> عدد التسليف </Text>
                    <Text style={styles.debts}> عدد الاستلاف </Text>
                    <View style={styles.PinkRectangleShapeView}>
                      <Text style={[styles.buttonText,{fontSize:40,color:"#fff"}]}>٠ </Text>
                    </View>
                    <View style={styles.YellowRectangleShapeView}>
                      <Text style={[styles.buttonText,{fontSize:40,color:"#fff"}]}> ٠</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#fff" }]}
                      ></TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#fff" }]}
                      ></TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          );
        }
      }
    });
  };

  render() {
    console.log;
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
    top: 120,
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
    flexDirection: "row",
    // justifyContent: "flex-end",
  },
  rightItems: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    width: "100%",
    left: -250,
  },

  leftItems: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // backgroundColor: "#000",
    left: 30,
    top: 20,
    // width: "100%",
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
    // alignItems: "center",
    // width: 170,
    // height: 30,
    // marginTop: 10,
    // padding: 5,
    // borderRadius: 15,
    // marginLeft: 10,
    // backgroundColor: "#fff",
    // fontSize:10,
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
    fontSize: 50,
    color:'#fff',
    fontWeight:"bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 25,
    fontSize: 10,
  },
  header: {
    fontFamily: "Bahij_TheSansArabic-Light",
    color: "#404040",
    fontSize: 30,
    margin: 20,
    // top: 30,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  textInputTitle: {
    fontFamily: "Bahij_TheSansArabic-Light",
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

  // style for view profile

  imageT: {
    width: 60,
    height: 60,
    resizeMode: "stretch",

    zIndex: 2,
    borderWidth: 10,
    borderColor: "red",
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
    bottom: 20,
    right: -7,
    textAlign: "center",
    justifyContent: "center",
    color: "#746356",
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
    left: 185,
    top: -35,
    backgroundColor: "#D9AE94",
    borderColor: "#D3CECA",
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
    right: -25,
    top: -104,
    backgroundColor: "#F1DCA7",
    borderColor: "#D3CECA",
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
    top: -1,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 15,
    color: "#404040",
  },
  UserImage: {
    alignItems: "center",
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    left: 127,
    top: -50,
    zIndex: 2,
    width: 160,
    height: 160,
    resizeMode: "stretch",
    borderRadius: 100,
    borderColor: "#CBCA9E",
    borderWidth: 4,
  },

  // button1:{
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginRight: 20,
  //   marginLeft: 25,
  //   fontSize: 5,
  // borderRadius:15,
  // },
  button: {
    alignItems: "center",
    width: 170,
    height: 30,
    marginTop: 80,
    padding: 5,
    borderRadius: 15,
    marginLeft: 10,
    backgroundColor: "#fff",
    fontSize: 10,
    // alignItems: "center",
    // width: 170,
    // height: 30,
    // marginTop: 10,
    // padding: 5,
    // borderRadius: 15,
    // marginLeft: 10,
    // backgroundColor: "#fff",
  },

  //end
});
