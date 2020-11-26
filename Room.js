
import { GiftedChat, Bubble, Send ,  SystemMessage,MessageText,ImageBackground,Time,InputToolbar} from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import React, { useState, useContext, useEffect,alert,Text } from 'react';
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg";


export default function Room({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const [messages2, setMessages2] = useState([]);
  const { sID } = route.params;
  const { rID } = route.params;
  const { Created } = route.params;

  const { currentUser } = firebase.auth();
  
  function renderBubble(props) {
   
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor:  '#FFEEC4',
            fontFamily: "Bahij_TheSansArabic-Light",

          },
          left: {
            // Here is the color change
            backgroundColor: '#d9ae94',
            fontFamily: "Bahij_TheSansArabic-Light",
            fontSize: 16,
          }
        
        }}
        textProps={{
          style: {
            color: props.position === 'left' ? '#fff' : '#746356',
            fontFamily: "Bahij_TheSansArabic-Light",
            fontSize: 15,
          },
        }}

        textStyle={{
          right: {
            color: 'black',
            fontFamily: "Bahij_TheSansArabic-Light",
            fontSize: 10,
          },
          left: {
            color: '#fff',
            fontFamily: "Bahij_TheSansArabic-Light",
            fontSize: 10,
          },

        }}


      />
    );
  }


  
  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#986979' />
        </View>
      </Send>
    );
  }
  function scrollToBottomComponent(props) {
    return (
        <Send {...props}>
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='send-circle' size={536} color='#986979' />
      </View>
      </Send>
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }

  function     renderTime(props) {
    return (
      <Time
        {...props}
       timeTextStyle={{
right: {
color: '#746356',
},
left: {
color: 'white',
},
}}
      />
    );
  }


  async function handleSend(messages, messages2) {
    const text = messages[0].text;
    console.log("herehere");
console.log({text});
    firebase.firestore()
    .collection('THREADS')
    .doc(currentUser.uid)
    .collection('allChat')
    .doc(rID)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          to: sID,
          email: currentUser.email
        }
      });
      console.log("here2");
      if (sID!=currentUser.uid){
        firebase.firestore()
        .collection('THREADS')
        .doc(sID)
        .collection('allChat')
        .doc(rID)
          .collection('MESSAGES')
          .add({
            text,
            createdAt: new Date().getTime(),
            user: {
              _id: currentUser.uid,
              to: sID,
              email: currentUser.email
            }
          });
      }

    

  useEffect(() => {
    const {messagesListener} = firebase.firestore()
    .collection('THREADS')
    .doc(currentUser.uid)
    .collection('allChat')
    .doc(rID)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email
            };
          }

          return data;
        });

        setMessages(messages);
      });

firebase.firestore()
    .collection('THREADS')
    .doc(sID)
    .collection('allChat')
    .doc(rID)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages2 = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email
            };
          }

          return data;
        });

        setMessages2(messages2);
      });


    
  }, []);




      


  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }
  
  
  function renderInputToolbar (props) {

    return ( 
      <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "#fff",
        borderTopColor: "#E8E8E8",
        borderTopWidth: 1,
        padding: 0,
        fontFamily: "Bahij_TheSansArabic-Light",
        fontSize: 100,
        textalign:'right'
      }}
    />
   
   );
}


  return (
   
   


    <GiftedChat
   
    listViewProps={{
      style: {
        backgroundColor: '#FFFDF9',
      
      },

  
    }}
      messages={messages}
      messages2={messages2}
      onSend={handleSend}
      user={{ _id: currentUser.uid }}
      renderBubble={renderBubble}
      placeholder ='اكتب رسالتك هنا...                                                                .'
      // showUserAvatar
      // alwaysShowSend
      // Step 4: add the prop
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
      renderSystemMessage={renderSystemMessage}
      renderAvatar={() => null}
      renderTime={renderTime}
      renderInputToolbar={renderInputToolbar}
      // renderMessageText={renderMessageText}

    />





  );
}

const styles = StyleSheet.create({
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    systemMessageText: {
      fontSize: 9999994,
      color: '#fff',
      fontWeight: 'bold',
      backgroundColor:'red'
    },

    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        left:40,
        bottom:50,
        backgroundColor:'red',
        zIndex:3,
      },

      systemMessageText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold'
      }
  });