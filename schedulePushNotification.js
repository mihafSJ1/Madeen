import * as Notifications from 'expo-notifications';
import * as firebase from "firebase";
import React, { useState, useEffect, useRef } from 'react';
  
export   async function schedulePushNotification(userName,exDate,instalmentT,repaymentT,submittedDate){
 //registerForPushNotificationsAsync();
  console.log("schedulePushNotification");
  console.log("repeat");
//     if(repaymentT=="السداد بالتقسيط"){
      
//     var repeat;
//     if(instalmentT=="سنويًا")
//     repeat = 31536000;
//     else if(instalmentT=="شهريًا")
//     repeat = 2629743.83;
//     else if(instalmentT=="أسبوعيًا")
//       repeat = 604800;
//       else if(instalmentT=="يوميًا")
//       repeat = 2629743.83;
//       console.log("بالتقسيط"+repeat)
       
    
       

// //set schedule notfication
//  const RequestIdentifire = await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "مدين|عليك السداد اليوم",
//       //body: 'Here is the notification body',
//      //data: { screen: 'Plant',threadId:id },
//     },
//     trigger: { 
//         seconds: repeat,
//         repeats: true },
//   });}
//else{
 
  // var time = new Date(exDate).getTime() - new Date(submittedDate).getTime();
  //   var days = time / (1000 * 3600 * 24);
// var s = days * 86.400;
var s=(new Date(exDate).getTime() - new Date(submittedDate)).getTime()/(1000 * 3600 * 24)*86.400;
  const RequestIdentifire = await Notifications.scheduleNotificationAsync({
    content: {
      title: "مدين|عليك السداد اليوم",
      //body: 'Here is the notification body',
     //data: { screen: 'Plant',threadId:id },
    },
    trigger: { 
        seconds: s,
         },
         
  });
 // await Notifications.cancelScheduledNotificationAsync(RequestIdentifire);   
// async function registerForPushNotificationsAsync() {
//   let Token;
//     firebase
//     .database()
//     .ref("users/"+userid).on("value", (snapshot) => {
//       Token = snapshot.val().push_Notification_token;
//     });
//     return Token;
//   }
return RequestIdentifire ;

}
