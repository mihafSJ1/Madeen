import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { LocaleConfig as RNCalendarsLocaleConfig } from 'react-native-calendars';
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import * as firebase from "firebase";
import {LocaleConfig} from 'react-native-calendars';
import moment from "moment";
import esLocale from 'moment/locale/es';

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



import { withNavigation } from "react-navigation";
import { date } from 'yup';
import { isThisWeek } from 'date-fns';

LocaleConfig.locales['ar'] = {
  monthNames: ['يناير','فبراير','مارس','ابريل','مايو','يونيو','يوليو','اغسطس','سبتمبر','اكتوبر','نوفمبر','ديسمبر'],
  monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
  dayNamesShort: ['أحد','أثنين','ثلاثاء','أربعاء','خميس','جمعة.','سبت'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'ar';


var onceRequests = [];
var installmentRequests = [];
 var  onceMarkedDates=[];
var installmentRequestsMarkedDates = [];
var dates = [];
var array = [];

 class CalendarView extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      items: {} ,
      dates:[],
      events:[],
      debtorRequests :[],
      currentUser : null,
     markedDates:null
    
    
    };

  };
 

  componentDidMount() {
const { currentUser } = firebase.auth();
this.setState({ currentUser });
firebase
  .database()
  .ref("requests/")
  .on("value", (snapshot) => {
    snapshot.forEach((child) => {
        if(child.val().rqeuestStatus == "قيد التنفيذ"){
        if (child.val().userid ==currentUser.uid ){
        if (child.val().repaymentType == "السداد دفعة واحدة"){
         onceRequests.push({
            expectedDate:child.val().expectedDate,
            price:child.val().price,
            rqeuestStatus:child.val().rqeuestStatus,
            submittedDate:child.val().submittedDate,
            key:child.key,
            });
        
          }else{// installment type 
            installmentRequests.push({
            expectedDate:child.val().expectedDate,
            installemntPrice:child.val().installemntPrice,
            installmentsType:child.val().installmentsType,
            price:child.val().price,
            duration:child.val().installemntDuration,
            repaymentType:child.val().repaymentType,
            rqeuestStatus:child.val().rqeuestStatus,
            submittedDate:child.val().submittedDate,
            userid:child.val().userid,
            key:child.key,
            remAmount: child.val().remAmount,
          
                });
          }
        }} 
 });
      
  });
  for (var i =0 ;i< onceRequests.length;i++){
    array.push({
      expectedDate :onceRequests[i].expectedDate
    })
  }


  for (var i =0 ;i< installmentRequests.length;i++){
    if (installmentRequests[i].installmentsType == "سنويًا"){
        for(var j =0 ; j<installmentRequests[i].duration;j++){
         
          array.push({
           
            expectedDate:  moment( installmentRequests[i].submittedDate).add(j, 'year').format("YYYY-MM-DD"),
         
            
              })
              dates.push({
                expectedDate:  moment( installmentRequests[i].submittedDate).add(j, 'year').format("YYYY-MM-DD"),
                installemntPrice: installmentRequests[i].installemntPrice,
                price :  installmentRequests[i].price
                  })
         
             }

    }
 if (installmentRequests[i].installmentsType == "شهريًا"){

        for(var j =0 ; j<installmentRequests[i].duration;j++){
          
          array.push({
         expectedDate:  moment( installmentRequests[i].submittedDate).add(j, 'month').format("YYYY-MM-DD"),
      
           })
           dates.push({
            expectedDate:  moment( installmentRequests[i].submittedDate).add(j, 'month').format("YYYY-MM-DD"),
            installemntPrice: installmentRequests[i].installemntPrice,
            price :  installmentRequests[i].price
              })
         
     }
    }
  if (installmentRequests[i].installmentsType == "أسبوعيًا"){

        for(var j =0 ; j<installmentRequests[i].duration;j++){
          array.push({
            expectedDate:  moment( installmentRequests[i].submittedDate).add(j, 'week').format("YYYY-MM-DD"),
       
              })
            
              dates.push({
                expectedDate:  moment( installmentRequests[i].submittedDate).add(j, 'week').format("YYYY-MM-DD"),
                installemntPrice: installmentRequests[i].installemntPrice,
                price :  installmentRequests[i].price
                  })
     }
    }
    if(installmentRequests[i].installmentsType == "يوميًا"){
        
        for(var j =0 ; j<installmentRequests[i].duration;j++){
          array.push({
            expectedDate:  moment( installmentRequests[i].submittedDate).add(j, 'day').format("YYYY-MM-DD"),
        

              })
              dates.push({
                expectedDate:  moment( installmentRequests[i].submittedDate).add(j, 'day').format("YYYY-MM-DD"),
                installemntPrice: installmentRequests[i].installemntPrice,
                price :  installmentRequests[i].price
    
                  })

            
     }
  
   
    }
   
    
    // installmentRequestsMarkedDates = dates.reduce((acc, {expectedDate}) => {
    //   acc[expectedDate] = {selected: true, selectedColor: '#F1E2D8',selectedTextColor: 'white',marked:true}

    //   return acc;
    // },{});
    onceMarkedDates = array.reduce((acc, {expectedDate}) => {
      acc[expectedDate] = {selected: true, selectedColor: '#F1E2D8',selectedTextColor: 'white',marked:true}
        return acc;
      },{});
      // console.log("hello")
      // console.log("once")
      // console.log(array)
      // console.log("hello")
      // console.log(onceMarkedDates)
  
  }






  }






  render() {
  
  

    return (

      <Agenda style = {styles.container}
     
      
     
    markedDates={
  
        
      onceMarkedDates
         //'2020-11-05': { marked:true,  selected: true, selectedColor: '#CBCA9E',selectedTextColor: 'white', marked:true,},
      
      }

 

 
     
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        
       
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}

     
       theme={{
        
      
    todayTextColor: '#57694C',
    dayTextColor: '#2d4150', // لون أرقام أيام التاريخ ا
    selectedColor: '#CBCA9E',
    selectedTextColor: 'white',
    disabledArrowColor: '#d9e1e8',
    textDayFontFamily: 'Bahij_TheSansArabic-Light',
    textMonthFontFamily: 'Bahij_TheSansArabic-Bold',
    textDayHeaderFontFamily: 'Bahij_TheSansArabic-Light',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16.5,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 11,
    calendarBackground:"#FFFDF8",

    textSectionTitleColor: '#9B9B7A',
    textSectionTitleDisabledColor: '#B5B489',
    selectedDayBackgroundColor: '#F4CE86',
    textDayFontWeight: 'bold',
    
    selectedDotColor: '#A4161A',
    monthTextColor: '#746356',
       }}
         
     
      />
    );
  }

  loadItems(day) {
 
     
    setTimeout(() => {
      for (var i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];

            this.state.items[strTime].push({
              // name:   ,
              // height: 10
              backgroundColor:" #F2F4F5",
              borderColor:'#F2F4F5',
              borderBottomColor:"#C9D1E0",
              borderRadius: 0,
              

            });
       
          }
        }
      
for (var i =0 ;i<dates.length;i++){
  
  this.state.items[dates[i].expectedDate] = [];
  this.state.items[dates[i].expectedDate].push({    
                  name: ' موعد التسديد ' + dates[i].expectedDate ,
                 amount: "  مبلغ التسديد  :"+dates[i].installemntPrice+"ريال سعودي" ,
                 totalPrice : " المبلغ الكلي :"+dates[i].price+"ريال سعودي" ,
                height:100,
                backgroundColor: "white",
                borderColor:'#D9AE94',
                borderBottomColor:"#D9AE94",
                borderRadius: 10,
              });

            }
for (var i = 0; i< onceRequests.length;i++){
  if (!this.state.items[onceRequests[i].expectedDate]) {
    this.state.items[onceRequests[i].expectedDate] = [];
this.state.items[onceRequests[i].expectedDate].push({    
              name: ' موعد التسديد ' + onceRequests[i].expectedDate ,
              totalPrice : " المبلغ الكلي :"+onceRequests[i].price+"ريال سعودي" ,
              height:100,
              backgroundColor: "white",
              borderColor:'#D9AE94',
              borderBottomColor:"#D9AE94",
              borderRadius: 10,
           
              
             
           });
          }
      }
//  console.log(onceRequests)
//  console.log("ins")
//  console.log(dates)
 
    // }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    
    }, 1000);

  
  }
  renderItem(item) {
    return (
      <TouchableOpacity
        // testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: item.height}, {backgroundColor: item.backgroundColor},{borderColor: item.borderColor},{borderBottomColor: item.borderBottomColor},,{borderRadius: item.borderRadius}]} 
        onPress={() => Alert.alert(item.name)}// need to navigate to payment screen 
      >
         {/* {item.names== "" ? (
  <Text  style ={styles.textCard}>ككرتزتزا</Text>
  ):(
                      
  <Text  style ={styles.textCard}>{item.name}</Text>
              
                     )} */}
  <Text  style ={styles.textCard}>{item.name}</Text>
  {item.amount ==  null ?null
  :  <Text  style ={styles.textCard}>{item.amount}</Text>}
 
        <Text  style ={styles.textCard}>{item.totalPrice}</Text>

      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={{flex: 1}}>
      <Text style={styles.titleStyle}>oops! There's no data here!</Text>
    </View>);
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
  
    const date = new Date(time);
    return date.toISOString().split('T')[0];  }
}

const styles = StyleSheet.create({
    container:{
marginTop:50,
marginBottom:0,

    },

  item: {
    // textAlign:'Right',
    textAlign:'center',
    // backgroundColor: 'white',
    flex: 1,
  
    padding: 10,
    marginRight: 10,
    marginTop: 20,
    // borderColor:'#D9AE94',
marginHorizontal:5,
    borderWidth:0.5,
    //backgroundColor:'red',
    fontFamily:'Bahij_TheSansArabic-Light',
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30,
    
  //  backgroundColor:'red',
  },
  textCard:{
    fontFamily:'Bahij_TheSansArabic-Light',
    textAlign:'right',
    margin:2,
    fontSize:15,
    color:'#746356',
  
  //  backgroundColor:'red',
  }
});
export default withNavigation(CalendarView);