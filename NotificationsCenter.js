import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import "@firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { withNavigation } from "react-navigation";

import { Ionicons } from "@expo/vector-icons";
import { date } from "yup";
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

var notificationsArray = [];
var usersArray = [];
var requestArray = [];

firebase
  .database()
  .ref("users")
  .once("value", function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var Data = childSnapshot.val();
      usersArray.push(Data);
    });
  });

const currentUser = firebase.auth();
firebase
.database()
.ref("notifications/")
.on("value", (snapshot) => {
  snapshot.forEach((child) => {
    // this.setState({reqID:  })
    
      notificationsArray.push({

          creditor:child.val().creditor,
          debtor:child.val().debtor,
          title:child.val().title,
          body:child.val().body,
          nType: child.val().notificationType,
          reqKey:child.val().reqID,
          notficationKey: child.key,    
  }
);
  });
});

var count =0;

class NotificationsCenter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      reqID:""
    //   notificationsArray:[],
    };
  }

  componentDidMount() { 
    notificationsArray=[];
   let reqID;
    firebase
      .database()
      .ref("notifications/")
      .on("value", (snapshot) => {
        snapshot.forEach((child) => {
          // this.setState({reqID:  })
            notificationsArray.push({
                creditor:child.val().creditor,
                debtor:child.val().debtor,
                title:child.val().title,
                body:child.val().body,
                nType: child.val().notificationType,
                // reqKey:child.val().reqID,
                notficationKey: child.key,    
        }
    );
        });
      });


    }

   
  list = () => {
    const currentUser = firebase.auth().currentUser.uid;
    return notificationsArray.map((c) => {
     count++;
     if (  (c.creditor == currentUser && c.nType == "new request" 
        || c.debtor == currentUser && c.nType == "accept request" 
        || c.debtor == currentUser && c.nType == "reject request"
        || c.debtor == currentUser && c.nType == "repayment")
        ) {
          return (
            <View>
               
              <TouchableOpacity
                style={styles.card}
              >
                <View style={styles.leftItems}>

                </View>
                <View style={styles.rightItems}>
                  <View style={styles.textContainer}>
                    <Text style={styles.textLabel}>
                       الإشعار |{" "}
                     
                        {" "}
                        {c.title}

                    </Text>

                    <Text style={styles.textLabel}>
                      {" "}
                      <Text style={styles.textData}> {c.body} </Text>
                    </Text>
                  </View>
                  <Ionicons
                    name="ios-notifications-outline"
                    size={60}
                    color="#A4161A"
                    solid
                    style={{ marginTop: -10 }}
                  />
                </View>
            
              </TouchableOpacity>
            </View>
          );
         }
         
      });
  };

  render() {

    setTimeout(function() {
        firebase
        .database()
        .ref("notifications/")
        .on("value", (snapshot) => {
          snapshot.forEach((child) => {
            if  ( child.val().creditor == currentUser && child.val().notificationType  == "new request"  ||
              child.val().debtor == currentUser && child.val().notificationType == "accept request" 
                 || child.val().debtor == currentUser && child.val().notificationType== "reject request"
                 || child.val().debtor == currentUser && child.val().notificationType== "repayment"){
            firebase
            .database()
           .ref('notifications/'+ child.key).remove()  
                 }
        
          });
        });
  
  
      }, 432000000)//after 5 days
      
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[
            "rgba(217,174,148,0.36)",
            "rgba(241,220,167,0.43)",
            "#EEF2ED",
          ]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          useAngle
          angle={180}
          style={{
            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,
            width: Dimensions.get("window").width * 2.1,
            height: Dimensions.get("window").width * 3.1,
            right: -660,
            top: -630,
            position: "absolute",
          }}
        ></LinearGradient>

        {/* -------------------------------------- CARD 1*/}

        <ScrollView style =  {styles.scrollStyle}>{this.list()}</ScrollView>

        {/*View request */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F8F4",
    top: 120,
  },
  scrollStyle: {
      marginBottom:130,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    width: 400,
    shadowColor: "#000",
    shadowOpacity: 0.11,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    flexDirection: "row",
  },
  rightItems: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    width: "100%",
    top: 5,
  },

  leftItems: {
    flexDirection: "row",
    justifyContent: "flex-start",
    left: 30,
    top: 5,
  },

  textContainer: {
    marginRight: 10,
  },

  textLabel: {
    color: "#404040",
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "right",
    fontSize: 16,
  },

  textData: {
    color: "#CBCA9E",
    fontFamily: "Bahij_TheSansArabic-Bold",
  },

});
export default withNavigation(NotificationsCenter);