import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
// import { withNavigation } from "react-navigation";

import { FontAwesome } from '@expo/vector-icons';
/**
 * Renders the payment form and handles the credit card data
 * using the CreditCardInput component.
 */
export default class PaymentFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardData: { valid: false } };
  }
  render() {
    const { onSubmit, submitted, error } = this.props;
    return (
      <View style = {styles.background}>
        <View>
          <CreditCardInput requiresName onChange={(cardData) => this.setState({ cardData })} 
   
      labelStyle = {styles.textInputTitle}
      labels= {{ number: "رقم البطاقة ", expiry: "تاريخ الانتهاء", cvc: "CVC",name:"اسم حامل البطاقة " }}
      cardFontFamily ={ "Bahij_TheSansArabic-Light"}
      inputStyle = { styles.textInput}
      placeholders ={{ number: "1234 5678 1234 5678", expiry: "MM/YY", cvc: "CVC",name:"الاسم الكامل" }}
     
      cardImageBack = {require("./assets/creditcardback.png")}
    
      cardImageFront= {require("./assets/creditcardfront.png")}
     
      
      inputContainerStyle = {{ borderBottomWidth: 0, borderBottomColor: "black" ,
   }}
     
          />

        </View>
        <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
        // onPress = {()=>this.props.navigation.navigate("Timline")}
          style={[styles.button, { backgroundColor: "#D4CEC9" }]}
         >
            <Text style={styles.buttonText}> إلغاء </Text>
        </TouchableOpacity>

          <TouchableOpacity  style={[styles.button, { backgroundColor: "#CBCA9E" }]}
            
            disabled={!this.state.cardData.valid || submitted}
            onPress={() => onSubmit(this.state.cardData)}
       
          >
              <Text Text style={styles.buttonText}>
                  دفع
              </Text>
          </TouchableOpacity>
          </View>
          {/* Show errors */}
          {error && (
            <View style={styles.alertWrapper}>
              <View style={styles.alertIconWrapper}>
                <FontAwesome name="exclamation-circle" size={20} style={{ color: '#c22' }} />
              </View>
              <View style={styles.alertTextWrapper}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  buttonWrapper: {
    padding: 10,
    zIndex: 100
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400'
  },
  alertWrapper: {
    backgroundColor: '#ecb7b7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10
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
    top:60,
    marginRight: 20,
    fontSize: 30,
  },
    textInput: {
    borderColor: "#DBDBDB",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    height:35,  
    textAlign: "right",
    paddingRight: 10,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 12,
  },
  textInputTitle: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 13,
    marginTop: 1,
    marginBottom: 5,
    textAlign: "right",
    color: "#404040",
     marginRight: 2.5,
  },


});
// export default withNavigation(PaymentFormView);