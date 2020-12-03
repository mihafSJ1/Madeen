import { StatusBar } from "expo-status-bar";
import { ArabicNumbers } from "react-native-arabic-numbers";

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
import { IconButton } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import "@firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { withNavigation } from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

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


var count =0;
class Timeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      modalVisible: false,
      modalVisible2: false,
      requestsArr:[],
      pic:
        "https://firebasestorage.googleapis.com/v0/b/madeendb.appspot.com/o/draft%2FUserImageProfile.png?alt=media&token=8d72df15-548d-4112-819e-801ba9c2fea0",
      profilePic:
        "https://firebasestorage.googleapis.com/v0/b/madeendb.appspot.com/o/draft%2FUserImageProfile.png?alt=media&token=8d72df15-548d-4112-819e-801ba9c2fea0",
      noSubsidy: 0,
      noDebts: 0,
      RatingCount:0,
      nameChat:"m",
      emailf:"",

    };
  }

  componentDidMount() {
  
   var requestArray=[];

    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    firebase
      .database()
      .ref("requests/")
      .on("value", (snapshot) => {
        snapshot.forEach((child) => {
          if (child.val().uid != currentUser.uid) {
           requestArray.push({
              creditor:child.val().creditor,
               expectedDate:child.val().expectedDate,
               installemntPrice:child.val().installemntPrice,
                installmentsType:child.val().installmentsType,
                installemntDuration: child.val().installemntDuration,
                price:child.val().price,
               reason:child.val().reason,
                repaymentType:child.val().repaymentType,
              rqeuestStatus:child.val().rqeuestStatus,
              submittedDate:child.val().submittedDate,
               userName:child.val().userName,
               userid:child.val().userid,
              key:child.key,
              remAmount: child.val().remAmount});
          }
        });
        this.setState({requestsArr:requestArray.reverse()})
      });
///////////////////////////////////// المفترض ارجع كل يوزر وعدد استلافه وتسليفه

      


    }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  setModalVisible2(visible) {
    this.setState({ modalVisible2: visible });
  }
  setprofilePic(picNew) {
    this.setState({ profilePic: picNew });
  }
  setName(name) {
    this.setState({ nameChat: name });
  }

  setTimelinePic(picNew) {
    this.setState({ pic: picNew });
  }
  setEmail(emailProfile) {
    this.setState({ emailf: emailProfile });
  }
  viewProfileFunction(item) {
    firebase.auth();
    firebase
      .database()
      .ref("users/" + item.userid)
      .on("value", (snapshot) => {
        this.setEmail(snapshot.val().email);
        
        this.setState({ RatingCount: snapshot.val().RatingCount ,rating: snapshot.val().rating}, () => {
          console.log(this.state.rating );
          this.state.rating / this.state.RatingCount
               
          if (this.state.RatingCount!=0|| this.state.RatingCount!= null){
            this.setState({ ratingValue:
     Math.round(this.state.rating / this.state.RatingCount)})
           }else{
            this.setState({ ratingValue:
            0})

           }
          })
        this.setprofilePic(snapshot.val().UserImage);
      });
    this.setState({
      modalVisible2: true,
      namef: item.userName,
   
      creditorID: item.userid,
      ReqIDforChat:item.key
    });

    let countSubsidy = 0;
    let countDebts = 0;
    firebase
    .database()
    .ref("requests")
    .on("value", function (snapshot) {
      snapshot.forEach(function (child) {
        if(item.userid == child.val().creditor){
          if ("قيد التنفيذ" == child.val().rqeuestStatus || "مكتمل" == child.val().rqeuestStatus  ){
            countSubsidy++;
        }
        }else  if(item.userid == child.val().userid){
          if ("مكتمل" == child.val().rqeuestStatus ){
          countDebts++;
        }
      }
    });
    });
    this.setState({ noDebts: countDebts });
    this.setState({ noSubsidy: countSubsidy });
  }
 

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
    this.setState({ currentUser });
    const { currentUser } = firebase.auth();

 firebase
      .database()
      .ref("users/" + currentUser.uid)
      .on("value", (snapshot) => {
        this.setName(snapshot.val().fullName);
        console.log("Areej Test");
        console.log(this.state.setTimelinePic);
      });
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
      Rkey: item.key,
      rAmount: item.remAmount,
      userid:item.userid,
    });
  }

  openModalWithItem2(item) {
    console.log(item.userid);
    firebase.auth();
    firebase
      .database()
      .ref("users/" + item.userid)
      .on("value", (snapshot) => {
        console.log("inside retrive");
        this.setTimelinePic(snapshot.val().UserImage);

      });
    console.log(this.state.pic);
    
  }
  conformupdate(k,props){
    Alert.alert(
      "تنبيه ",
      "هل تريد قبول الطلب ",
      [{ text: "نعم", onPress: () => this.updatestate(k,props) },
      {
        text: 'لا',
        onPress: () =>  this.setModalVisible(!this.state.modalVisible),
        style: 'cancel'
      },],
      { cancelable: false }
    );
  }


  list = () => {
    const currentUserName = firebase.auth().currentUser.fullName;
    const { currentUser } = firebase.auth();
    return this.state.requestsArr.map((c) => {
     count++;
      if (c.userid != currentUser.uid) {
        if (c.creditor == "") {
         
          return (
            <View>
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  this.openModalWithItem(c);
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
                      {" "}
                      تاريخ إنشاء الطلب |<Text style={styles.textData}> {c.submittedDate} </Text>
                    </Text>
                    
                  </View>
              
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
                      اسم المدين |{" "}
                      <Text style={styles.textData}> {this.state.Name} </Text>
                    </Text>

                  
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
                    <Text> السبب |</Text>
                      {" "}
                      {/* {this.state.Reason == "" ? null : <Text> السبب |</Text>} */}
                      {this.state.Reason == "" ? <Text style={styles.textData}>
                        لا يوجد سبب
                        </Text> : (
                        <Text style={styles.textData}>
                          {""}
                          {this.state.Reason}{" "}
                        </Text>
                        
                      )}
                    </Text>
                
                    <Text style={styles.textInputTitle}>

{this.state.iType == "" ? null : <Text> فترة التقسيط |</Text>}
{this.state.iType == "" ? null : (
<Text style={styles.textData}> {this.state.Duration} </Text>
)}
</Text>
                      <Text style={styles.textInputTitle}>{" "}
                      {this.state.iType == "" ? null : <Text> طريقة التقسيط |</Text>}
                       {this.state.iType == ""? null : (
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
                      
                      onPress = {()=>  { this.props.navigation.navigate("PayAsCreditor",{amount:this.state.Price, reqID: this.state.Rkey}),this.setModalVisible(!this.state.modalVisible)}}
                        style={[styles.button, { backgroundColor: "#CBCA9E" }]}
                        // onPress={() => {
                        //   this. conformupdate(this.state.Rkey,this.props.navigation)}}
                      >
                        <Text style={styles.buttonText}> قبول </Text>
                      </TouchableOpacity>
                    
                      <IconButton
       style={styles.chatIcon}
        icon='message-plus'
        size={38}
        color='#986979'
        //,{secondID:this.state.creditor}
      
        onPress={() => {this.props.navigation.navigate('addRoom',{secondID:this.state.userid , reqIDforChat:this.state.Rkey ,secondName:this.state.Name, firstName:this.state.nameChat}),this.setModalVisible(!this.state.modalVisible)}}      />
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
                    <Text style={styles.UserName}>{this.state.namef}</Text>
                    <Text style={styles.UserEmail}>{this.state.emailf}</Text>
                    {this.state.ratingValue == 0 ?
              <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
             
                : null}
                { this.state.ratingValue == 1 ?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
                : null}
                {this.state.ratingValue == 2?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
                : null}
                { this.state.ratingValue== 3 ?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
                : null}
                 {this.state.ratingValue== 4 ?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
             
                : null}
                {this.state.ratingValue == 5?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
  
                </Text>:null}
                <Text style={styles.RatingNumber}> عدد المقيّمين | { ArabicNumbers(this.state.RatingCount)}</Text>

                    <Text style={styles.subsidy}> عدد التسليف </Text>
                    <Text style={styles.debts}> عدد الاستلاف </Text>
                    <View style={styles.PinkRectangleShapeView}>
                      <Text style={[styles.buttonText,{fontSize:40,color:"#fff"}]}>{ArabicNumbers(this.state.noSubsidy)} </Text>
                    </View>
                    <View style={styles.YellowRectangleShapeView}>
                      <Text style={[styles.buttonText,{fontSize:40,color:"#fff"}]}> {ArabicNumbers(this.state.noDebts)}</Text>
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
         {this.state.modalVisible || this.state.modalVisible2?
        <View style=  {styles.shadow}>

        </View>
        : null}

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
    marginBottom:130,
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
    left: -60,
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
    width:"100%",
    height: 520,
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
    marginTop: 15,
    padding: 5,
    borderRadius: 15,
    marginLeft: 10,
    backgroundColor: "#fff",
  },
  // buttonText: {
  //   fontFamily: "Bahij_TheSansArabic-Light",
  //   textAlign: "center",
  //   fontSize: 50,
  //   color:'#fff',
  //   fontWeight:"bold",
  // },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
   // marginRight: 20,
    marginLeft: 79,
    marginTop: -31,
    fontSize: 10,
  },
  RatingNumber:{
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
  
      marginTop: 5,
     marginBottom: -23,
    bottom: 60,
    right: -11.5,
    textAlign: "center",
    justifyContent: "center",
    color: "#746356",
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

    marginRight: 10,
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


  UserName: {
    fontFamily: "Bahij_TheSansArabic-Bold",
    fontSize: 28,
    margin: 0,
    marginBottom: 0,
    bottom: 10,
    right: -7,
    textAlign: "center",
    justifyContent: "center",
    color: "#746356",
  },

  UserEmail:{
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 22,
    margin: 20,
    marginBottom: 40,
    bottom: 20,
    right: -7,
    textAlign: "center",
    justifyContent: "center",
    color: "#746356",
  },
  RateStarts: {
    left: 110,
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
    left: 160,
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
    // right: -10,
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
    left: 50,
    zIndex: 2,
  },
  subsidy: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 18,
    textAlign: "right",
    color: "#404040",
    top: -10,
    right: 40,
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
    left: 100,
    top: -30,
    zIndex: 2,
    width: 160,
    height: 160,
    resizeMode: "stretch",
    borderRadius: 100,
    borderColor: "#CBCA9E",
    borderWidth: 4,
  },   shadow:{
    position:'absolute',
    height:2000,
    width:'100%',
    opacity:0.5,
    padding:100,
    backgroundColor:"gray",
    zIndex:120,
  
  },
 

  chatIcon:{
    top:7,
    left:-230,
    shadowColor: "#717172",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    
  }



  
  //end
});
export default withNavigation(Timeline);