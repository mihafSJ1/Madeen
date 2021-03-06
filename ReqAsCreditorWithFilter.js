import React from "react";
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
import { Rating, AirbnbRating } from 'react-native-elements';
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import "@firebase/auth";
import "firebase/database";
import "firebase/firestore";
import FirebaseKeys from './FirebaseKeys';
import SearchInput, { createFilter } from 'react-native-search-filter';
import {Item,Container,Header,Icon,Input} from 'native-base';
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync} from './PushNotificationToken';
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { render } from "react-dom";
import { ArabicNumbers } from "react-native-arabic-numbers";
import { IconButton } from 'react-native-paper';


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

var usersArray = [];
let arrayFiltered22=[];
var x = 0;

firebase
  .database()
  .ref("users")
  .once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var Data = childSnapshot.val();

      usersArray.push(Data);
    });
  });

export default class ReqAsCreditor extends React.Component {
  state = { currentUser: null };
  //const [modalVisible, setModalVisible] = useState(false);

  state = {
    newRatingValue:5,
    // rating:5,
    ratingVisable: false,
    modalVisible: false,
    modalVisible2: false,
    CreditorEmail:"",
    specificStatus:false,
    SpecificStatusText:"",
    Searching:false,
    Found:false,
    pic:
      "https://firebasestorage.googleapis.com/v0/b/madeendb.appspot.com/o/draft%2FUserImageProfile.png?alt=media&token=8d72df15-548d-4112-819e-801ba9c2fea0",
    profilePic:
      "https://firebasestorage.googleapis.com/v0/b/madeendb.appspot.com/o/draft%2FUserImageProfile.png?alt=media&token=8d72df15-548d-4112-819e-801ba9c2fea0",
    noSubsidy: 0,
    noDebts: 0,
    RatingCount:0,
    requestsArr: [],
    nameChat:"m",
  
  };
  ratingCompleted = (rating) => {
    this.setState({ newRatingValue: rating });
            // console.log("Rating is: " + rating)
  }

  componentDidMount() {
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener(this._handleNotification);
    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
    var requestArray = [];

    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    firebase
    .database()
    .ref("requests/")
    .on("value", (snapshot) => {
      snapshot.forEach((child) => {

          requestArray.push({         
            creditor:child.val().creditor,
            expectedDate:child.val().expectedDate,
            installemntDuration: child.val().installemntDuration,
            installemntPrice:child.val().installemntPrice,
            installmentsType:child.val().installmentsType,
            price:child.val().price,
            reason:child.val().reason,
            repaymentType:child.val().repaymentType,
            rqeuestStatus:child.val().rqeuestStatus,
            submittedDate:child.val().submittedDate,
            userName:child.val().userName,
            userid:child.val().userid,
            key:child.key,
            remAmount: child.val().remAmount ,
            isRated: child.val().isRated,
          
            RatingCount:child.val().RatingCount
          });
          
        
      });
      this.setState({requestsArr:requestArray.reverse()})
    });
    }

    _handleNotification = notification => {
      this.setState({ notification: notification });
    }
  
    _handleNotificationResponse = response => {
      console.log(response);
    };

