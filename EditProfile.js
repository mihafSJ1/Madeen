import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  TextInput,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
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
import { Value } from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
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
var requestArrayU=[];
var requestArrayC=[];
let input = "";
var x = 0;
const fullNameRegexAR = /[\u0600-\u06FF]/;
const fullNameRegexEN = /^[a-zA-Z şüöı]+$/;
export default class EditProfile extends React.Component {
  state = { currentUser: null };
  // saveUserInput = userInput => {
  //   const input = userInput;

  // };
  state = {
    namef: "name",
    emailf: "email",
    ratingValue: null,
    pic:
      "https://firebasestorage.googleapis.com/v0/b/madeendb.appspot.com/o/draft%2FUserImageProfile.png?alt=media&token=8d72df15-548d-4112-819e-801ba9c2fea0",
  };
  updatename(name){
    requestArrayU=[];
    requestArrayC=[];
      const { currentUser } = firebase.auth();
      
      firebase
        .database()
        .ref("requests/" )
        .on("value", (snapshot) => {
  
          snapshot.forEach((child) => {
          
           if(child.val().userid==currentUser.uid){
            requestArrayU.push({
              key:child.key
            })
           }
           if(child.val().creditor==currentUser.uid){
            requestArrayC.push({
              key:child.key
            })}
           
          
        });
      });
      for(var i=0 ; i<requestArrayU.length ;i++){
        firebase
       .database()
     .ref("requests/" + requestArrayU[i].key)
     .update({
     userName:name
        
      })}
      for(let i=0 ; i<requestArrayC.length;i++){
        firebase
       .database()
      .ref("requests/" +requestArrayC[i].key)
       
      .update({
        creditorName:name,
        
      })}
    }

   
  setName(name) {
    this.setState({ namef: name });
    this.updatename(name);
  }
  setEmail(email) {
    this.setState({ emailf: email });
  }
  setRatingCount(count) {
    this.setState({ RatingCount: count });
  }
  setRating(rating) {
    this.setState({ rating: rating });
  }

  setPic(picNew) {
    this.setState({ pic: picNew });
  }
  editImage(URL) {
    const { currentUser } = firebase.auth();
    console.log("before update");
    console.log(URL);
    firebase
      .database()
      .ref("users/" + currentUser.uid)
      .update({
        UserImage: URL,
      });

    console.log("after update");
    console.log(URL);
  }
  uplaodImage = async (uri, draftName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("draft/" + draftName);
    return ref.put(blob);
  };

