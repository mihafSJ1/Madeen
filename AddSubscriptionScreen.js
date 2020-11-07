import React from 'react';
import * as Notifications from 'expo-notifications';

import { StyleSheet, Text, View, ScrollView,Dimensions ,Alert} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PaymentFormView from './PaymentFormView';
import { LinearGradient } from "expo-linear-gradient";
// import {schedulePushNotification} from './schedulePushNotification';
import {registerForPushNotificationsAsync} from './PushNotificationToken';
 import * as firebase from "firebase";

const STRIPE_ERROR = 'حدث خطأ عند الدفع، حاول مرة أخرى';
const SERVER_ERROR = 'الخادم غير متوفر، حاول مرة أخرى';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51HcqzjAReRyTcF617BS3RHvCHjouUNJNg6lzyY2az0IWFbAHurDOp6aiTKJS5abZ02PlH35EOOMyzNNpNSKh1iWq0046Usv5pE';
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
const getCreditCardToken = (creditCardData,amount) => {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc,
    'card[metadata[amount]]': amount,
    'card[metadata[currency]]': "SAR"
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data to Stripe
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).then(response => response.json());
};

const subscribeUser = (creditCardToken) => {
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    setTimeout(() => {
      resolve({ status: true });
    }, 1000)
  });
};

export default class AddSubscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: null,
      keyD: "",
    }
  }
  static navigationOptions = {
    title: 'Subscription page',
  };
  componentDidMount(){
    registerForPushNotificationsAsync();
    Notifications.addNotificationReceivedListener(this._handleNotification);
    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
     }

     _handleNotification = notification => {
      this.setState({ notification: notification });
    }
  
    _handleNotificationResponse = response => {
      console.log(response);
    };

     sendPushNotification =(Key)=>{
       console.log("sendPushNotification");
       let Token;
       let userid;
       let  expectedDate;
       let   submittedDate;
       let repaymentType;
       let     userName ;
       let installemntPrice;
       let  installmentsType;
       let creditorName;
       firebase
       .database()
       .ref("requests/"+Key).on("value", (snapshot) => {
         userid = snapshot.val().userid;
  
              expectedDate=snapshot.val().expectedDate,
             submittedDate=snapshot.val().submittedDate,
             repaymentType =snapshot.val().repaymentType,
              // userid = currentUser.uid,
             userName =snapshot.val().userName,
             creditorName =snapshot.val().creditorName,
              installemntPrice=snapshot.val().installemntPrice,
             //installemntDuration=this.state.durationState,
             installmentsType=snapshot.val().installmentsType
  
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
           title: 'مَدِين | قبول الطلب',
           body: ' تم قبول طلبك من  قِبل '+ creditorName,
          })
       });
       firebase
       .database()
       .ref("notifications/")
       .push(
         {
          title: 'قبول الطلب',
          body: ' تم قبول طلبك من  قِبل '+ creditorName,
          debtor:userid,
          opened: false,
         notificationType: "accept request",
         });
        // schedulePushNotification(userName,submittedDate,installmentsType,repaymentType);
     }
 
  // Handles submitting the payment request
  onSubmit = async (creditCardInput,reqID,amount,remAmount,type,nKey) => {
    const { navigation } = this.props;
    this.sendPushNotification(reqID);

    const { currentUser } = firebase.auth();
    var name;
    var email;
    firebase
      .database()
      .ref("users/" + currentUser.uid)
      .on("value", (snapshot) => {
      name=snapshot.val().fullName,
      email=snapshot.val().email
      });
alert(nKey)
      firebase
      .database()
     .ref('notifications/' + nKey).remove();

      firebase
      .database()
      .ref('requests/' + reqID)
      .update({
        creditor:currentUser.uid,
        creditorEmail:email,
        creditorName: name,
        rqeuestStatus: "قيد التنفيذ",
      })
      .then(() => Alert.alert(
        "تنبيه ",
        "من سار بين الناس جابرًا للخواطر أدركه الله في جوف المخاطر! تم الدفع بنجاح.",
        [{ text: "موافق", onPress: () => this.props.navigation.navigate("ReqAsCreditorP") }],
        { cancelable: false }
      ));
    // Disable the Submit button after the request is sent
    this.setState({ submitted: true });
   
    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(creditCardInput, amount);
      if (creditCardToken.error) {
        // Reset the state if Stripe responds with an error
        // Set submitted to false to let the user subscribe again
        this.setState({ submitted: false, error: STRIPE_ERROR });
        return;
      }
    } catch (e) {
      // Reset the state if the request was sent with an error
      // Set submitted to false to let the user subscribe again
      this.setState({ submitted: false, error: STRIPE_ERROR });
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      this.setState({ submitted: false, error: SERVER_ERROR });
    } else {
      this.setState({ submitted: false, error: null });

      // navigation.navigate('squares')
    }
  };
  
  // render the subscription view component and pass the props to it
  render() {
    const { submitted, error } = this.state;
    const {amount} = this.props.route.params;
    const {reqID} = this.props.route.params;
    const {nKey} = this.props.route.params
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
    
            <ScrollView style={styles.background} ref={ref => (this.scrollViewRef = ref)}>
          
              <View style={styles.textWrapper}>
              
    
                <Text style={[styles.textInputTitle, {fontFamily: "Bahij_TheSansArabic-Light", fontSize:30,marginTop:20,}]}>
              الدفع 
                </Text>
           
              </View>
              <View style={styles.textWrapper}>
                <Text style={styles.title}>
              <Text style={{fontFamily: "Bahij_TheSansArabic-Light",  color: "#404040",}}>المبلغ المستحق | </Text> 
                {amount} ريال سعودي
                </Text>
              
              </View>
         
              <View style={styles.cardFormWrapper}>
                <PaymentFormView  
                error={error}
          submitted={submitted}
          onSubmit={this.onSubmit}
          amount = {amount}
          navigation = {this.props.navigation}
           reqID = {reqID}
           nKey= {nKey} />
             </View>
            </ScrollView>
            {/* Scrolls to the payment form */}
            <KeyboardSpacer
              onToggle={() => { setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }),0)} }
            />
              
          </View>
        );
 
  }
}
const styles = StyleSheet.create({
container:{
  flex: 1,
  backgroundColor: "#F2F4F1",
},
background: {
  flex: 1,
  top: 120,
  height: 700,
  borderTopRightRadius: 50,
  borderTopLeftRadius: 50,
  backgroundColor: "#fff",
},
textWrapper: {
  margin: 10,
},
infoText: {
  fontSize: 18,
  textAlign: 'center'
},
title: {
  fontFamily: "Bahij_TheSansArabic-Bold",
  fontSize:20,
  marginTop: 1,
  marginBottom: 5,
  textAlign: "center",
  color: "#CBCA9E",
  marginRight: 2.5,
},
cardFormWrapper: {
  padding: 10,
  margin: 10,
},
textInputTitle: {

  fontFamily: "Bahij_TheSansArabic-Light",
  fontSize: 20,
  marginTop: 1,
  marginBottom: 5,
  textAlign: "center",
  color: "#404040",
marginRight: 2.5,
},

});