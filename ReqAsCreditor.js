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
        import {registerForPushNotificationsAsync} from './PushNotificationToken';
        import { Ionicons } from "@expo/vector-icons";
        import { FlatList } from "react-native-gesture-handler";
        import { render } from "react-dom";
        import * as Notifications from 'expo-notifications';

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
        firebase
          .database()
          .ref("requests/")
          .on("value", (snapshot) => {
            snapshot.forEach((child) => {
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
                      key:child.key,
                      remAmount: child.val().remAmount});
            });
          });

        export default class ReqAsCreditor extends React.Component {
          state = { currentUser: null };
          //const [modalVisible, setModalVisible] = useState(false);

          state = {
            modalVisible: false,
            modalVisible2: false,
            CreditorEmail:"",
            pic:
              "https://firebasestorage.googleapis.com/v0/b/madeendb.appspot.com/o/draft%2FUserImageProfile.png?alt=media&token=8d72df15-548d-4112-819e-801ba9c2fea0",
            profilePic:
              "https://firebasestorage.googleapis.com/v0/b/madeendb.appspot.com/o/draft%2FUserImageProfile.png?alt=media&token=8d72df15-548d-4112-819e-801ba9c2fea0",
          };

          componentDidMount() {
            registerForPushNotificationsAsync();
            Notifications.addNotificationReceivedListener(this._handleNotification);
            Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
            requestArray=[];
          
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
                    remAmount: child.val().remAmount });
                  
                }
              });
            });
            }

            _handleNotification = notification => {
              this.setState({ notification: notification });
            }
          
            _handleNotificationResponse = response => {
              console.log(response);
            };
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
          viewProfileFunction(item) {
            firebase.auth();
            // console.log(item.userName);
            console.log("شوفي فوق ");

            firebase
              .database()
              .ref("users/" + item.userid)
              .on("value", (snapshot) => {
                console.log("جوا البيس");

                this.setprofilePic(snapshot.val().UserImage)
                this.setCreditorEmail(snapshot.val().email);

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
            console.log("يارب٢");
            
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
              creditorID: item.creditor,
              Rkey: item.key,
              rAmount: item.remAmount,
              cEmail: item.creditorEmail
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
          // updatestateAccept(k,props){
            
          // //   this.setModalVisible(!this.state.modalVisible);
          // //  props.navigate("squares");
          // //   const { currentUser } = firebase.auth();
          // //   firebase
          // //   .database()
          // //   .ref('requests/' + k)
          // //   .update({
          // //     creditor:currentUser.uid,
          // //     rqeuestStatus: "قيد التنفيذ",
          // //   })
          // //   .then(() => console.log('Data updated.'));
            
          
          // }
          
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

          list = () => {
            const currentUser = firebase.auth().currentUser.uid;

            return requestArray.map((c) => {
              
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
                          <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                          <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                          <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                          <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                          <Ionicons name="ios-star" size={17} color="#E4E4E4" solid />
                        </View>
                        {console.log("here3")}

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


        {c.rqeuestStatus== "مكتمل" ? (
                          <View style={styles.CompleteRectangleShapeView}> 
                            <Text style={styles.status2}> {c.rqeuestStatus} </Text>
                      </View>
        ):(
                              null
                              
                            )}

                        
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
          

                <Text style={styles.buttonTextNav2}   onPress={() => this.props.navigation.navigate("myRequestP")}> مدين </Text>
                <View style={styles.WhiteRectangleShapeView}> 
                      </View>
            



                  
                      <View style={styles.Green2RectangleShapeView}> 
                      </View>
                      

                      <Text style={styles.buttonTextNav}
                  onPress={() => this.props.navigation.navigate("ReqAsCreditorP")}
                      > دائن </Text>
                    
                <View style={styles.GreenRectangleShapeView}>
                        
                      </View>
                         <View style={styles.ViewList}>
                <ScrollView>{this.list()}</ScrollView>
                    </View>
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
          ViewList:{
            marginBottom:150,
            
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
            height: 34,
            marginTop: 0,
            padding: 5,
            borderRadius: 15,
            marginLeft: 0,
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
            width: 178,
            height: 27,
            marginTop: 0,
            padding: 5,
            borderRadius: 13,
            marginLeft: 0,
            marginBottom: 0,
            right: 0,
            left:-88,
            top: -47,
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
            backgroundColor: "#D9AE94",
            
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
            left:-90,
            top: -78,
            backgroundColor: "#EAF4E1",
            borderColor: "#EAF4E1",
            borderWidth: 1,
            zIndex:0,
            
            
          },
          buttonTextNav:{
            textAlign: "center",
            top: -97,
            right: 90,
            fontFamily: "Bahij_TheSansArabic-Light",
            fontSize: 20,
            color: "#404040",
            zIndex:2,
            paddingLeft: 50,
            paddingRight: 50,
          },
          buttonTextNav2:{
            textAlign: "center",
            top: -20,
            left: 92,
            fontFamily: "Bahij_TheSansArabic-Light",
            fontSize: 20,
            color: "#404040",
            zIndex:7,
            paddingLeft: 50,
            paddingRight: 50,
          
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
            left:30,
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

        });
