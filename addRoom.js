// import React, {Component} from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     Button,
//     Image,
//     TouchableOpacity,
//     Dimensions,
//     TouchableHighlight,
//     TextInput,
//     Alert,
//     Input,
//   } from "react-native";
//   import { useState } from "react";
//   import { IconButton,Title} from 'react-native-paper';
//   import { AntDesign } from "@expo/vector-icons";
//    import * as firebase from 'firebase';
// import 'firebase/firestore';
// import { render } from 'react-dom';
// import RequestBackgroundComp from "./RequestBackgroundComp";





//   export default class addRoom extends React.Component {
//     constructor(props) {
//       super(props);
    
//     };
//     state = {
    
//       roomName: "",
//     };
// //data base real time code 
// setRoomName(name) {
//   this.setState({ roomName: name });
// }
    


//        handleButtonPress() {

//         if(this.state.roomName.trim() ==""){
//           Alert.alert(
//             "",
//             "عفوًا، يجب ان تضع اسمًا للمحادثة ",
//             [{ text: "حسناً" }],
//             { cancelable: false }
//           );
// return;
//         }
//         const { currentUser } = firebase.auth();
//         const {secondID} = this.props.route.params;
//         const{reqIDforChat}=this.props.route.params;
//         const {firstName} = this.props.route.params;
//         const{secondName}=this.props.route.params;
//         console.log(reqIDforChat);
//         if (this.state.roomName.length > 0) {
//           firebase.firestore()
//           .collection('THREADS')
//           .doc(currentUser.uid)
//           .collection('allChat')
//           .doc(reqIDforChat)
//           .set({
//             name: this.state.roomName,
//             latestMessage: {
//               text: `هذه المحادثة أنشأت من قبل ${firstName} مع ${secondName} ؛`,
//               createdAt: new Date().getTime(),
//               to:`${secondID}`,
//               createdBy:`${currentUser.uid}`,
//             }
//           })
//             docRef => {
//               docRef.collection('MESSAGES').add({
//                 text: `هذه المحادثة أُنشأت من قبل رغد مع أريج`,
//                 createdAt: new Date().getTime(),
//                 system: true
//               });
           
//             };

//             this.props.navigation.navigate('Room', {sID:secondID, rID:reqIDforChat , Created:currentUser.uid});
//         }

//         if (this.state.roomName.length > 0) {
//           firebase.firestore()
//           .collection('THREADS')
//           .doc(secondID)
//           .collection('allChat')
//           .doc(reqIDforChat)
//           .set({
//             name: this.state.roomName,
//             latestMessage: {
//               text: `هذه المحادثة أنشأت من قبل ${firstName} مع ${secondName} ؛`,
//               createdAt: new Date().getTime(),
//               to:`${currentUser.uid}`,
//               createdBy:`${currentUser.uid}`,

//             }
//           })
//             docRef => {
//               docRef.collection('MESSAGES').add({
//                 text: `You have joined the room  ${this.state.roomName}.`,
//                 createdAt: new Date().getTime(),
//                 system: true
//               });
           
//             };

//             this.props.navigation.navigate('Room', {sID:secondID, rID:reqIDforChat });
//         }
       
//         }

      



     

  
//       render(){
//         const { currentUser } = firebase.auth();
//         const {secondID} = this.props.route.params;
//         const{reqIDforChat}=this.props.route.params;
//         const{secondName}=this.props.route.params;

//     const db = firebase.firestore();
//         return (



//           <View style={styles.rootContainer}>
//                  <RequestBackgroundComp />    
//           <View style={styles.closeButtonContainer}>
         
         
//           </View>
//           <View style={styles.innerContainer}>
//           <View style={styles.registerBackground}>

//           <AntDesign
//                         style={styles.close}
//                         name="close"
//                         size={24}
//                         color="black"
//                         onPress={() => this.props.navigation.goBack()}
//                       />
// {console.log({secondID})
// }    
// {console.log({reqIDforChat})
// }     


// <Title style={styles.title}>    محادثة جديدة مع </Title>
// <Title style={styles.name}>  !  {secondName} </Title>   

//             <TextInput

//               style={styles.textinput}
//               placeholder="اسم المحادثه "
//               name="fullname"
//               // value={this.state.roomName}
//                  roomName="Ra"
//               onChangeText={text => this.setRoomName(text)}
//               editable = {true}
//               value={this.state.roomName}
//               input={this.state.roomName}
         
//             />


     
      
      
      
      
//       <View  Style={styles.buttonSubmit}>
      
//             {/* <Button
//               title='Create'
//               modeValue='contained'
             
//               labelStyle={styles.buttonLabel}
//               onPress={() => this.handleButtonPress()}
//               disabled={this.state.roomName.length === 0}
//             /> */}
// </View>



// <TouchableOpacity
//  onPress={() => this.handleButtonPress()}
//     style={[styles.Paybutton, { backgroundColor: '#986979' }]}
//     // disabled={this.state.roomName.length === 0}
//   >
//     <Text style={styles.PaybuttonText}> انشاء </Text>
//   </TouchableOpacity>

