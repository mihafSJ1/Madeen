import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'
import * as firebase from "firebase";
import { useState } from "react";
export async function schedulePushNotification(userName,exDate,instalmentT,repaymentT) {
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
      repeat = 2;
      console.log(repeat)
       
    
       

//set schedule notfication
 const RequestIdentifire = await Notifications.scheduleNotificationAsync({
    content: {
      title: "لديك دفعة "+userName,
      //body: 'Here is the notification body',
     //data: { screen: 'Plant',threadId:id },
    },
    trigger: { 
        seconds: repeat,
        repeats: true },
  });}
else{
  const RequestIdentifire = await Notifications.scheduleNotificationAsync({
    //دفعة واحدة
    content : {
            title:"اليوم يجب تسديد دينك"+userName,
           
        },
        exDate
        
      }); 
  return RequestIdentifire ;
}
}