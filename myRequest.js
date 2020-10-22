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
      requestArray.push(child.val());
      //  }
    });
  });

export default class MyRequest extends React.Component {
  state = { currentUser: null };
  //const [modalVisible, setModalVisible] = useState(false);

  state = {
    modalVisible: false,
    modalVisible2: false,
    CreditorName:"",
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
            requestArray.push(child.val());
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
  
  setCreditorName(Name) {
    this.setState({ CreditorName: Name });
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
        //console.log("Areej Test");
        console.log(this.state.setTimelinePic);
      });
  }

  Creditor(Cid) {
    firebase.auth();

    firebase
      .database()
      .ref("users/" + Cid)
      .on("value", (snapshot) => {
        this.setCreditorName(snapshot.val().fullName);
        console.log("Areej Test");
       // console.log(this.state.setTimelinePic);
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
      CreditorID: item.creditor,
      RemAmount: item.remAmount
      
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
                    style={{ marginTop: 25, marginRight: 15 }}
                  />
                  <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                  <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                  <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                  <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                  <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                </View>
                {c.rqeuestStatus== "قيد الإنتظار" ? (
                  <View style={styles.waitingRectangleShapeView}> 
                    <Text style={styles.status2}> {c.rqeuestStatus} </Text>
              </View>
):(
                      null
                      
                     )}

{c.rqeuestStatus== "قيد التنفيذ" ? (
                  <View style={styles.ProssessRectangleShapeView}> 
                    <Text style={styles.status2}> {c.rqeuestStatus} </Text>
              </View>
):(
                      null
                      
                     )}


{c.rqeuestStatus== "مكتمل" ? (
                  <View style={styles.CompleteRectangleShapeView}> 
                    <Text style={styles.status2}> {c.rqeuestStatus} </Text>
              </View>
):(
                      null
                      
                     )}

{c.rqeuestStatus== "مرفوض" ? (
                  <View style={styles.RejectRectangleShapeView}> 
                    <Text style={styles.status2}> {c.rqeuestStatus} </Text>
              </View>
):(
                      null
                      
                     )}
                
                    
                {console.log("here3")}
                
                <View style={styles.rightItems}>
                  <View style={styles.textContainer}>
                {/* {  this.Creditor(c.creditor)} */}
                    <Text style={styles.textLabel}>
                      الدائن |{" "}
                      <Text
                        style={styles.textData}
                        onPress={() => this.viewProfileFunction(c)}
                      >
                        {" "}
                        {/* {console.log(this.state.CreditorName)}
                        {this.state.CreditorName} */}
                        {c.userName}
                      </Text>
                    </Text>

                    <Text style={styles.textLabel}>
                      {" "}
                      المبلغ |<Text style={styles.textData}> {c.price} <Text>ريال سعودي </Text></Text>
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
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                    >
                      <AntDesign
                        style={styles.close}
                        name="close"
                        size={24}
                        color="#746356"
                      />
                    </TouchableOpacity>
                    
                    {this.state.Rstatus== "قيد التنفيذ" ? (
                  <View style={styles.ProRectangleShapeView}> 
                    <Text style={styles.status2}> {this.state.Rstatus} </Text>
              </View>
):(
                      null
                      
                     )}

{this.state.Rstatus== "قيد الإنتظار" ? (
                  <View style={styles.WRectangleShapeView}> 
                    <Text style={styles.status2}> {this.state.Rstatus} </Text>
              </View>
):(
                      null
                      
                     )}


{this.state.Rstatus== "مكتمل" ? (
                  <View style={styles.CRectangleShapeView}> 
                    <Text style={styles.status2}> {this.state.Rstatus} </Text>
              </View>
):(
                      null
                      
                     )}

{this.state.Rstatus== "مرفوض" ? (
                  <View style={styles.RRectangleShapeView}> 
                    <Text style={styles.status3}> {this.state.Rstatus} </Text>
              </View>
):(
                      null
                      
                     )}
                    <Text style={styles.header}>تفاصيل الطلب </Text>
                    {/* <Text style={styles.textInputTitle}>
                      {" "}
                      حالة الطلب |{" "}
                      <Text style={styles.textData}> {this.state.Rstatus} </Text>
                    </Text> */}
                  {/* {  this.Creditor(c.creditor)} */}
                    <Text style={styles.textInputTitle}>
                      {" "}
                     الدائن |{" "}
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
                    {this.state.Rstatus == "قيد التنفيذ" ? (
                      <Text style={styles.textInputTitle}>
                      {" "}
                      المتبقي من الدين|
                      <Text style={styles.textData}>
                        {" "}
                        {this.state.RemAmount}{" "}
                        <Text>ريال سعودي </Text>
                      </Text>{" "}
                    
                    </Text>
                    ) : null }

                    

                    <Text style={styles.textInputTitle}>

                       {this.state.Duration == "" ? null : <Text> فترة التقسيط |</Text>}
                       {this.state.Duration == "" ? null : (
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
                    
                    {/* {c.rqeuestStatus == "قيد الإنتظار" ? <Text> </Text> : <Text style={styles.textData}> {c.rqeuestStatus} </Text>} */}

{/* {if(c.rqeuestStatus == "قيد الإنتظار"){} } */}
{this.state.Rstatus== "قيد الإنتظار" ? (
                         <Text style={styles.textWait}> انتظر حتى يتم الرد على طلبك </Text>

):(
                      // <TouchableOpacity
                      //   style={[styles.button, { backgroundColor: "#D4CEC9" }]}
                      // >
                      //   <Text style={styles.buttonText}> رفض </Text>
                      // </TouchableOpacity>
                      null
                      
                     )}
                    


{this.state.Rstatus== "قيد التنفيذ" ? ( 
<TouchableOpacity
    style={[styles.Paybutton, { backgroundColor: "#66795A" }]}
  >
    <Text style={styles.PaybuttonText}> دفع </Text>
  </TouchableOpacity>):(null
  
 )}

{this.state.Rstatus== "مكتمل" ? ( 
                       <Text style={styles.textComplete}> "تم تسديد جميع المستحقات" </Text>
  
 ): null }
 
 {this.state.Rstatus== "مرفوض" ? ( 
                       <Text style={styles.textReject}> نعتذر، تم رفض طلبك </Text>
  
 ): null }
      


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
    left: -180,
  },

  leftItems: {
    flexDirection: "row",
    justifyContent: "flex-start",
    // backgroundColor: "#000",
    left: 10,
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
  textComplete: {
    color: "#A8CB9E",
    fontFamily: "Bahij_TheSansArabic-Bold",
    fontSize:20,
    alignItems: "center",
    left:40,
    shadowColor: "#FFCB69",
    shadowOpacity: 0.41,
    shadowOffset: {
      width: 0,
      height: 0,
    }
  },
  

  textReject: {
    color: "#BE6A6C",
    fontFamily: "Bahij_TheSansArabic-Bold",
    fontSize:20,
    alignItems: "center",
    left:70,
    shadowColor: "#FFCB69",
    shadowOpacity: 0.41,
    shadowOffset: {
      width: 0,
      height: 0,
    }
  },


  textWait: {
    color: "#D3CDC8",
    fontFamily: "Bahij_TheSansArabic-Bold",
    fontSize:20,
    alignItems: "center",
    left:40,
    shadowColor: "#FFCB69",
    shadowOpacity: 0.41,
    shadowOffset: {
      width: 0,
      height: 0,
    }
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width:650,
    right:120,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    width:425,
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
 
  buttonText: {
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "center",
    fontSize: 50,
    color:'#fff',
    fontWeight:"bold",
  },
  PaybuttonText: {
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
    // margin: 20,
    top: -50,

    textAlign: "center",
    justifyContent: "center",
    marginBottom: 30,
    width:170,
    left:90,
    
  },
  textInputTitle: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    color: "#57694C",
    textAlign: "right",

    // marginRight: 1,
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
  ProssessRectangleShapeView:{
    alignItems: "center",
    width: 88,
    height: 25,
    borderRadius: 15,
    left:-70,
    top: 75,
    backgroundColor: "#F1DCA7",
    
   

  },

  waitingRectangleShapeView:{
    alignItems: "center",
    width: 88,
    height: 25,
    borderRadius: 15,
    left:-70,
    top: 75,
    backgroundColor: "#D3CDC8",
    
   

  },

  RejectRectangleShapeView:{
    alignItems: "center",
    width: 88,
    height: 25,
    borderRadius: 15,
    left:-70,
    top: 75,
    backgroundColor: "#BE6A6C",
    
   

  },

  CompleteRectangleShapeView:{
    alignItems: "center",
    width: 88,
    height: 25,
    borderRadius: 15,
    left:-70,
    top: 75,
    backgroundColor: "#A8CB9E",
    
   

  },
  status3:{
    textAlign: "center",
   
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 15,
    color: "#FFFFFF",
  },
  status2:{
    textAlign: "center",
   
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 15,
    color: "#404040",
  },
  ProRectangleShapeView:{
    alignItems: "center",
    width: 340,
    height: 25,
    
    borderTopEndRadius:15,
    borderTopRightRadius:15,
    borderBottomRightRadius:15,
    
    left:-30,
    top: 45,
    backgroundColor: "#F1DCA7",
  
  },

  WRectangleShapeView:{
    alignItems: "center",
    width: 340,
    height: 25,
    
    borderTopEndRadius:15,
    borderTopRightRadius:15,
    borderBottomRightRadius:15,
    
    left:-30,
    top: 45,
    backgroundColor: "#D3CDC8",
  
  },

  RRectangleShapeView:{
    alignItems: "center",
    width: 340,
    height: 25,
    
    borderTopEndRadius:15,
    borderTopRightRadius:15,
    borderBottomRightRadius:15,
    
    left:-30,
    top: 45,
    backgroundColor: "#BE6A6C",
  
  },

  CRectangleShapeView:{
    alignItems: "center",
    width: 340,
    height: 25,
    
    borderTopEndRadius:15,
    borderTopRightRadius:15,
    borderBottomRightRadius:15,
    
    left:-30,
    top: 45,
    backgroundColor: "#A8CB9E",
  
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
  PaybuttonText: {
    textAlign: "center",
    fontFamily: "Bahij_TheSansArabic-Bold",
    top: -4,
    bottom: -18,
    textAlign: "center",
    fontSize: 18,
    color:'#fff',
    // fontWeight:"bold",
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
    right:30,
  },

  Paybutton:{
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
    height: 35,
    marginTop: 0,
    padding: 5,
    borderRadius: 15,
    marginLeft: 10,
    backgroundColor: "#fff",
    right:-50,
    top:-30,
    shadowColor: "#000",
    shadowOpacity: 0.21,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  //end
});