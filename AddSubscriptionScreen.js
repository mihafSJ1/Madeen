import React from 'react';

import { StyleSheet, Text, View, ScrollView,Dimensions } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PaymentFormView from './PaymentFormView';
import { LinearGradient } from "expo-linear-gradient";

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
  static navigationOptions = {
    title: 'Subscription page',
  };
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: null
    }
  }
  // Handles submitting the payment request
  onSubmit = async (creditCardInput,reqID,amount) => {
    const { navigation } = this.props;
    const { currentUser } = firebase.auth();
      firebase
      .database()
      .ref('requests/' + reqID)
      .update({
        creditor:currentUser.uid,
        rqeuestStatus: "قيد التنفيذ",
      })
      .then(() => Alert.alert(
        "تنبيه ",
        "من سار بين الناس جابرًا للخواطر أدركه الله في جوف المخاطر! تم الدفع  بنجاح.",
        [{ text: "موافق", onPress: () => this.props.navigation.navigate("squares") }],
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

      navigation.navigate('squares')
    }
  };
  
  // render the subscription view component and pass the props to it
  render() {
    const { submitted, error } = this.state;
    const {amount} = this.props.route.params;
    const {reqID} = this.props.route.params;
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
           reqID = {reqID}/>
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