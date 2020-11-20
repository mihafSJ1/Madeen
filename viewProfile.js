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
import TopBar from "./TopBar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view-fix";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";


if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseKeys.firebaseConfig);
}

//var namef ="name";
// var emailf ="email";
// let pic="https://firebasestorage.googleapis.com/v0/b/madeen-46af8.appspot.com/o/Draft%2FUserImageProfile.png?alt=media&token=647ebe23-8753-4e8f-a29a-c902048a810a";
// var data="";
// var res= "" ;
// var draftName= "yarb";

var x= 0;
export default class viewProfile extends React.Component {
  state = { currentUser: null };
  state = {
    namef: "name",
    emailf: "email",
    pic:
      "https://firebasestorage.googleapis.com/v0/b/madeendb.appspot.com/o/draft%2FUserImageProfile.png?alt=media&token=8d72df15-548d-4112-819e-801ba9c2fea0",
  };

  setName(name) {
    this.setState({ namef: name });
  }

  setEmail(email) {
    this.setState({ emailf: email });
  }

  setPic(picNew) {
    this.setState({ pic: picNew });
  }

  //   editProfile (URL) {
  //     const { currentUser } = firebase.auth();
  //     console.log("before update")
  //     console.log(URL);
  //     firebase.database().ref('users/' + currentUser.uid ).update({

  //       UserImage: URL,
  //   })

  //   console.log("after update")
  //   console.log(URL);
  // }
  //   ;

  // uplaodImage = async (uri, draftName) => {
  //   const response = await fetch(uri);
  //   const blob = await response.blob();

  //   var ref = firebase
  //   .storage()
  //   .ref()
  //   .child("Draft/" + draftName);
  //   return ref.put(blob);
  // };

  // onChooseImagePress = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync();
  //   if (!result.cancelled){
  //     this.uplaodImage(result.uri, "test")
  //     .then(()=> {
  //       const {imageName} = "test";
  // let imageRef = firebase.storage().ref("Draft/"+"test");
  // console.log("bey Bride2")
  // imageRef
  //   .getDownloadURL()
  //   .then((url) => {
  //     console.log("bey Bride3")
  //     //from url you can fetched the uploaded image easily
  //     this.setState({profileImageUrl: url});
  //     console.log("bey Bride4")
  //     console.log(this.state.profileImageUrl);
  //     this.editProfile (this.state.profileImageUrl);
  //     console.log("bey Bride5")
  //     console.log(this.state.profileImageUrl)
  //     console.log("bey Bride")
  //   })
  //   .catch((e) => console.log('getting downloadURL of image error => ', e));

  //     })
  //     .catch((error) => {
  //       Alert.alert(error);
  //     });
  //   }

  // };

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

          console.log(this.state.ratingValue);
        this.setName(snapshot.val().fullName),
          this.setEmail(snapshot.val().email),
          this.setPic(snapshot.val().UserImage);
          
        // emailf=snapshot.val().email;
        // pic=snapshot.val().UserImage;
      });

    this.setState({ currentUser });
  }

  //   openModalWithItem(item){

  //   this.setState({ modalVisible: true ,
  //   //modalVisible2: true,
  //    Name:item.userName,
  //    Type:item.installmentsType,
  //    Price:item.price,
  //    EDate:item.expectedDate,
  //    Reason:item.reason,
  // UserID:item.userid,
  // UserImage: item.userImage,

  //   });

  // }

  render() {
    // const { navigation:navigate } = this.props;
    const { currentUser } = this.state;

    return (
      <KeyboardAwareScrollView>
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

        <View style={styles.container3}>
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
            <Image style={styles.UserImage} source={{ uri: this.state.pic }} />

            {/* </TouchableOpacity> */}
            {/* <Image style={styles.UserImage} > {pic} </Image>  */}
            <View style={styles.registerBackground}>
              <Text style={styles.UserName}>{this.state.namef}</Text>
              {/* <Text style={styles.UserName}>{this.state.profileImageUrl}</Text> */}

              {/* field number1  */}

              <Text style={styles.Email}> {this.state.emailf} </Text>

              {this.state.ratingValue == 0 ?
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
                {this.state.ratingValue == 2?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
                : null}
                { this.state.ratingValue== 3 ?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
                : null}
                 {this.state.ratingValue == 4 ?
                <Text style={styles.RateStarts}>
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#FFCB69" solid />
                <Ionicons name="ios-star" size={33} color="#E4E4E4" solid />
                </Text>
             
                : null}
                { this.state.ratingValue == 5?
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
                <Text style={styles.buttonText}> ٠ </Text>
              </View>
              <View style={styles.YellowRectangleShapeView}>
                <Text style={styles.buttonText}> ٠ </Text>
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
    top: 110,
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
