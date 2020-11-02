import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import { LocaleConfig as RNCalendarsLocaleConfig } from 'react-native-calendars';
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import * as firebase from "firebase";
import moment from "moment";
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




var onceRequests = [];
var installmentRequests = [];
 var  onceMarkedDates=[];
 class CalendarView extends Component {
 
  constructor(props) {
    super(props);

    this.state = {
      items: {} ,
      dates:[],
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
        if(child.val().rqeuestStatus == "قيد التنفيذ"||child.val().rqeuestStatus =="قيد الإنتظار"){
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
            // key:child.key,
            remAmount: child.val().remAmount,
            datesArray:[1],
                });
          }
        }} 
 });
      
  });


  for (var i =0 ;i< installmentRequests.length;i++){
    if (installmentRequests[i].installmentsType == "سنويًا"){
        for(var j =0 ; j<installmentRequests[i].duration;j++){

          installmentRequests[i].datesArray[j]=moment(installmentRequests[i].submittedDate).add(j, 'year').format("YYYY-MM-DD");
             }

    }
    else if (installmentRequests[i].installmentsType == "شهريًا"){

        for(var j =0 ; j<installmentRequests[i].duration;j++){
          
            installmentRequests[i].datesArray[j]=moment( installmentRequests[i].submittedDate).add(j, 'month').format("YYYY-MM-DD");
           
            console.log(installmentRequests[i].datesArray[j])
     }
    }
   else if (installmentRequests[i].installmentsType == "أسبوعيًا"){

        for(var j =0 ; j<installmentRequests[i].duration;j++){
        
            installmentRequests[i].datesArray[j]=moment( installmentRequests[i].submittedDate).add(j, 'week').format("YYYY-MM-DD");
     }
    }
    else if(installmentRequests[i].installmentsType == "يوميًا"){
        
        for(var j =0 ; j<installmentRequests[i].duration;j++){
        
            installmentRequests[i].datesArray[j]=moment( installmentRequests[i].submittedDate).add(j, 'day').format("YYYY-MM-DD");
     }
    }
  }


 onceMarkedDates = onceRequests.reduce((acc, {expectedDate}) => {
   acc[expectedDate] = {selected: true, selectedColor: '#CBCA9E',selectedTextColor: 'white',marked:true}
   return acc;
 },{});


}




  render() {
  
  

    return (
   
      <Agenda style = {styles.container}
     
      
     
    markedDates={
    
        onceMarkedDates
        // '2020-11-05': { marked:true,  selected: true, selectedColor: '#CBCA9E',selectedTextColor: 'white', marked:true,},
      
      }

 

 
     
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        
       
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}

        
       theme={{
      
    todayTextColor: '#57694C',
    dayTextColor: '#2d4150',
    selectedColor: '#CBCA9E',
    selectedTextColor: 'white',
    disabledArrowColor: '#d9e1e8',
  textDayFontFamily: 'Bahij_TheSansArabic-Light',
   textMonthFontFamily: 'Bahij_TheSansArabic-Bold',
   textDayHeaderFontFamily: 'Bahij_TheSansArabic-Light',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16
       }}
         
     
      />
    );
  }

  loadItems(day) {
 
     
    setTimeout(() => {
 const today = new Date()  
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const next =  new Date(tomorrow);
    next.setDate(next.getDate() + 1);
    const next2 =  new Date(next);
    next2.setDate(next2.getDate() + 1);
    const dates = [tomorrow,next,next2];

for (var i = 0; i< onceRequests.length;i++){
    this.state.items[onceRequests[i].expectedDate] = [];
this.state.items[onceRequests[i].expectedDate].push({    
              name: ' موعد التسديد ' + onceRequests[i].expectedDate ,
              amount: "المبلغ :"+onceRequests[i].price,
              height:20,
              
             
           });
        }
    // for (let i =0 ;i<3 ;i++){
        
    //     const strTime = this.timeToString(dates[i])
        
    //       this.state.items[strTime] = [];
       
         
    //         this.state.items[strTime].push({
                
    //           name: ' موعد التسديد ' + strTime ,
    //           amount: "المبلغ :٢٠٠ ريال سعودي",
    //           height:20,
    //           backgroundColor:'green',
           
             
    //        });
    
      
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
        style={[styles.item, {height: item.height},{ba:item.textAlign}]} 
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
        <Text>{item.amount}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(date) {
  
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
    container:{
marginTop:50,
marginBottom:30,

    },

  item: {
    // textAlign:'Right',
    textAlign:'center',
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginTop: 20,
    fontFamily:'Bahij_TheSansArabic-Light',
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
export default withNavigation(CalendarView);