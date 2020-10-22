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
import FirebaseKeys from './FirebaseKeys';
import { withNavigation } from "react-navigation";

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
var myRequest = [];
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
        requestArray.push({
          creditor:child.val().creditor,
           expectedDate:child.val().expectedDate,
           installemntPrice:child.val().installemntPrice,
            installmentsType:child.val().installmentsType,
            price:child.val().price,
           reason:child.val().reason,
            repaymentType:child.val().repaymentType,
          rqeuestStatus:child.val().rqeuestStatus,
            submittedDate:child.val().submittedDate,
           userName:child.val().userName,
           userid:child.val().userid,
            key:child.key,});
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

  componentDidMount() {
    requestArray=[]
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    firebase
      .database()
      .ref("requests/")
      .on("value", (snapshot) => {
        snapshot.forEach((child) => {
          if (true) {
            requestArray.push({
              creditor:child.val().creditor,
               expectedDate:child.val().expectedDate,
               installemntPrice:child.val().installemntPrice,
                installmentsType:child.val().installmentsType,
                price:child.val().price,
               reason:child.val().reason,
                repaymentType:child.val().repaymentType,
              rqeuestStatus:child.val().rqeuestStatus,
                submittedDate:child.val().submittedDate,
               userName:child.val().userName,
               userid:child.val().userid,
                key:child.key,});
          }
        });
      });
    }

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
      submittedDate:item.submittedDate,
      Rstatus: item.rqeuestStatus,
      Rkey: item.key,
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
  EditRequest(k,Rstatus){
    if(Rstatus!= "قيد الإنتظار"){
      Alert.alert(
        "عذرا",
        " لا يمكن تعديل هذا الطلب ",
        [{ text: "موافق", },
       ],
        { cancelable: false }
      );
    }
    else{
    this.setModalVisible(!this.state.modalVisible);
    this.props.navigation.navigate('EditRequest',{
      itemId:k,
      
    });

  }}
  conformRemove(k,Rstatus){
    if(Rstatus== "قيد الإنتظار"){
    Alert.alert(
      "تنبيه ",
      "هل تريد حذف الطلب ",
      [{ text: "نعم", onPress: () => this.Remove(k) },
      {
        text: 'لا',
        // onPress: () =>  this.setModalVisible(!this.state.modalVisible),
        style: 'cancel'
      },],
      { cancelable: false }
    );
  }
  else{
    Alert.alert(
      "تنبيه ",
      "لايمكنك حذف الطلب ",
      [{ text: "موافق"},
     ],
      { cancelable: false }
    );
  }
}
  Remove(k){
    firebase
    .database()
   .ref('requests/' + k).remove()
   this.props.navigation.navigate("squares");

  }
  list = () => {
    const currentUser = firebase.auth().currentUser.uid;

    return requestArray.map((c) => {
      if (c.userid == currentUser) {
        if (true) {
          return (
            <View>
                
                {console.log("هلا بالتعبانة")}
                {console.log(c)}
              
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
                 {console.log("here2")}
                 {console.log(c.userName)}
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
                {console.log("here3")}
                
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
                      {" "}
                      حالة الطلب |<Text style={styles.textData}> {c.rqeuestStatus} </Text>
                    </Text>

                    

                    <Text style={styles.textLabel}>
                      {" "}
                      تاريخ إنشاء الطلب |<Text style={styles.textData}> {c.submittedDate} </Text>
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
              {console.log("here4")}
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                  <TouchableOpacity
                 
              style={styles.EditR}
              onPress={() => this.EditRequest(this.state.Rkey,this.state.Rstatus)}>

              {this.state.Rstatus!= "قيد الإنتظار" ? null:(
             
            
              <Text style={styles.EditR2}>
                <Ionicons name="md-create" size={30} color="#808065" solid />
              </Text>)}
            </TouchableOpacity>

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
                      حالة الطلب |{" "}
                      <Text style={styles.textData}> {this.state.Rstatus} </Text>
                    </Text>

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
                    <Text style={styles.textInputTitle}>

                       {this.state.iType == "" ? null : <Text> فترة التقسيط |</Text>}
                       {this.state.iType == "" ? null : (
                    <Text style={styles.textData}> {this.state.Duration} </Text>
                       )}
                      </Text><Text style={styles.textInputTitle}>{" "}
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
                    {this.state.Rstatus!= "قيد الإنتظار" ? null:(
                      <TouchableOpacity
                        style={[styles.button, { backgroundColor: "#FA8072" }]}
                        onPress={() => this.conformRemove(this.state.Rkey,this.state.Rstatus)}
                      >
                        <Text style={styles.buttonText}> حذف </Text>
                      </TouchableOpacity>)}

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
   

        <Text style={styles.buttonTextNav2}   onPress={() => this.props.navigation.navigate("myRequest")}> مدين </Text>
        <View style={styles.WhiteRectangleShapeView}> 
              </View>
     



           
              <View style={styles.Green2RectangleShapeView}> 
              </View>
              

              <Text style={styles.buttonTextNav}
          onPress={() => this.props.navigation.navigate("ReqAsCreditor")}
              > دائن </Text>
            
        <View style={styles.GreenRectangleShapeView}>
                
              </View>
              
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
      top:0,
    backgroundColor: "#fff",
    marginBottom: 10,
    width: 400,
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
    left: -120,
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
 EditR: {
    left: 253,
    bottom: -40,
    zIndex: 2,

    shadowColor: "#000000",
    shadowOpacity: 0.3,
    width: 90,
    shadowOffset: {
      // width: 100,
      // height: 100,
    },
  },
 EditR2: {
    left: 60,
    bottom: 0,
    zIndex: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.71,
    shadowOffset: {
      width: 100,
      height: 100,
    },
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
    height: 650,
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
  modalView: {
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 70,
    borderTopLeftRadius: 70,
    width:"100%",
    height: 700,
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
   // marginRight: 20,
    marginLeft: 79,

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

  GreenRectangleShapeView: {
    alignItems: "center",
    width: 360,
    height: 34,
    marginTop: 0,
    padding: 5,
    borderRadius: 15,
    marginLeft: 0,
    marginBottom: 0,
    right: 0,
    top: -140,
    backgroundColor: "#EAF4E1",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    marginBottom:-122,
    shadowColor: "#000",
    shadowOpacity: 0.11,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    
  },

  WhiteRectangleShapeView: {
    alignItems: "center",
    width: 178,
    height: 27,
    marginTop: 0,
    padding: 5,
    borderRadius: 15,
    marginLeft: 0,
    marginBottom: 0,
    right: 0,
    left:88,
    top: -51,
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    zIndex:2,
    
    
  },
  test:{
backgroundColor:'red',
  },

  Green2RectangleShapeView: {
    alignItems: "center",
    width: 178,
    height: 27,
    marginTop: 0,
    padding: 5,
    borderRadius: 15,
    marginLeft: 0,
    marginBottom: 0,
    right: 0,
    left:-90,
    top: -78,
    backgroundColor: "#EAF4E1",
    borderColor: "#EAF4E1",
    borderWidth: 1,
    zIndex:2,
    
    
  },
  buttonTextNav:{
    textAlign: "center",
    top: -107,
    right: 90,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
    color: "#404040",
    zIndex:2,
    paddingLeft: 50,
    paddingRight: 50,
    // paddingBottom: 2,
    // paddingTop: 0,
    // backgroundColor:'red',
  },
  buttonTextNav2:{
    textAlign: "center",
    top: -23,
    left: 92,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
    color: "#404040",
    zIndex:7,
    paddingLeft: 50,
    paddingRight: 50,
    // paddingBottom: 2,
    // paddingTop: 0,
    // backgroundColor:'red',
   
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