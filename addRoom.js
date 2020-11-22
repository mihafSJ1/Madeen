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
  //import firestore from '@react-native-firebase/firestore';
  //import firebase from 'firebase';
  //import firestoreNative from '@react-native-firebase/firestore';

  //import '@firebase/firestore';
  import * as firebase from 'firebase';
import 'firebase/firestore';
import { render } from 'react-dom';
import RequestBackgroundComp from "./RequestBackgroundComp";

// import FormButton from '../components/FormButton';



//export default function addRoom({ navigation }) {
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
        const { currentUser } = firebase.auth();
        const {secondID} = this.props.route.params;
        const{reqIDforChat}=this.props.route.params;
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
              text: `You have joined the room  ${this.state.roomName}.`,
              createdAt: new Date().getTime(),
              to:`${secondID}`,
              createdBy:`${currentUser.uid}`,
            }
          })
            docRef => {
              docRef.collection('MESSAGES').add({
                text: `You have joined the room ررررر ${this.state.roomName}.`,
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
              text: `You have joined the room  ${this.state.roomName}.`,
              createdAt: new Date().getTime(),
              to:`${currentUser.uid}`,
              createdBy:`${currentUser.uid}`,

            }
          })
            docRef => {
              docRef.collection('MESSAGES').add({
                text: `You have joined the room ررررر ${this.state.roomName}.`,
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

//const [userName, setUserName] = useState("");

//const {secondID} = this.props.route.params;//


      

    // this.setState({ currentUser });
    //const [roomName, setRoomName] = useState('');
    const db = firebase.firestore();
        return (

          // <View style={styles.container}>
          // <View style={styles.background}>

          <View style={styles.rootContainer}>
                 <RequestBackgroundComp />    
          <View style={styles.closeButtonContainer}>
         
            <IconButton
              icon='close-circle'
              size={50}
              color='#6646ee'
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View style={styles.innerContainer}>
          <View style={styles.registerBackground}>
{console.log({secondID})
}    
{console.log({reqIDforChat})
}     
 {/* // <Title style={styles.title}>Ccc {secondID}</Title> */}

            <Title style={styles.title}>Create a new chat room</Title>
            <TextInput
              // labelName='Room Name'
              // value={roomName}
              // onChangeText={text => setRoomName(text)}
              // clearButtonMode='while-editing'
              style={styles.textinput}
              placeholder="room name "
              name="fullname"
              value={this.state.roomName}
              onChangeText={text => this.setRoomName(text)}
              value={this.state.roomName}
              input={this.state.roomName}
            />
      {/* 
      <TextInput
                      style={styles.textinput}
                      placeholder={this.state.namef}
                      name="fullname"
                      onChangeText={(userInput) => saveUserInput(userInput)}
                      // onChangeText={text => this.setState({text})}
                      value={this.state.text}
                      input={this.state.text}
                    /> */}
      
      
      
      
      
      
            <Button
              title='Create'
              modeValue='contained'
              labelStyle={styles.buttonLabel}
              onPress={() => this.handleButtonPress()}
              disabled={this.state.roomName.length === 0}
            />

</View>
          </View>
        </View>

        // </View>
        // </View>
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
    // paddingBottom:100,
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
    innerContainer: {
      top:-100,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 10,
      textAlign:'center',
    },
    buttonLabel: {
      fontSize: 22,
      textAlign:'center',
    },

    registerBackground: {
      overflow: "hidden",
      flex: 1,
      borderTopRightRadius: 60,
      borderTopLeftRadius: 60,
      backgroundColor: "#fff",
      width:410,
      height:1000,
      top:-300,
      marginBottom:-500,
    },
    textinput:{
      textAlign:'center',
    }
  });



  