  onChooseImagePress = async () => {
    const { currentUser } = firebase.auth();
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.uplaodImage(result.uri, "" + currentUser.uid)
        .then(() => {
          const { imageName } = "" + currentUser.uid;
          let imageRef = firebase
            .storage()
            .ref("draft/" + "" + currentUser.uid);
          console.log("bey Bride2");
          imageRef
            .getDownloadURL()
            .then((url) => {
              console.log("bey Bride3");
              //from url you can fetched the uploaded image easily
              this.setState({ profileImageUrl: url });
              console.log("bey Bride4");
              console.log(this.state.profileImageUrl);
              this.editImage(this.state.profileImageUrl);
              console.log("bey Bride5");
              console.log(this.state.profileImageUrl);
              console.log("bey Bride");
            })
            .catch((e) =>
              console.log("getting downloadURL of image error => ", e)
            );
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  };

  componentDidMount() {
    
    const { currentUser } = firebase.auth();
    firebase
      .database()
      .ref("users/" + currentUser.uid)
      .on("value", (snapshot) => {
        this.setState({ RatingCount: snapshot.val().RatingCount ,rating: snapshot.val().rating}, () => {
          console.log(this.state.rating );
          this.state.rating / this.state.RatingCount
               
          if (this.state.RatingCount!=0|| this.state.RatingCount!= null){
            this.setState({ ratingValue:
     Math.round(this.state.rating / this.state.RatingCount)})
           }else{
            this.setState({ ratingValue:
            0})

           }
          })
      
       
        
    
    
   


        this.setName(snapshot.val().fullName),
          this.setEmail(snapshot.val().email),
          this.setPic(snapshot.val().UserImage);

        this.setState({ currentUser });
      });


    this.setState({ currentUser });
  
 
  }

  editProfile(URL) {
    const { currentUser } = firebase.auth();
    console.log("before update");
    // console.log(URL);
    // if(URL == undefined ){
    //   console.log("تسلب");
    //   console.log("2تسلب");
    //   console.log(pic);
    // this.setState({  URL : this.state.pic })
    if (input == "") {
      this.props.navigation.navigate("viewProfile");
      return;
    }
    console.log("i reach");
    if (input.trim() == "") {
      Alert.alert(
        "",
        "عفوًا الاسم يجب أن يحتوي على حروف فقط",
        [{ text: "حسناً" }],
        { cancelable: false }
      );
      return;
    }
    if (
      fullNameRegexEN.test(input) == false &&
      fullNameRegexAR.test(input) == false
    ) {
      Alert.alert(
        "",
        "عفوًا الاسم يجب أن يحتوي على حروف فقط",
        [{ text: "حسناً" }],
        { cancelable: false }
      );
      return;
    }
    firebase
      .database()
      .ref("users/" + currentUser.uid)
      .update({
        fullName: input,
        // UserImage: pic,
      });
    //   this.props.navigation.navigate('AreejRaghad2')
    //   return
    // }

    console.log("after update");
    console.log(URL);
    this.props.navigation.navigate("viewProfile");
  }

  render() {
    const { currentUser } = this.state;

    const saveUserInput = (userInput) => {
      input = userInput;
    };

    return (
      <KeyboardAwareScrollView>
        <TopBar />
     

        <View style={styles.container3}>
          <View style={styles.container2}>
            <TouchableOpacity
              style={styles.UserImagetuch}
              onPress={() => this.onChooseImagePress()}
            >
      
              <Image
                style={styles.UserImage}
                source={{ uri: this.state.pic }}
              />
            </TouchableOpacity>

            {/* <Image style={styles.UserImage} source={pic} />  */}
            <View style={styles.registerBackground}>
       

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("viewProfile");
                }}
              >
                <AntDesign
                  style={styles.close}
                  name="close"
                  size={24}
                  color="#9B9B7A"
                />
              </TouchableOpacity>
              <TextInput
                style={styles.textinput}
                placeholder={this.state.namef}
                name="fullname"
                onChangeText={(userInput) => saveUserInput(userInput)}
                // onChangeText={text => this.setState({text})}
                value={this.state.text}
                input={this.state.text}
              />

              {/* field number1  */}

              <Text style={styles.Email}> {this.state.emailf} </Text>
              {console.log(this.state.ratingValue)}
              { this.state.ratingValue== 0 ?
              <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
             
                : null}
                { this.state.ratingValue == 1 ?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
                : null}
                {this.state.ratingValue== 2?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
                : null}
                {this.state.ratingValue== 3 ?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
                : null}
                 {this.state.ratingValue== 4 ?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
             
                : null}
                {this.state.ratingValue == 5?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
  
                </Text>:null}


              <Text style={styles.subsidy}> عدد التسليف </Text>
              <Text style={styles.debts}> عدد الاستلاف </Text>
              <View style={styles.PinkRectangleShapeView}>
                <Text style={styles.buttonText2}> ٠ </Text>
              </View>
              <View style={styles.YellowRectangleShapeView}>
                <Text style={styles.buttonText2}> ٠ </Text>
              </View>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#CBCA9E" }]}
                onPress={() => this.editProfile(this.state.profileImageUrl)}
              >
                <Text style={styles.buttonText3}> حفظ التعديل </Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
              style={[styles.button2, { backgroundColor: "#D4CEC9" }]}
              onPress={() =>  this.editProfile()}
            
            >
              <Text style={styles.buttonText3}>  الغاء</Text>
             
            </TouchableOpacity> */}

              <StatusBar style="auto" />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    ); //end return
  } //end render
} // end function

