import * as Notifications from 'expo-notifications';
import * as firebase from "firebase";
import React, { useState, useEffect, useRef } from 'react';
  
<<<<<<< HEAD
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
=======
export   async function schedulePushNotification(exDate,instalmentT,repaymentT,submittedDate,keyD,reqKey){
 //registerForPushNotificationsAsync();
  console.log("schedulePushNotification");
  console.log("repeat");
    if(repaymentT=="السداد بالتقسيط"){
      
    var repeat;
    if(instalmentT=="سنويًا")
    repeat = 31536000;
    else if(instalmentT=="شهريًا")
    repeat = 2629743.83;
    else if(instalmentT=="أسبوعيًا")
      repeat = 604800;
      else if(instalmentT=="يوميًا")
      repeat = 2629743.83;
      console.log("بالتقسيط"+repeat)

  // set schedule notfication
  const RequestIdentifire = await Notifications.scheduleNotificationAsync({
    content: {
      title: "فترة تسديد",
      body:  ' لُطفًا عليك السداد اليوم ',
    },
    trigger: { 
        seconds: repeat,
        repeats: true },
  });


  setTimeout(() => {
    const notificationKey = firebase
    .database()
    .ref("notifications/")
    .push(
      {
        title: "فترة تسديد",
        body:  ' لُطفًا عليك السداد اليوم ',
        debtor:keyD,
        reqID: reqKey,
        notificationType: "repayment",
      });
  }, repeat*1000); 
}
else{
>>>>>>> master
 
  // var time = new Date(exDate).getTime() - new Date(submittedDate).getTime();
  //   var days = time / (1000 * 3600 * 24);
// var s = days * 86.400;
<<<<<<< HEAD
var s=(new Date(exDate).getTime() - new Date(submittedDate)).getTime()/(1000 * 3600 * 24)*86.400;
  const RequestIdentifire = await Notifications.scheduleNotificationAsync({
    content: {
      title: "مدين|عليك السداد اليوم",
      //body: 'Here is the notification body',
     //data: { screen: 'Plant',threadId:id },
=======
var s=(new Date(exDate).getTime() - new Date(submittedDate).getTime())/(1000 * 3600 * 24)*86.400;
console.log(s);
  const RequestIdentifire = await Notifications.scheduleNotificationAsync({
    content: {
      title: "فترة تسديد",
      body:  ' لُطفًا عليك السداد اليوم ',
>>>>>>> master
    },
    trigger: { 
        seconds: s,
         },
         
  });
<<<<<<< HEAD
=======
setTimeout(() => {
  const notificationKey = firebase
  .database()
  .ref("notifications/")
  .push(
    {
      title: "فترة تسديد",
      body:  ' لُطفًا عليك السداد اليوم ',
      debtor:keyD,
      reqID: reqKey,
      notificationType: "repayment",
    });
}, s*1000);
  
  }
>>>>>>> master
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
<<<<<<< HEAD
return RequestIdentifire ;

}
=======


// return RequestIdentifire ;

}
>>>>>>> master