// </View>
//           </View>
//         </View>

   
//         );
//       }


// }






// const styles = StyleSheet.create({

//   container: {
//     backgroundColor: '#f5f5f5',
//     flex: 1,
// bottom:10,
//     top:30,

//   },

//   background: {
//     bottom: 500,
//     position: "absolute",
//     height: 480,

//   },

//   container: {
//     textAlign: "right",
//     fontFamily: "Bahij_TheSansArabic-Light",
//     flex: 1,
//     marginTop: -40,
//     backgroundColor: "#F2F4F1",
//     justifyContent: "center",
//     fontSize: 25,
//   },
//     rootContainer: {
//       flex: 1
//     },

//     closeButtonContainer: {
//       position: 'absolute',
//       top: 70,
//       right: 0,
//       zIndex: 3
//     },

//     close:{
//       top:10,
// left:20,

//     },
//     innerContainer: {
//       top:-100,
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },

//     title: {
//       top:15,
//       fontSize: 24,
//       marginBottom: 10,
//       textAlign:'center',
//       fontFamily: "Bahij_TheSansArabic-Light",
//     },

//     name:{
//       top:17,
//       fontFamily: "Bahij_TheSansArabic-Bold",
//       color:'#CBCA9F',
//       textAlign:'center',
//     },
//     buttonLabel: {
//       top:50,
//       fontSize: 22,
//       textAlign:'center',
//     },

//     registerBackground: {
//       overflow: "hidden",
//       flex: 1,
//       borderTopRightRadius: 30,
//       borderTopLeftRadius: 30,
//       borderBottomLeftRadius: 30,
//       borderBottomRightRadius: 30,
//       backgroundColor: "#fff",
//       width:350,
//       height:190,
//       top:-290,
//       marginBottom:-200,
//     },
//     textinput:{
//       top:40,
//       textAlign:'center',
//       borderColor: "gray",
//       borderWidth: 0.5,
//       height:40,
//       width:200,
//       left:80,
//       borderRadius:10
    
//     },
//     buttonSubmit:{
//  top:1000,
//     },
//     PaybuttonText: {
//       textAlign: "center",
//       fontFamily: "Bahij_TheSansArabic-Bold",
//       top: -4,
//       bottom: -18,
//       textAlign: "center",
//       fontSize: 18,
//       color:'#fff',
//       // fontWeight:"bold",
//     },

//     Paybutton:{
//       // alignItems: "center",
//       // width: 170,
//       // height: 30,
//       // marginTop: 10,
//       // padding: 5,
//       // borderRadius: 15,
//       // marginLeft: 10,
//       // backgroundColor: "#fff",
//       // fontSize:10,
//       alignItems: "center",
//       width: 170,
//       height: 35,
//       marginTop: 0,
//       padding: 5,
//       borderRadius: 15,
//       marginLeft: 10,
//       backgroundColor: "#fff",
//       right:-83,
//       top:90,
//       shadowColor: "#000",
//       shadowOpacity: 0.21,
//       shadowOffset: {
//         width: 0,
//         height: 0,
//       },
//     },
    
//   });


import React, {Component} from 'react';
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
    Input,
  } from "react-native";
  import { useState } from "react";
  import { IconButton,Title} from 'react-native-paper';
  import { AntDesign } from "@expo/vector-icons";
   import * as firebase from 'firebase';
