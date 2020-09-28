import React, { Component, useReducer, useState } from "react";
import {Formik ,setFieldValue} from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StatusBar } from "expo-status-bar";
import {Picker} from '@react-native-community/picker';
import RadioButtonRN from 'radio-buttons-react-native';



import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import{CheckBox} from 'react-native-elements';
import * as yup from 'yup';
import DropDownPicker from 'react-native-dropdown-picker';

// import { useFonts } from "expo-font";
// import { AppLoading } from "expo";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import Home from "./Home";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view-fix";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import FirebaseKeys from "./FirebaseKeys";
import { Value } from "react-native-reanimated";

// state = { currentUser: null };

//  function componentDidMount() {
//   const { currentUser } = firebase.auth();
//   this.setState({ currentUser });
// }
 

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseKeys.firebaseConfig);
}

const data = [
   
  {
   label:'السداد دفعة واحدة'
  },
   {
   label:'السداد بالتقسيط'
   
    },
 ];

 
export default class Request extends React.Component {
 
  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
  };
  onSubmitPress(values) {
   
    const { currentUser } = this.state;
     const requestID = firebase.database().ref('requests/').push({
      price: values.price,
      expectedDate: values.expectedDate,
      repaymentType : values.repaymentType,
      reason:values.reason,
      userid: currentUser.uid,
    });

    firebase.database().ref('users/' + currentUser.uid ).push({
    
      requestId: requestID.key,
    });
    alert(requestID.key)
   
  };

    // const requestSchema = yup.object( {
    //     // reason:yup.string.min(3),
    //     // price:yup.number.requierd().min(1)
    //     .test('price is valid','mustbegreater than 0',(val)=>{
    //     return  val > 0 <=20000
    //     }
    //     )

    //     }
    // )

    render() {
  
  return (

    
      <View style={styles.container}>
      <Image style={styles.background}
    source={require('./assets/RequestBackground.png')}
    />
   <View style={styles.registerBackground}> 
    <KeyboardAwareScrollView>
   
      <Text style={styles.header}>إنشاء طلب  </Text>
        <Formik
        
        //   validationSchema={requestSchema}
          initialValues ={{

            users: '',
              usersSelect:true,
              price:'',
              expectedDate:new Date(),
              repaymentType:'',
              reason:'',
              
          }}
          onSubmit={(values,action)=>{
            // alert("test")
            this.onSubmitPress(values)

        
            

          }}
          >
             
              {(props,setFieldValue)=>(
                  <View style= {styles.requestContainer}>
                      

                
                     < View style={styles.checkboxContainer}>
                     <Text style={styles.checkboxLabel}>التدين من شخص محدد </Text>
                 <CheckBox  style={styles.checkbox}
                 checkedColor = '#CBCA9E'
          
                  checkedIcon='check-box'
                  iconType='material'
                  uncheckedIcon='check-box-outline-blank'
                
                  onPress={() => props.setFieldValue("usersSelect", !props.values.usersSelect)}
                  checked={props.values.usersSelect}
                  
                 />
                 

               
                 </View>
                
                 <Text style = {styles.textNote}>ملاحظة : عند اختيار هذا الخيار سيظهر طلبك للشخص المحدد فقط </Text>
        
               
                      {props.values.usersSelect ?  <DropDownPicker style={styles.DropDownPicker}

items={[
    {label: 'رهام', value: 'رهام',selected: true, },
    {label: 'رغد', value: 'رغد'},
]}


value={props.values.users}
containerStyle={{
  borderTopLeftRadius: 50, borderTopRightRadius: 50,
  borderBottomLeftRadius: 40, borderBottomRightRadius: 50,
  borderColor:'#CBCA9E',
}}

style={{
  borderTopLeftRadius: 50, borderTopRightRadius: 50,
  borderBottomLeftRadius: 40, borderBottomRightRadius: 50,
  borderColor:'#57694C',
  borderWidth: 1,
  width:100,
}}
// dropDownStyle={{
//   borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
//   borderColor:'#CBCA9E',
// }}
arrowColor= "#57694C"
arrowSize= {18}
containerStyle={
  {width: 352,
   height: 40,
   marginLeft:35,
 
   borderTopLeftRadius: 50, borderTopRightRadius: 50,
  borderBottomLeftRadius: 60, borderBottomRightRadius: 50}}



// containerStyle={{width: 150, height: 70, borderTopLeftRadius: 50, borderTopRightRadius: 50,
//   borderBottomLeftRadius: 60, borderBottomRightRadius: 50}}
itemStyle={{
    backgroundColor:'#fff',
    textAlign:'right',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    // to make the list to the right side
}}
selectedLabelStyle={{
  color: '#57694C'
}}


activeLabelStyle={{
  color: '#57694C'
}}

    labelStyle={{
        backgroundColor:'#fff',
        fontSize: 16,
        textAlign: 'right',
        color: '#000'
    }}
 

    // activeLabelStyle={{color: 'red'}}
    style={{
        flexDirection: 'row-reverse',
        // to support RTL
    }}
onChangeItem={item => props.setFieldValue({
    users: item.value
})}

/>  
 
:null}


       <Text style={styles.textInputTitle}>المبلغ </Text>
                 <TextInput

               style={styles.textInput}
               placeholderTextColor="#57694C" 
               placeholder="المبلغ"        
               onChangeText={props.handleChange('price')}
               value={props.values.price}
               keyboardType='numeric'
               />
               <View style={styles.radio}>

<RadioButtonRN
initial={1}
  data={data}
  box = {false}
  circleSize = {10}
  activeColor = {'#57694C'}

style={{
  flexDirection:'column-reverse ',
  justifyContent: 'flex-end',

  left:160,
  
}}
boxStyle={{
  justifyContent: 'flex-end',
  textAlign:'right',
  flexDirection:'column-reverse ',

    
    
}}
textStyle={{
    fontSize:15,
   textAlign:'right',
left:80,
bottom:20,
  //  marginLeft:160,
   marginRight:-110, 
   
}}

 selectedBtn={(e) => props.setFieldValue('repaymentType',e.label)}
/>


</View>



        <Text style={styles.textInputTitle}>التاريخ المتوقع لإكمال السداد </Text>
          <DateTimePicker
          testID="dateTimePicker"
          
          mode={"date"}
   
       minimumDate={new Date()}

    onConfirm={props.handleChange('expectedDate')}
    value={props.values.expectedDate}
        
        />
        
                      <Text style={styles.textInputTitle}>السبب </Text>
                      <TextInput
                 multiline
                  style={[styles.textInput, { height: 100 }]}
                      placeholder="السبب"        
                      onChangeText={props.handleChange('reason')}
                      value={props.values.reason}
                   />
                
                     <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#D4CEC9" }]}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.buttonText}> إالغاء </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#CBCA9E" }]}
              onPress={() => props.handleSubmit()}
            
            >
              <Text style={styles.buttonText}> إنشاء طلب </Text>
             
            </TouchableOpacity>
          </View>
     </View>

              )
                
              }
      
          </Formik>
  
        

   
    </KeyboardAwareScrollView>
    </View>    
    </View>
   
  
  );

}
}

