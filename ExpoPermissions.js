
import * as Contacts from 'expo-contacts';
import * as firebase from "firebase";
import "@firebase/auth";
import "firebase/database";
import "firebase/firestore";
import FirebaseKeys from './FirebaseKeys';
import { number } from 'prop-types';
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
var PhoneNumbers  = [];
var key;
var PhoneNumber;

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase
  .database()
  .ref("users")
  .once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      
      console.log("phone"+childSnapshot.val().phone);
      PhoneNumbers.push({
        key: childSnapshot.key,
      
        PhoneNumber: childSnapshot.val().phone,
      }

      );
    });
  });


export const loadContacts = async () => {
  var phoneArray = [];
    console.log("Contact");
    const permission = await Contacts.requestPermissionsAsync();
    

    if (permission.status !== 'granted') {
      return;
    }

    const  contacts = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers]
    });
   // console.log(contacts.data[0].phoneNumbers[0].digits);
  
   //لوب داخل لوب لتحديد الارقام المتطابقة في الداتا بس و الكونتاكس 
  
    for (var i=0; i < PhoneNumbers.length; i++){
      console.log("loop1"+PhoneNumbers[2].PhoneNumber);
      if(i==0||i==3)
      continue;
      
        for (var j=0; j < contacts.data.length; j++){
          for (var u=0; u< contacts.data[j].phoneNumbers.length; u++){
          var pbumber;
        console.log("loop2");
      if ((contacts.data[j].phoneNumbers[u].digits).substring(0,1)==0){
        pbumber= "+966"+(contacts.data[0].phoneNumbers[u].digits).substring(1);
        console.log("updade"+pbumber);
      }
      else{
        pbumber = contacts.data[j].phoneNumbers[u].digits;
       
      }
       if(PhoneNumbers[2].PhoneNumber== pbumber)
       {
         
        console.log("push");
      
       phoneArray.push( {
         lable: PhoneNumbers[i].phone,
         key:PhoneNumbers[i].key,
        });
     }
      }
        }
    }
    
    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
    console.log("index0"+phoneArray[0].lable)
    return phoneArray;
  };

 
