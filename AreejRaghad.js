import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import "@firebase/auth";
import FirebaseKeys from "./FirebaseKeys";
import TopBar from "./TopBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view-fix";
import { Ionicons } from "@expo/vector-icons";


if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseKeys.firebaseConfig);
}

var namef ="rf";
var emailf ="ef";

export default class AreejRaghad extends React.Component {
  state = { currentUser: null };
 
  
  componentDidMount() {
    const { currentUser } = firebase.auth();
    firebase.database().ref('users/' + currentUser.uid ).on('value',(snapshot)=>{
       

      namef   = snapshot.val().fullName;
      emailf   = snapshot.val().email;


    
    })
      
 
  
    
    this.setState({ currentUser });
  
      
  }

  render() {
    const { currentUser } = this.state;

    

    return (
      <KeyboardAwareScrollView>
      <View style={styles.container3}>
        <TopBar />
        {/* <Text style={{ fontSize: 20 }}>
          Hi{" "}
          <Text style={{ color: "#CBCA9E", fontSize: 20 }}>
            {currentUser && currentUser.email}!!
          </Text>
          <Text style={{ color: "#CBCA9E", fontSize: 20 }}>
           الاسم {namef}!!
          </Text>
        </Text> */}

      


<View style={styles.container2}>
<Text style={styles.ProfileEdit} ><Ionicons name="md-create" size={30} color="#808065" solid />
 </Text>
<Image style={styles.UserImage} source={require("./assets/UserImageProfile.png")} /> 

  <View style={styles.registerBackground}>
    <Text style={styles.UserName}>{namef}</Text>

    {/* field number1  */}

    <Text style={styles.Email}> {emailf} </Text>
    

    <Text style={styles.RateStarts}>
    <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
    <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
    <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
    <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
    <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />

    
    </Text>

    <Text style={styles.subsidy}> عدد التسليف </Text>
    <Text style={styles.debts}> عدد الاستلاف </Text>
    <View style={styles.PinkRectangleShapeView}>
        <Text style={styles.buttonText}> ١٠</Text>
        
    </View>
    <View style={styles.YellowRectangleShapeView}>
        <Text style={styles.buttonText}> ١٦</Text>
        
    </View>
   
    

    <StatusBar style="auto" />
  </View>
</View>


</View>
</KeyboardAwareScrollView>
    );//end return
  }//end render 
}// end function

const styles = StyleSheet.create({
  container3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container2: {
    flex: 1,
    backgroundColor: "#ECF0EB",
    // alignItems: 'center',
    justifyContent: "center",
    fontSize: 25,
  },

  RateStarts: {
    left: 133,
    bottom: -180,
  },

  ProfileEdit: {
    left: 360,
    bottom: 15,
    zIndex:2,
    shadowColor: "#000000",
    shadowOpacity: 0.71,
    shadowOffset: {
      width: 100,
      height: 100,
    },

  },

  PinkRectangleShapeView: {
    width: 148,
    height: 100,
    marginTop: 0,
    padding: 5,
    borderRadius: 15,
    marginLeft: 33,
    marginBottom: 0,
    left:192,
    top: 200,
    backgroundColor: "#D9AE94",
    borderColor: '#D3CECA',
    borderWidth: 2,
   
    },
    YellowRectangleShapeView: {
        alignItems: "center",
        width: 148,
        height: 100,
        marginTop: 0,
        padding: 5,
        borderRadius: 15,
        marginLeft: 33,
        marginBottom: 0,
        right:-3,
        top: 100,
        backgroundColor: "#F1DCA7",
        borderColor: '#D3CECA',
        borderWidth: 2,
       
        },
  registerBackground: {
    overflow: "hidden",
    flex: 1,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
   bottom: 0,
   top: -250,
   height:750,
   width: 410,
    backgroundColor: "#fff",
  },

  UserImage: {
    alignItems: "center",
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    left: 110,
    top: -40,
    zIndex: 2,
    width: 180,
    height: 180,
    resizeMode: "stretch",
  },

  

  scrollView: {
    paddingHorizontal: 20,
  },
  UserName: {
    fontFamily: "Bahij_TheSansArabic-Bold",
    color: "#404040",
    fontSize: 28,
    margin: 20,
    marginBottom: 40,
bottom:-220,
right:5,
    textAlign: "center",
    justifyContent: "center",
  },
  Email: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
    marginBottom: 0,
    textAlign: "right",
    color: "#404040",
    marginRight: 0,
    top: 180,
    right: 134,
  },


  debts: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 21,
    textAlign: "left",
    color: "#404040",
    top: 200,
    left: 54,
    zIndex: 2,

  },
  subsidy: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 21,
    textAlign: "right",
    color: "#404040",
    top: 230,
    right: 58,

  },
  buttonText: {
    textAlign: "center",
    top:10,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 40,
    color: '#fff',
   
  },
  


});