const styles = StyleSheet.create({

  container: {

 
      textAlign:'right',
    // fontFamily: "Bahij_TheSansArabic-Light",
    flex: 1,
    //  overflow:"hidden",
   backgroundColor: "#F2F4F1",
    justifyContent: "center",
    fontSize: 25,
  },
checkboxLabel:{
    marginTop:15,
    marginLeft:200,
    fontSize:15,
},
checkbox:{
    marginLeft:-20,
},


  registerBackground: {
    flex: 1,
    height: 200,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    backgroundColor: "#fff"
    
  },DropDownPicker:{
      marginTop:-10,
      borderRadius:50,
     
  },


  background: {
  
  bottom:400,
      position:"absolute",
  
    height: 480,
    // paddingBottom:100,
  
  },
  header: {
    // fontFamily: "Bahij_TheSansArabic-Light",
    color: "#404040",
    fontSize: 30,
    margin: 20,
    top: 30,
    textAlign: "center",
    justifyContent: "center",
  },
   registerBackground: {
       marginTop:70,
       // overflow:'scroll',
    // overflow: "hidden",
    flex: 1,
    height:700,

    borderTopRightRadius: 50,
    borderTopLeftRadius:50,
    backgroundColor: "#fff",
  },
  textInputTitle: {
    // fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
    marginTop:10,
    marginBottom: 5,
    textAlign: "right",
    color: "#57694C",
    marginRight: 35,
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
  },
  buttonText: {
    // fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 25,
    fontSize: 30,
  },
 
  textInput: {
   
    marginBottom: 13,
    marginLeft: 35,
    alignItems: "center",
    borderColor: "#DBDBDB",
    width: 350,
    // backgroundColor: "#fff",
    height: 38,
    borderRadius: 6,
    borderWidth: 1,
    marginTop:5,
    textAlign: "right",
  
    
    // fontFamily: "Bahij_TheSansArabic-Light",
  },
  checkboxContainer: {
    flexDirection: "row",
     
    marginBottom: 20,
  },

  textNote:{
      color:'#A4161A',
      fontSize:13,
      bottom:30,
      textAlign:'right',
      marginBottom:10,
      marginRight:30,

  },
  radio:{
    marginTop:20,
  }

});
