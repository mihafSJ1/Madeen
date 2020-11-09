import React from 'react';
import { View, StyleSheet,TextInput,Text,ScrollView,Dimensions,TouchableOpacity,Alert } from 'react-native';
import { Formik } from "formik";
import * as yup from "yup";
import PaymentFormView from './PaymentFormView';
import { LinearGradient } from "expo-linear-gradient";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
//  import AddSubscriptionView from './AddSubscriptionView';
const STRIPE_ERROR = 'حدث خطأ عند الدفع، حاول مرة أخرى';
const SERVER_ERROR = 'الخادم غير متوفر، حاول مرة أخرى';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51HcqzjAReRyTcF617BS3RHvCHjouUNJNg6lzyY2az0IWFbAHurDOp6aiTKJS5abZ02PlH35EOOMyzNNpNSKh1iWq0046Usv5pE';

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

class PayAsDebtor extends React.Component {
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
  onSubmit = async (creditCardInput, requestId, amount, remAmount,type) => {
   let reqStatus = "قيد التنفيذ"
   let remining = 0
   if (type=="السداد دفعة واحدة"){
    remining = (amount-amount).toFixed(2)
   }
   if (type=="السداد بالتقسيط"){
    remining = (amount-remAmount).toFixed(2)
   }
    if (remining == 0) {
    reqStatus = "مكتمل"
    }
    firebase
      .database()
      .ref("requests/" + requestId)
      .update({
        remAmount: remining,
        rqeuestStatus: reqStatus
      })
      .then(() => Alert.alert(
        "تنبيه ",
        "تم التسديد بنجاح   ",
        [{ text: "موافق", onPress: () =>this.props.navigation.navigate("myReqWithFilter")}],
        { cancelable: false }
      ));

    const { navigation } = this.props;
    // Disable the Submit button after the request is sent
    this.setState({ submitted: true });
    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(creditCardInput,amount);
      this.setState({cToken: creditCardToken.id})
      if (creditCardToken.error) {
        alert("creditCardToken.error")
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
      // navigation.navigate('myRequest')
    }
  };

  payAsDebtorSchema = yup.object({
    price: yup
      .number()
      .typeError("المبلغ لا بد أن يكون بأرقام إنجليزية")
      .required("المبلغ مطلوب")
  });
  
  // render the subscription view component and pass the props to it
  render() {
    const { submitted, error } = this.state;
    const {amount} = this.props.route.params;
    const {reqID} = this.props.route.params;
    const {type} = this.props.route.params;
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
       <Text style={styles.header}>
             الدفع 
       </Text>
     </View>
     <View style={styles.textWrapper}>
            <Text style={styles.title}>
            <Text style={{fontFamily: "Bahij_TheSansArabic-Light",  color: "#404040",}}>المبلغ المستحق | </Text> 
            {amount} ريال سعودي
            </Text>
          </View>
     <View style={styles.formStyle}>
      
        <Formik
            validationSchema={this.payAsDebtorSchema}
            initialValues={{
             price: 0,
            }}
            onReset={(values, { resetForm }) => {}}
            onSubmit={(values, action) => {
            action.resetForm();
            this.onSubmitPress(values, this.props.navigation);
            }}
        >      
         {(formprops, setFieldValue) => (
             <View style = {styles.formContainer}>
            {type != "السداد دفعة واحدة" ?(

              <View>
              <Text style={styles.textInputTitle}>
            المبلغ المراد سداده <Text style={styles.textError}> *</Text>
             </Text>
            <TextInput
                style={styles.textInput}
                placeholder="المبلغ"
                value={formprops.values.price}
                onChangeText={formprops.handleChange("price")}
                keyboardType="numeric"
                onBlur={formprops.handleBlur("price")}
        
            />
            <Text style={styles.textError}>
            {formprops.touched.price && formprops.errors.price}
          </Text>
          {formprops.values.price != 0 && formprops.values.price <= parseFloat(amount) ? ( 
                <View style={styles.cardFormWrapper}>
                <PaymentFormView   
                   error={error}
                   submitted={submitted}
                   onSubmit={this.onSubmit}
                   amount = {amount}
                   reqID= {reqID}
                   remAmount = {formprops.values.price}
                   type = {type}
                   navigation = {this.props.navigation}/>
                </View>
              ) :  <Text style={[styles.textError, {top:-10}]}>
              المبلغ المدخل لا بد أن يكون أقل من أو يساوي المبلغ المستحق 
          </Text>}
          </View>
          )
             :   <View style={styles.cardFormWrapper}>  
             <PaymentFormView   
                    error={error}
                    submitted={submitted}
                    onSubmit={this.onSubmit}
                    amount = {amount}
                    reqID= {reqID}
                    remAmount = {formprops.values.price}
                    navigation = {this.props.navigation}
                   /></View>
         }
         
          <TouchableOpacity
        onPress = {()=>   this.props.navigation.goBack()}
          style={[styles.button, { backgroundColor: "#D4CEC9", left:120, top:200 }]}
         >
            <Text style={styles.buttonText}> إلغاء </Text>
        </TouchableOpacity> 
          </View>
        
         )}
    </Formik>
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
      },

  textInput: {
    marginBottom: 13,
    marginLeft: 35,
    alignItems: "center",
    borderColor: "#DBDBDB",
    width: 350,
    backgroundColor: "#fff",
    height: 38,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 5,
    textAlign: "right",
    paddingRight: 10,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 15,
  },
  formContainer:{
top:0,

  },
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
  cardFormWrapper: {
    padding: 10,
    margin: 10,

  },
  header: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize:30, 
    marginTop: 1,
    marginBottom: 5,
    textAlign: "center",
    color: "#404040",
    marginRight: 2.5,
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
  textInputTitle: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 17,
    marginTop: 1,
    marginBottom: 5,
    textAlign: "right",
    color: "#404040",
    marginRight: 35,
  },
  textError: {
    color: "#A4161A",
    fontSize: 13,
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "right",
    marginRight: 30,
    bottom: 10,
  },

  button: {
    alignItems: "center",
    width: 170,
    height: 30,
    marginTop: 50,
    padding: 5,
    borderRadius: 15,
    marginLeft: 10,
    bottom: 30,
    backgroundColor: "#fff",
  },
  buttonText: {
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    top:10,
    marginRight: 90,
    fontSize: 30,
  },
});

export default withNavigation(PayAsDebtor);