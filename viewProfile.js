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
  TextInput,
} from "react-native";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as firebase from "firebase";
import "@firebase/auth";
import FirebaseKeys from "./FirebaseKeys";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view-fix";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const firebaseConfig = {
  apiKey: "AIzaSyAmXanlf80n5Sd_mEQiV9O9hEj4Z3i4B1g",
  authDomain: "madeen-46af8.firebaseapp.com",
  databaseURL: "https://madeen-46af8.firebaseio.com",
  projectId: "madeen-46af8",
  storageBucket: "madeen-46af8.appspot.com",
  messagingSenderId: "289377001222",
  appId: "1:289377001222:web:9aba3ddf0baa5ef74b0887",
  measurementId: "G-KWKWGXNQRN",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var namef = "name";
var emailf = "email";
let pic =
  "https://firebasestorage.googleapis.com/v0/b/madeen-46af8.appspot.com/o/Draft%2FUserImageProfile.png?alt=media&token=647ebe23-8753-4e8f-a29a-c902048a810a";
var data = "";
var res = "";
var draftName = "yarb";

export default class viewProfile extends React.Component {
  state = { currentUser: null };

  editProfile(URL) {
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
      .child("Draft/" + draftName);
    return ref.put(blob);
  };

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.uplaodImage(result.uri, "test")
        .then(() => {
          const { imageName } = "test";
          let imageRef = firebase.storage().ref("Draft/" + "test");
          console.log("bey Bride2");
          imageRef
            .getDownloadURL()
            .then((url) => {
              console.log("bey Bride3");
              //from url you can fetched the uploaded image easily
              this.setState({ profileImageUrl: url });
              console.log("bey Bride4");
              console.log(this.state.profileImageUrl);
              this.editProfile(this.state.profileImageUrl);
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
        namef = snapshot.val().fullName;
        emailf = snapshot.val().email;
        pic = snapshot.val().UserImage;
      });

    // firebase.database().ref('users/' + currentUser.uid ).update({
    //   fullName: "رغد الفهيد"  ,
    // })

    //   const upload = async (filepath, filename, filemime) => {
    //     const metaData = { contentType: filemime };
    //    res = await firebase
    //         .storage()
    //         .ref(`./assets/orange.png/${filename}`)
    //         .putFile(filepath, metaData); // put image file to GCS
    //     return res;

    //   };
    //   async ()=>{
    // const userId = firebase.auth().currentUser.uid;
    //  res =  await upload(`orange.png`, `/assets/orange.png`, `orange/png`); // function in step 1
    // data = {
    //    fullName:namef,
    //    email:emailf,
    //     pic: res.downloadURL, // retrieve image URL
    // }
    // };

    // firebase.database().ref('users/' + currentUser.uid ).set({

    //   fullName:namef,
    //   email:emailf,
    //    pic: res.downloadURL,

    // });

    this.setState({ currentUser });
  }

  render() {
    // const { navigation:navigate } = this.props;
    const { currentUser } = this.state;

    return (
      <KeyboardAwareScrollView>
        <View style={styles.container3}>
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
            <TouchableOpacity
              style={styles.ProfileEdit2}
              onPress={() => this.props.navigation.navigate("EditProfile")}
            >
              <Text style={styles.ProfileEdit}>
                <Ionicons name="md-create" size={30} color="#808065" solid />
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
style={styles.UserImage}
onPress={() => this.onChooseImagePress()}

>  */}
            {/* <Image style={styles.UserImage}  source={require(this.state.profileImageUrl)} />  */}
            {/* <Image
 style={styles.UserImage}
 source={require("./assets/UserImageProfile.png")} 
/> */}
            <Image style={styles.UserImage} source={{ uri: pic }} />

            {/* </TouchableOpacity> */}
            {/* <Image style={styles.UserImage} > {pic} </Image>  */}
            <View style={styles.registerBackground}>
              <Text style={styles.UserName}>{namef}</Text>
              {/* <Text style={styles.UserName}>{this.state.profileImageUrl}</Text> */}

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
    ); //end return
  } //end render
} // end function

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
    left: 140,
    bottom: -160,
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

    shadowColor: "#000000",
    shadowOpacity: 0.3,
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
    top: 180,
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
    top: 110,
    backgroundColor: "#F1DCA7",
    borderColor: "#D3CECA",
    borderWidth: 2,
  },

  debts: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 18,
    textAlign: "left",
    color: "#404040",
    top: 180,
    left: 70,
    zIndex: 2,
  },
  subsidy: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 18,
    textAlign: "right",
    color: "#404040",
    top: 208,
    right: 70,
  },
  buttonText: {
    textAlign: "center",
    top: 0,
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 37,
    color: "#fff",
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
    left: 127,
    top: -50,
    zIndex: 2,
    width: 160,
    height: 160,
    resizeMode: "stretch",
    borderRadius: 100,
    borderColor: "#CBCA9E",
    borderWidth: 4,
  },

  UserImageUpdate: {
    alignItems: "center",
    marginLeft: 0,
    marginTop: 0,
    marginBottom: 0,
    left: 60,
    top: -220,
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
    fontSize: 28,
    margin: 20,
    marginBottom: 40,
    bottom: -190,
    right: -7,
    textAlign: "center",
    justifyContent: "center",
    color: "#746356",
  },
  Email: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 20,
    marginBottom: 0,
    textAlign: "right",
    color: "#404040",
    marginRight: 0,
    top: 150,
    right: 134,
  },

  textinput: {
    marginBottom: 13,
    marginLeft: 70,
    alignItems: "center",
    borderColor: "#CBCA9E",
    width: 250,
    top: 190,
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 15,
    borderWidth: 2,
    textAlign: "center",
    fontFamily: "Bahij_TheSansArabic-Light",
  },
});
