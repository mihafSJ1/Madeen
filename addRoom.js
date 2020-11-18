import React from 'react';
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
// import FormButton from '../components/FormButton';



export default function addRoom({ navigation }) {
//data base real time code 
  const { currentUser } = firebase.auth();
const [userName, setUserName] = useState("");



      

    // this.setState({ currentUser });
    const [roomName, setRoomName] = useState('');
    const db = firebase.firestore();
    

    // function handleButtonPress() {


    //     if (roomName.length > 0) {
    //       firebase.firestore()
    //         .collection('THREADS')
    //         .doc(currentUser.uid)
    //         .set({
    //           name: roomName,
           
    //         })
    //         .then(() => {
           
          
    //           navigation.navigate('NotImplementedScreens');
    //         });
    //     }
    //   }

      function handleButtonPress() {
        if (roomName.length > 0) {
          firebase.firestore()
            .collection('THREADS')
            .doc(currentUser.uid)
            .set({
              name: roomName,
              latestMessage: {
                text: `You have joined the room  ${roomName}.`,
                createdAt: new Date().getTime()
              }
            })
            .then(docRef => {
              docRef.doc(currentUser.uid).collection.add({
                text: `You have joined the room3 ${roomName}.`,
                createdAt: new Date().getTime(),
                system: true
              });
              navigation.navigate('NotImplementedScreens');
            });
        }
      }

  
      


  return (

    <View style={styles.rootContainer}>
    <View style={styles.closeButtonContainer}>
      <IconButton
        icon='close-circle'
        size={50}
        color='#6646ee'
        onPress={() => navigation.goBack()}
      />
    </View>
    <View style={styles.innerContainer}>
      <Title style={styles.title}>Create a new chat room</Title>
      <TextInput
        // labelName='Room Name'
        // value={roomName}
        // onChangeText={text => setRoomName(text)}
        // clearButtonMode='while-editing'
        style={styles.textinput}
        placeholder="room name "
        name="fullname"
        value={roomName}
        onChangeText={text => setRoomName(text)}
        value={roomName}
        input={roomName}
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
        onPress={() => handleButtonPress()}
        disabled={roomName.length === 0}
      />
    </View>
  </View>
  );
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



