import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PaymentFormView from './PaymentFormView';
import BackgroundComponent from "./BackgroundComponent";
/**
 * The class renders a view with PaymentFormView
 */
export default class AddSubscriptionView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <View>
        <BackgroundComponent/>
        </View> */}
        
        <ScrollView style={styles.container} ref={ref => (this.scrollViewRef = ref)}>
      
          <View style={styles.textWrapper}>
          

            <Text style={styles.textInputTitle}>
          الدفع 
            </Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.textInputTitle}>
           
             المبلغ المستحق :١٠٠٠ ريال سعودي
            </Text>
          </View>
     
          <View style={styles.cardFormWrapper}>
            <PaymentFormView {...this.props}/>
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
  container: {
    flex: 1,
    top: 50,
    backgroundColor:'#fff',
  
  },
  textWrapper: {
    margin: 10
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center'
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10
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