const styles = StyleSheet.create({
  container3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 130,
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
    bottom: -220,
  },

  ProfileEdit: {
    left: 50,
    bottom: 5,
    zIndex: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.71,
    shadowOffset: {
      width: 100,
      height: 100,
    },
  },

  ProfileEdit2: {
    left: 300,
    bottom: 15,
    zIndex: 2,
    backgroundColor: "red",
    shadowColor: "#000000",
    shadowOpacity: 0.71,
    width: 90,
    shadowOffset: {
      // width: 100,
      // height: 100,
    },
  },

  PinkRectangleShapeView: {
    width: 120,
    height: 70,
    marginTop: 0,
    padding: 5,
    borderRadius: 15,
    marginLeft: 33,
    marginBottom: 0,
    left: 197,
    top: 220,
    backgroundColor: "#D9AE94",
    borderColor: "#D3CECA",
    borderWidth: 2,
  },
  YellowRectangleShapeView: {
    alignItems: "center",
    width: 120,
    height: 70,
    marginTop: 0,
    padding: 5,
    borderRadius: 15,
    marginLeft: 33,
    marginBottom: 0,
    right: -25,
    top: 150,
    backgroundColor: "#F1DCA7",
    borderColor: "#D3CECA",
    borderWidth: 2,
  },

  registerBackground: {
    overflow: "hidden",
    flex: 1,
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    bottom: 0,
    top: -250,
    height: 750,
    width: 410,
    backgroundColor: "#fff",
  },

  UserImage: {
    alignItems: "center",
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    left: 65,
    top: -30,
    zIndex: 2,
    width: 160,
    height: 160,
    resizeMode: "stretch",
    borderRadius: 100,
    borderColor: "#CBCA9E",
    borderWidth: 4,
  },

  UserImagetuch: {
    alignItems: "center",
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    left: 60,
    top: -30,
    zIndex: 2,
    width: 160,
    height: 160,
    resizeMode: "stretch",
    borderRadius: 100,
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
    bottom: -220,
    right: 5,
    textAlign: "center",
    justifyContent: "center",
  },
  Email: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
    marginBottom: 0,
    textAlign: "right",
    color: "#57694C",
    marginRight: 0,
    top: 220,
    right: 134,
  },

  debts: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 18,
    textAlign: "left",
    color: "#404040",
    top: 220,
    left: 70,
    zIndex: 2,
  },
  subsidy: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 18,
    textAlign: "right",
    color: "#404040",
    top: 249,
    right: 70,
  },
  buttonText: {
    textAlign: "center",
    top: 10,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 40,
    color: "#fff",
  },

  textinput: {
    marginBottom: 13,
    marginLeft: 18,
    alignItems: "center",
    borderColor: "#CBCA9E",
    width: 230,
    height: 40,
    top: 220,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 2,
    textAlign: "center",
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 22,
    left: 10,
    color: "#57694C",

    // marginBottom: 13,
    // marginLeft: 35,
    // alignItems: "center",
    borderColor: "#DBDBDB",
    width: 350,
    // backgroundColor: "#fff",
    height: 38,
    borderRadius: 10,
    borderWidth: 1,
    // marginTop: 5,
    // textAlign: "right",
    // paddingRight: 10,
    // fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 15,
  },
  button: {
    alignItems: "center",
    width: 120,
    height: 30,
    marginTop: 150,
    padding: 5,
    borderRadius: 15,
    marginLeft: 146,
    backgroundColor: "#fff",
    top: 50,
  },

  button2: {
    alignItems: "center",
    width: 120,
    height: 30,
    marginTop: 150,
    padding: 5,
    left: 40,
    top: -130,
    borderRadius: 15,
    marginLeft: 32,
    backgroundColor: "#fff",
    zIndex: 2,
  },

  buttonText3: {
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "center",
  },

  buttonText2: {
    textAlign: "center",
    top: -1,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 40,
    color: "#fff",
  },

  close: {
    left: 20,
    top: 20,
    zIndex: 2,
    borderColor: "#CBCA9E",
  },
});
