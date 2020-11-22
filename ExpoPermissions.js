
import * as Contacts from 'expo-contacts';
import * as firebase from "firebase";
import "@firebase/auth";
import "firebase/database";
import "firebase/firestore";
import FirebaseKeys from './FirebaseKeys';
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
      PhoneNumbers.push({
        key: childSnapshot.key,
        PhoneNumber:  childSnapshot.val().phone,
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

    const  data  = await Contacts.getContactsAsync([
      Contacts.PHONE_NUMBERS,
    ]);
    for (var i=0; i < PhoneNumbers; i++){
      for (var u=0; u < data; u++){
        if(PhoneNumbers[i].PhoneNumber==JSON.stringify(data[u].number))
        console.log("Done");
        phoneArray.push(PhoneNumbers[i]);
      }

    }
    console.log(data);
    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
    return phoneArray;
  };

 
