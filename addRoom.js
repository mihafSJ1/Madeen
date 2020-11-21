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

          <View style={styles.rootContainer}>
          <View style={styles.closeButtonContainer}>
           
            <IconButton
              icon='close-circle'
              size={50}
              color='#6646ee'
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
          <View style={styles.innerContainer}>
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
        );
      }


}






const styles = StyleSheet.create({
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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 24,
      marginBottom: 10
    },
    buttonLabel: {
      fontSize: 22
    }
  });



  