    sendPushNotificationRejact =(Key)=>{
      console.log("sendPushNotification");
      let Token;
      let userid;
      let creditorName;
      firebase
      .database()
      .ref("requests/"+Key).on("value", (snapshot) => {
        userid = snapshot.val().userid;
        creditorName = snapshot.val().creditorName;
      });
      firebase
      .database()
      .ref("users/"+userid).on("value", (snapshot) => {
        Token = snapshot.val().push_Notification_token;
      });
     console.log("ToKEN"+Token);
      let response = fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: Token,
          sound: 'default',
          title: 'طلب مرفوض',
          body: creditorName+ ' نعتذر، تم رفض طلبك من قِبل',
        })
      });
      firebase
      .database()
      .ref("notifications/")
      .push(
        {
         title: 'طلب مرفوض',
         body: creditorName+ ' نعتذر، تم رفض طلبك من قِبل',
         debtor:userid,
        notificationType: "reject request",
        });
    }

    setRatingModalVisible(visible,debtor) {
     var RatingCount = 0;
      var rating = 0;
      firebase
      .database()
      .ref("users/"+ debtor.userid,).on("value", (snapshot) => {
        RatingCount = snapshot.val().RatingCount;
        rating = snapshot.val().rating;
      });
      this.setState({
        ratingVisable: visible,
        debtorID: debtor.userid,
        RatingCount: RatingCount,
        rating :rating,
        requestKey: debtor.key
      
}, () => {
console.log(this.state.RatingCount+this.state.requestKey);

     


})

    
    }
    cancelRatingModal(visible){
      this.setState({
        ratingVisable: visible,

      }, () => {
 
   firebase
   .database()
.ref('requests/' + this.state.requestKey)
.update({
isRated:  true,
  })
 
    }) 

    }
    closeRatingModal(visible) {
   

      this.setState({
        ratingVisable: visible,
    
      
      }, () => {
     console.log( this.state.debtorID)
     console.log( this.state.RatingCount)
     console.log( this.state.newRatingValue)
    
        firebase
       .database()
   .ref('users/' + this.state.debtorID)
   .update({
    RatingCount: this.state.RatingCount+1,
    rating:  this.state.rating + this.state.newRatingValue,
 
      })
   
   firebase
   .database()
.ref('requests/' + this.state.requestKey)
.update({

isRated:  true,

  })
 
    }) 
  
  
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

  setTimelinePic(picNew) {
    this.setState({ pic: picNew });
  }
  setCreditorEmail(Email) {
    this.setState({ CreditorEmail: Email });
  }

  setSearching(flag) {

    this.setState({ Searching: flag}, function() {
      // do something with new state

      console.log("new code")
      console.log(this.state.Searching)
  });
    console.log("تروحين تغيرين الفلاق سيرتش ولا لا ")
    // this.setState({ Searching: flag });
    console.log("غيرت السيرتش")
    console.log(this.state.Searching)
  }
 
  setFound(flag) {

    this.setState({ Found: flag}, function() {
      // do something with new state

      console.log("new code2")
      console.log(this.state.Found)
  });
    // this.setState({ Found: flag });
  }
  setName(name) {
    this.setState({ nameChat: name });
  }

  setSpecificStatus(flag) {
    // console.log("تروحين تغيرين الفلاق الحاله ولا لا ")
    // this.setState({ specificStatus: flag});
    this.setState({ specificStatus: flag}, function() {
      // do something with new state

      console.log("new code3")
      console.log(this.state.specificStatus)
  });
  }
 


  setSpecificStatusText(text){
    
    this.setState({ SpecificStatusText: text}, function() {


      console.log("new code4")
      console.log(this.state.SpecificStatusText)
  });

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
        this.setState({ RatingCount: snapshot.val().RatingCount ,rating: snapshot.val().rating}, () => {
          console.log(this.state.rating );
         
           
          if (this.state.RatingCount!=0){
            console.log(this.state.RatingCount +"xxx");
            this.setState({ ratingValue:
     Math.round(this.state.rating / this.state.RatingCount)})
           }else{
            this.setState({ ratingValue:
            0})
            console.log(this.state.RatingCount +"else");

           }

               

             console.log(x +"c");
          })
        this.setprofilePic(snapshot.val().UserImage)
        this.setCreditorEmail(snapshot.val().email);

        console.log(this.state.profilePic);
      });



    this.setState({
      modalVisible2: true,
      namef: item.userName,
     // UserIDImage: item.userid,
      idChat: item.userid,
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
  //Areej Test

  // viewTimelineImageFunction(item) {
  //   firebase.auth();

  //   firebase
  //     .database()
  //     .ref("users/" + item.userid)
  //     .on("value", (snapshot) => {
  //       this.setTimelinePic(snapshot.val().UserImage);
  //       console.log("Areej Test");
  //       console.log(this.state.setTimelinePic);
  //     });
  // }


  openModalWithItem(item) {


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
      Rstatus: item.rqeuestStatus,
      creditorID: item.creditor,
      Rkey: item.key,
      rAmount: item.remAmount,
      cEmail: item.creditorEmail,
      rating : item.rating,
      RatingCount:item.RatingCount,
      idChat:item.userid,
      CreName:item.creditorName,
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
        this.setState({ RatingCount: snapshot.val().RatingCount ,rating: snapshot.val().rating}, () => {
          console.log(this.state.ratingValue );
          if (this.state.RatingCount!=0){
            this.setState({ ratingValue:
     Math.round(this.state.rating / this.state.RatingCount)})
           }else{
            this.setState({ ratingValue:
            0})

           }
      
               
        

          })
   
        console.log("inside retrive");
        this.setTimelinePic(snapshot.val().UserImage);
        // emailf=snapshot.val().email;
        // pic=snapshot.val().UserImage;
      });
    console.log(this.state.pic);
    console.log("انتهى رتريف الصورة");
  }

  conformupdateAccept(k,props){
    Alert.alert(
      "تنبيه ",
      "هل تريد قبول الطلب ",
      [{ text: "نعم", onPress: () => this.updateAccept(k,props) },
      {
        text: 'لا',
        onPress: () =>  this.setModalVisible(!this.state.modalVisible),
        style: 'cancel'
      },],
      { cancelable: false }
    );
  }

  
  conformupdateReject(k,props){
    Alert.alert(
      "تنبيه ",
      "هل تريد رفض الطلب ",
      [{ text: "نعم", onPress: () => this.updatestateReject(k,props) },
      {
        text: 'لا',
        onPress: () =>  this.setModalVisible(!this.state.modalVisible),
        style: 'cancel'
      },],
      { cancelable: false }
    );
  }

  updatestateReject(k,props){
    this.sendPushNotificationRejact (k);
this.setModalVisible(!this.state.modalVisible);
// props.navigate("squares");
  //   const { currentUser } = firebase.auth();
  firebase
  .database()
  .ref('requests/' + k)
.update({
  //     creditor:currentUser.uid,
    rqeuestStatus: "مرفوض",
  })
  .then(() => console.log('Data updated.'));
  props.navigate("squares")
  
  }

  list = (array,text) => {
    const currentUser = firebase.auth().currentUser.uid;

    return array.map((c) => {
      
      if (c.creditor == currentUser) {
        
        if (c.rqeuestStatus!="مرفوض") {
          return (
            <View>
                {/* {console.log(c.creditorID)} */}
                {console.log("هلا بالتعبانة")}
                {/* {console.log(c)} */}
              
              {/* {this.openModalWithItem2(c)} */}
              <TouchableOpacity
                // margin={10}
                style={styles.card}
                
                onPress={() => {
                  console.log("نداااء");
                
                  this.openModalWithItem(c);
               
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
                
                </View>
            

                {c.rqeuestStatus== "قيد الإنتظار" ? (
                  <View style={styles.waitingRectangleShapeView}> 
                    <Text style={styles.status2}> طلب جديد  </Text>
               
                    
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



{c.rqeuestStatus== "مكتمل"  ?   


                  <View  style={styles.CompleteRectangleShapeView}
                 
                  > 
                     <Text style={styles.status2}
             
               >مكتمل </Text>
              
                  
              </View>
            
// :c.rqeuestStatus== "مكتمل" && c.rating == true ?   
//   <View style={styles.CompleteRectangleShapeView}> 
   
//    <Text style={styles.status2}>مكتمل </Text>
//     <Text style={styles.status2}> {c.rqeuestStatus} </Text>
// </View>
:null}
          
                   
                 

                
                <View style={styles.rightItems}>

                  <View style={styles.textContainer}>

                    
           
             
                    <Text style={styles.textLabel}>
                      المدين |{" "}
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

                         {console.log(c.is)}
                         {c.rqeuestStatus== "مكتمل" && c.isRated == false  ?   
                     <Text style={styles.RatingButton}
      
                      onPress={() =>{ this.setRatingModalVisible(true,c)}}
             
               >قــيّــم!</Text>
                
               :  null }
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
                        
                  this.setModalVisible(!this.state.modalVisible)
                      }}
                    >
                      <AntDesign
                        style={styles.close}
                        name="close"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>


                    {this.state.Rstatus== "قيد التنفيذ" ? (
                  <View style={styles.ProRectangleShapeView}> 
                    <Text style={styles.statusInside2}> {this.state.Rstatus} </Text>
              </View>
):(
                      null
                      
                    )}

{this.state.Rstatus== "قيد الإنتظار" ? (
                  <View style={styles.WRectangleShapeView}> 
                    <Text style={styles.statusInside2}> طلب جديد  </Text>
              </View>
):(
                      null
                      
                    )}


{this.state.Rstatus== "مكتمل" ? (
                  <View style={styles.CRectangleShapeView}> 
                    <Text style={styles.statusInside}> {this.state.Rstatus} </Text>
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
                    {/* <Text style={styles.header}>   {this.state.CreName} الطلب </Text> */}
                
                 
                    
                    <Text style={styles.textInputTitle}>
                      {" "}
                      المدين |{" "}
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
                      </Text>
                    </Text>
                    <Text style={styles.textInputTitle}>
                      
                      <Text> السبب |</Text>
                      {/* {this.state.Reason == "" ? null : <Text> السبب |</Text>} */}
                      {this.state.Reason == "" ? (
                        <Text style={styles.textData}>
                        {" "}
                        لا يوجد سبب
                        {" "}
                      </Text>
                      ) : (
                        <Text style={styles.textData}>
                          {" "}
                          {this.state.Reason}{" "}
                        </Text>
                        
                      )}
                    </Text>



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
                    {this.state.Rstatus== "قيد الإنتظار" ? (
                      <TouchableOpacity
                      style={[styles.button, { backgroundColor: "#D4CEC9" }]}
                      onPress={() => {
                        this. conformupdateReject(this.state.Rkey,this.props.navigation)}}
                      
                    >
                
                      <Text style={styles.buttonText}> رفض </Text>
                    </TouchableOpacity>
                    ):
                    (null)}

{this.state.Rstatus== "قيد الإنتظار" ? (
                      <TouchableOpacity
                      style={[styles.button, { backgroundColor: "#CBCA9E" }]}
                      onPress = {()=>  { this.props.navigation.navigate("PayAsCreditor",{amount:this.state.Price, reqID: this.state.Rkey}),this.setModalVisible(!this.state.modalVisible)}}
                    >
                      <Text style={styles.buttonText}> قبول </Text>
                    </TouchableOpacity>
                    ):
                    (null)}

{this.state.Rstatus== "قيد التنفيذ" ? ( 
                      <Text style={styles.textprosses} > 
                      {/* "
                    
                    مثل المؤمنين في توادهم وتراحمهم وتعاطفهم
                    {'\n'}
                
                    كمثل الجسد
                      إذا اشتكى منه عضو
                      
                      {'\n'}
                        تداعى له سائر الجسد بالسهر والحمى" 
                        */}
                        "
                        مثل المؤمنين في توادهم وتراحمهم وتعاطفهم
                        {'\n'}
                        كمثل الجسد إذا اشتكى منه عضو
                        {'\n'}
                        تداعى له سائر الجسد بالسهر والحمّى
                        "
                        </Text>

                      
  
): null }
                    
                      {this.state.Rstatus== "مكتمل" ? ( 
                      <Text style={styles.textComplete}> "تم تسديد جميع المستحقات" </Text>
  
): null }
                      {this.state.Rstatus== "قيد التنفيذ" ? ( 

<IconButton
                     style={styles.chatIconP}
                      icon='message-plus'
                      size={38}
                      color='#986979'
                      //,{secondID:this.state.creditor}
                    
                      onPress={() => {this.props.navigation.navigate('addRoom',{secondID:this.state.idChat, reqIDforChat:this.state.Rkey, secondName: this.state.Name , firstName:this.state.nameChat}),this.setModalVisible(!this.state.modalVisible)}}
                    />
                    ): null }



{this.state.Rstatus== "مكتمل" ? ( 

<IconButton
                     style={styles.chatIconC}
                      icon='message-plus'
                      size={38}
                      color='#986979'
                      //,{secondID:this.state.creditor}
                    
                      onPress={() => {this.props.navigation.navigate('addRoom',{secondID:this.state.idChat, reqIDforChat:this.state.Rkey, secondName: this.state.Name, firstName:this.state.nameChat}),this.setModalVisible(!this.state.modalVisible)}}
                    />
                    ): null }

{this.state.Rstatus== "قيد الإنتظار" ? ( 

<IconButton
                     style={styles.chatIconW}
                      icon='message-plus'
                      size={38}
                      color='#986979'
                      //,{secondID:this.state.creditor}
                    
                      onPress={() => {this.props.navigation.navigate('addRoom',{secondID:this.state.idChat, reqIDforChat:this.state.Rkey, secondName: this.state.Name, firstName:this.state.nameChat}),this.setModalVisible(!this.state.modalVisible)}}
                    />
                    ): null }

                    </View>

{/* <View style={styles.buttonContainer}>
                    
                    <TouchableOpacity
                    
                    onPress = {()=>  {this.props.navigation.navigate("AddSubscription"),this.setModalVisible(!this.state.modalVisible)}}
                      style={[styles.button, { backgroundColor: "#CBCA9E" }]}
                      onPress={() => {
                        this. conformupdate(this.state.Rkey,this.props.navigation)}}
                    >
                      <Text style={styles.buttonText}> قبول </Text>
                    </TouchableOpacity>
                  </View> */}
  
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
                    <Text style={styles.Email}>{this.state.CreditorEmail}</Text>
                    {/* <Text style={styles.RateStarts}>
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
                    </Text> */}
                                  {  this.state.ratingValue == 0 ?
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
                { this.state.ratingValue== 2?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
                : null}
                {this.state.ratingValue== 3 ?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
                : null}
                 { this.state.ratingValue == 4 ?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
             
                : null}
                { this.state.ratingValue== 5?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
  
                </Text>:null}
    <Text style={styles.RatingNumber}> عدد المقيّمين |{ArabicNumbers(this.state.noSubsidy)}</Text> 

                    <Text style={styles.subsidy}> عدد التسليف </Text>
                    <Text style={styles.debts}> عدد الاستلاف </Text>
                    <View style={styles.PinkRectangleShapeView}>
                      <Text style={[styles.buttonText,{fontSize:40,color:"#fff"}]}>{this.state.RatingCount}</Text>
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
              {/* RATING */}
              <Modal
       
       animationType="fade"
       transparent={true}
       visible={this.state.ratingVisable}
     
     >
        <View style={styles.ratingcenteredView}>
          <View style={styles.RatingmodalView}>
          <Text style={styles.RatingmodalText}> كيف كانت تجربتك؟</Text>
         <AirbnbRating 
         reviewSize = {22}

       reviewColor = {'#CBCA9E'}
             
type='custom'
 count={5}
 ratingBackgroundColor={'green'}
 ratingColor='#3498db'
 ratingBackgroundColor='#c8c7c8'
 reviews={['سيئة','جيدة','متوسطة','ممتازة','رائعة']}
 defaultRating={5}
 onFinishRating={this.ratingCompleted}

 ratingColor={'#3498db'}
 ratingBackgroundColor={'red'}
 ratingText= {{
   fontSize: 2,
   textAlign: 'center',
   
  
 }}
 

 size={20}

/>
<View style={styles.buttonContainer}>
<TouchableOpacity
      style={[styles.Ratingbutton, { backgroundColor: "#D4CEC9" }]}
             onPress={() => {
             this.cancelRatingModal(false)
         
         

             }}
           >
             <Text  style={[styles.buttonText,{fontSize:12}]}>تخطي</Text>

           </TouchableOpacity>

           <TouchableOpacity
      style={[styles.Ratingbutton, { backgroundColor: "#CBCA9E" }]}
             onPress={() => {
             this.closeRatingModal(false)
         
         

             }}
           >
             <Text style={[styles.buttonText,{fontSize:12}]}>إرسال</Text>

           </TouchableOpacity>

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





  //To search a specific status 
searchStatus = (textTosearch)  =>{
    arrayFiltered22=[];
    firebase.auth();
    console.log("////////////////////////////////");
    this.setSpecificStatusText(textTosearch);
    console.log(this.state.SpecificStatusText);
    console.log("////////////////////////////////");
    
    if(textTosearch==""){
      this.setSearching(false);
      return;
    }
  
    if(textTosearch!=""){
      this.setSearching(true);
   
    }
    if(textTosearch=="قيد الإنتظار"){
        textTosearch="";
    }

    if(textTosearch=="طلب جديد"){
        textTosearch="قيد الإنتظار";
    }


  
     var check=false;
    for(var i =0 ,j = 0;i<this.state.requestsArr.length;i++){
      console.log(textTosearch)
      if(textTosearch!=""){
      if(textTosearch.trim()==this.state.requestsArr[i].rqeuestStatus.trim()){
       check=true;
        this.setFound(true);
        // this.setSearching(true);
        this.setSpecificStatus(true);
        this.setSpecificStatusText(textTosearch);
   
      arrayFiltered22[j++]=this.state.requestsArr[i]
      console.log(" دخلت الاف  ")
  
     
      
      }
      }
      }
  

  
  
  
  
  
  
    console.log(" دخلت السيرتش ")
   
  
  console.log(arrayFiltered22)
  console.log(" اخر السيرتش ")
  console.log(check)
  
    }

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
         {this.state.modalVisible || this.state.modalVisible2||this.state.ratingVisable?
        <View style=  {styles.shadow}>

        </View>
        : null}

        {/* -------------------------------------- CARD 1*/}

        <View style={styles.searchb} >

        <Icon name="" />
       <SearchInput 
       style={styles.searchInput}
       onChangeText={ (text) => { this.searchStatus(text) }
     
      } 
      
       placeholder="ابحث عن حالة محدده"/>



  
        <View style={styles.twoButton}>
        <Text style={styles.buttonTextNav2}   onPress={() => this.props.navigation.navigate("myReqWithFilter")}> مدين </Text>
        <View style={styles.WhiteRectangleShapeView}> 
              </View>
    



          
              <View style={styles.Green2RectangleShapeView}> 
              </View>
              

              <Text style={styles.buttonTextNav}
          onPress={() => this.props.navigation.navigate("ReqAsCreditorWithFilter")}
              > دائن </Text>
            
        <View style={styles.GreenRectangleShapeView}>
                
              </View>
        </View>

                 <View style={styles.ViewList}>
                 {this.state.Searching && this.state.Found?(



<ScrollView>{this.list(arrayFiltered22,this.state.SpecificStatusText)}</ScrollView>
):this.state.Searching && !this.state.Found?(


null): <ScrollView>{this.list(this.state.requestsArr,null)}</ScrollView>}

            </View>
        {/*View request */}
        </View>
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
  ViewList:{
    marginBottom:220,
    // backgroundColor:'blue',
    top:-25,
      },
      card: {
        top:1,
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
    width:418,
    borderTopRightRadius: 70,
    borderTopLeftRadius: 70,
    height: 600,
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

  chatIconP:{
    left:-330,
    top:-85,
    shadowColor: "#717172",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    }
  },
  chatIconC:{
    left:-266,
    top:45,
    shadowColor: "#717172",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    }
  },
  chatIconW:{
    left:-370,
    top:-10,
    shadowColor: "#717172",
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 0,
      height: 0,
    }
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
    top: 25,
    left:-30,
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
    // margin: 20,
    top: -50,
    

    textAlign: "center",
    justifyContent: "center",
    marginBottom: 30,
    width:170,
    left:95,
  },
  textInputTitle: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    color: "#57694C",
    textAlign: "right",
// left:30,
    marginRight: 35,
    top:-20,
    right:-17,
    width:330,


  },
  close: {
    marginLeft: 0,
    top:-5,
    color:'#746356',
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
  RatingNumber: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
  
     marginTop: -10,
     marginBottom: -17,
    bottom: 60,
    right: -5.5,
    textAlign: "center",
    justifyContent: "center",
    color: "#746356",
  },

  UserName: {
    fontFamily: "Bahij_TheSansArabic-Bold",
    fontSize: 28,
    margin: 20,
    marginBottom: 40,
    bottom: -5,
    right: -1,
    textAlign: "center",
    justifyContent: "center",
    color: "#746356",
  },

  

  GreenRectangleShapeView: {
    alignItems: "center",
    width: 360,
    height: 40,
    marginTop: 0,
    padding: 5,
    borderRadius: 15,
    marginLeft: 20,
    marginBottom: 0,
    right: 0,
    top: -130,
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
    width: 179,
    height: 34,
    marginTop: 0,
    padding: 5,
    borderRadius: 13,
    marginLeft: 0,
    marginBottom: 0,
    left:22,
    top: -31,
    backgroundColor: "#FFFFFF",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    zIndex:1,
    
    
  },


  
  ProssessRectangleShapeView:{
    alignItems: "center",
    width: 88,
    height: 25,
    borderRadius: 15,
    left:10,
    top: 18,
    backgroundColor: "#F1DCA7",
    
  },

  waitingRectangleShapeView:{
    alignItems: "center",
    width: 88,
    height: 25,
    borderRadius: 15,
    left:10,
    top: 18,
    backgroundColor: "#D9AE94",
    
  },

  RejectRectangleShapeView:{
    alignItems: "center",
    width: 88,
    height: 25,
    borderRadius: 15,
    left:10,
     top: 18,
    backgroundColor: "#BE6A6C",
  
  },

  CompleteRectangleShapeView:{
    alignItems: "center",
    width: 88,
    height: 25,
    borderRadius: 15,
    left:10,
    top: 18,
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
  statusInside:{
    textAlign: "right",
   left:160,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 15,
    color: "#404040",
  },

  statusInside2:{
    textAlign: "right",
   left:150,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 15,
    color: "#404040",
  },

  statusInsideReject:{
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 15,
    color: "#FFFFFF",
    left:160,
  },



  ProRectangleShapeView:{
    alignItems: "center",
    width: 388.5,
    height: 25,
    borderTopEndRadius:15,
    borderTopRightRadius:15,
    borderBottomRightRadius:15,
    left:-30,
    top: 28,
    backgroundColor: "#F1DCA7",
  
  },

  WRectangleShapeView:{
    alignItems: "center",
    width: 388.5,
    height: 25,
    
    borderTopEndRadius:15,
    borderTopRightRadius:15,
    borderBottomRightRadius:15,
    
    left:-33,
    top: 40,
    backgroundColor: "#D9AE94",
  
  },

  RRectangleShapeView:{
    alignItems: "center",
    width: 388.5,
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
    width: 388.5,
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
    left:150,
    top: -68,
    backgroundColor: "#EAF4E1",
    borderColor: "#EAF4E1",
    borderWidth: 1,
    zIndex:0,
    
    
  },
  buttonTextNav:{
    textAlign: "center",
    top: -95,
    left:43,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 22,
    color: "#404040",
    zIndex:2,
    width:50,
    paddingLeft: 45,
    paddingRight:90,
    
  },
  buttonTextNav2:{
    textAlign: "center",
    top: 0,
    left: 205,
  
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 22,
    color: "#404040",
    zIndex:7,
    paddingLeft: 50,
    paddingRight: 50,
    // paddingBottom: 2,
    // paddingTop: 0,
    // backgroundColor:'blue',
    width:100,
    paddingRight: 90,
    paddingLeft: 60,
    paddingTop:-40,
   
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
    left: 95,
    top: 0,
    zIndex: 2,
    width: 160,
    height: 160,
    resizeMode: "stretch",
    borderRadius: 100,
    borderColor: "#CBCA9E",
    borderWidth: 4,
  },
  textprosses: {
    textAlign: 'center',
    top:-50,
    color: "#986979",
    fontFamily: "Bahij_TheSansArabic-Bold",
    fontSize:15,
    alignItems: "center",
    left:-15,
    marginTop:40,
  width:330,
    shadowColor: "#FFCB69",
    shadowOpacity: 0.21,
    shadowOffset: {
      width: 0,
      height: 0,
    }
  
    
  },
  textComplete: {
    color: "#A8CB9E",
    fontFamily: "Bahij_TheSansArabic-Bold",
    fontSize:20,
    alignItems: "center",
    left:40,
    top:40,
    shadowColor: "#FFCB69",
    shadowOpacity: 0.41,
    shadowOffset: {
      width: 0,
      height: 0,
    }
  },


  PinkRectangleShapeView: {
    width: 120,
    height: 70,
    marginTop: 0,
    padding: 5,
    borderRadius: 15,
    marginLeft: 33,
    marginBottom: 0,
    left: 165,
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
    right: -5,
    top: -105,
    backgroundColor: "#F1DCA7",
    borderColor: "#D3CECA",
    borderWidth: 2,
  },

  debts: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 18,
    textAlign: "left",
    color: "#404040",
    top: -40,
    left: 50,
    zIndex: 2,
  },
  subsidy: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 18,
    textAlign: "right",
    color: "#404040",
    top: -12,
    right: 42,
  },
  RateStarts: {
    
    left: 100,
    bottom: 70,
  },
  Email: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
    marginBottom: 0,
    margin: 20,
    marginBottom: 40,
    bottom: 40,
    right: -1,
    textAlign: "center",
    justifyContent: "center",
    color: "#746356",
  },

  twoButton:{
    top:-90,
    left:-4,
      },

      searchb:{
        top:10,
        bottom:-30,
        flex: 1,
        // backgroundColor: '#fff',
        justifyContent: 'flex-start',
        // backgroundColor:'pink',
        width:390,
       
      
      },
    
    
      searchInput:{
        top:12,
        marginBottom:10,
        padding: 10,
        borderColor: '#ffffff',
        borderWidth: 1,
        width:390,
        height:40,
        borderRadius:10,
        fontSize:15,
        fontFamily: "Bahij_TheSansArabic-Light",
        left:0,
        textAlign:'right',
        backgroundColor:'#ffffff',
      
      },
    
      searchHeader:{
        backgroundColor: 'transparent',
        opacity: 0.6
        
      },
      ratingcenteredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      RatingmodalView: {
        height:240,
        width:300,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      RatingmodalText: {
        fontFamily: "Bahij_TheSansArabic-Light",
        fontSize:20,
        marginBottom: 0,
        textAlign: "center"
      },
      Ratingbutton: {
        alignItems: "center",
        width: 100,
        height: 25,
        marginTop: 50,
        padding: 5,
        borderRadius: 15,
        marginLeft: 10,
        bottom: 10,
        // right:200,
        backgroundColor: "#fff",
    
      },
      RatingButton:{
        color: "#EDD44D",
        fontFamily: "Bahij_TheSansArabic-Bold",
        fontSize:18,
        marginBottom:-10,
        textAlign:'right',
        right:260,
        bottom:15,
        shadowColor: "grey",
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        elevation: 5
      },
     


   
      shadow:{
        position:'absolute',
        height:2000,
        width:'100%',
        opacity:0.5,
        padding:100,
        backgroundColor:"gray",
        zIndex:120,
      
      },

});