import 'firebase/firestore';
import { render } from 'react-dom';
import RequestBackgroundComp from "./RequestBackgroundComp";





  export default class addRoom extends React.Component {
    constructor(props) {
      super(props);
    
    };
    state = {
    
      roomName: "",
    };
//data base real time code 
setRoomName(name) {
  this.setState({ roomName: name });
}
    


       handleButtonPress() {

        if(this.state.roomName.trim() ==""){
          Alert.alert(
            "",
            "عفوًا، يجب ان تضع اسمًا للمحادثة ",
            [{ text: "حسناً" }],
            { cancelable: false }
          );
return;
        }
        const { currentUser } = firebase.auth();
        const {secondID} = this.props.route.params;
        const{reqIDforChat}=this.props.route.params;
        const {firstName} = this.props.route.params;
        const{secondName}=this.props.route.params;
        console.log(reqIDforChat);
        if (this.state.roomName.length > 0) {
          firebase.firestore()
          .collection('THREADS')
          .doc(currentUser.uid)
          .collection('allChat')
          .doc(reqIDforChat)
          .set({
            name: this.state.roomName,
            latestMessage: {
              text: `هذه المحادثة أنشأت من قبل ${firstName} مع ${secondName} .`,
              createdAt: new Date().getTime(),
              to:`${secondID}`,
              createdBy:`${currentUser.uid}`,
            }
          })
            docRef => {
              docRef.collection('MESSAGES').add({
                text: `هذه المحادثة أُنشأت من قبل رغد مع أريج`,
                createdAt: new Date().getTime(),
                system: true
              });
           
            };

            this.props.navigation.navigate('Room', {sID:secondID, rID:reqIDforChat , Created:currentUser.uid});
        }

        if (this.state.roomName.length > 0) {
          firebase.firestore()
          .collection('THREADS')
          .doc(secondID)
          .collection('allChat')
          .doc(reqIDforChat)
          .set({
            name: this.state.roomName,
            latestMessage: {
              text: `هذه المحادثة أنشأت من قبل ${firstName} مع ${secondName} .`,
              createdAt: new Date().getTime(),
              to:`${currentUser.uid}`,
              createdBy:`${currentUser.uid}`,

            }
          })
            docRef => {
              docRef.collection('MESSAGES').add({
                text: `You have joined the room  ${this.state.roomName}.`,
                createdAt: new Date().getTime(),
                system: true
              });
           
            };

            this.props.navigation.navigate('Room', {sID:secondID, rID:reqIDforChat });
        }
       
        }

      



     

  
      render(){
        const { currentUser } = firebase.auth();
        const {secondID} = this.props.route.params;
        const{reqIDforChat}=this.props.route.params;
        const{secondName}=this.props.route.params;

    const db = firebase.firestore();
        return (



          <View style={styles.rootContainer}>
                 <RequestBackgroundComp />    
          <View style={styles.closeButtonContainer}>
         
         
          </View>
          <View style={styles.innerContainer}>
          <View style={styles.registerBackground}>

          <AntDesign
                        style={styles.close}
                        name="close"
                        size={24}
                        color="black"
                        onPress={() => this.props.navigation.goBack()}
                      />
{console.log({secondID})
}    
{console.log({reqIDforChat})
}     


<Title style={styles.title}>    محادثة جديدة مع </Title>
<Title style={styles.name}>  !  {secondName} </Title>   

            <TextInput

              style={styles.textinput}
              placeholder="اسم المحادثه "
              name="fullname"
              // value={this.state.roomName}
                 roomName="Ra"
              onChangeText={text => this.setRoomName(text)}
              editable = {true}
              value={this.state.roomName}
              input={this.state.roomName}
         
            />


     
      
      
      
      
      <View  Style={styles.buttonSubmit}>
      
            {/* <Button
              title='Create'
              modeValue='contained'
             
              labelStyle={styles.buttonLabel}
              onPress={() => this.handleButtonPress()}
              disabled={this.state.roomName.length === 0}
            /> */}
</View>



<TouchableOpacity
 onPress={() => this.handleButtonPress()}
    style={[styles.Paybutton, { backgroundColor: '#986979' }]}
    // disabled={this.state.roomName.length === 0}
  >
    <Text style={styles.PaybuttonText}> انشاء </Text>
  </TouchableOpacity>

</View>
          </View>
        </View>

   
        );
      }


}






const styles = StyleSheet.create({

  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
bottom:10,
    top:30,

  },

  background: {
    bottom: 500,
    position: "absolute",
    height: 480,

  },

  container: {
    textAlign: "right",
    fontFamily: "Bahij_TheSansArabic-Light",
    flex: 1,
    marginTop: -40,
    backgroundColor: "#F2F4F1",
    justifyContent: "center",
    fontSize: 25,
  },
    rootContainer: {
      flex: 1
    },

    closeButtonContainer: {
      position: 'absolute',
      top: 70,
      right: 0,
      zIndex: 3
    },

    close:{
      top:10,
left:20,

    },
    innerContainer: {
      top:-100,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    title: {
      top:15,
      fontSize: 24,
      marginBottom: 10,
      textAlign:'center',
      fontFamily: "Bahij_TheSansArabic-Light",
    },

    name:{
      top:17,
      fontFamily: "Bahij_TheSansArabic-Bold",
      color:'#CBCA9F',
      textAlign:'center',
    },
    buttonLabel: {
      top:50,
      fontSize: 22,
      textAlign:'center',
    },

    registerBackground: {
      overflow: "hidden",
      flex: 1,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      backgroundColor: "#fff",
      width:350,
      height:190,
      top:-290,
      marginBottom:-200,
    },
    textinput:{
      top:40,
      textAlign:'center',
      borderColor: "gray",
      borderWidth: 0.5,
      height:40,
      width:200,
      left:80,
      borderRadius:10
    
    },
    buttonSubmit:{
 top:1000,
    },
    PaybuttonText: {
      textAlign: "center",
      fontFamily: "Bahij_TheSansArabic-Bold",
      top: -4,
      bottom: -18,
      textAlign: "center",
      fontSize: 18,
      color:'#fff',
      // fontWeight:"bold",
    },

    Paybutton:{
      // alignItems: "center",
      // width: 170,
      // height: 30,
      // marginTop: 10,
      // padding: 5,
      // borderRadius: 15,
      // marginLeft: 10,
      // backgroundColor: "#fff",
      // fontSize:10,
      alignItems: "center",
      width: 170,
      height: 35,
      marginTop: 0,
      padding: 5,
      borderRadius: 15,
      marginLeft: 10,
      backgroundColor: "#fff",
      right:-83,
      top:90,
      shadowColor: "#000",
      shadowOpacity: 0.21,
      shadowOffset: {
        width: 0,
        height: 0,
      },
    },
    
  });