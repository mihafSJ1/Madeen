
import { GiftedChat, Bubble, Send ,  SystemMessage} from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import React, { useState, useContext, useEffect } from 'react';



export default function addRoom({ route }) {
  const [messages, setMessages] = useState([]);
  const { thread } = route.params;
  const { currentUser } = firebase.auth();
  


  // helper method that is sends a message
  // function handleSend(newMessage = []) {
  //   setMessages(GiftedChat.append(messages, newMessage));
  // }

  function renderBubble(props) {
    return (
      // Step 3: return the component
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Here is the color change
            backgroundColor: '#d9ae94'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
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
  }//ما تشتغل الكلبة

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }

//عدنا
  async function handleSend(messages) {
    const text = messages[0].text;

    firebase.firestore()
      .collection('THREADS')
      .doc(currentUser.uid)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email
        }
      });

    await firebase.firestore()
      .collection('THREADS')
      .doc(currentUser.uid)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime()
          }
        },
        { merge: true }
      );
  }

  useEffect(() => {
    const messagesListener = firebase.firestore()
      .collection('THREADS')
      .doc(currentUser.uid)
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



      
    // Stop listening for updates whenever the component unmounts
    return () => messagesListener();
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
  



  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: currentUser.uid }}
      renderBubble={renderBubble}
      placeholder='Type your message here...'
      showUserAvatar
      alwaysShowSend
      // Step 4: add the prop
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
      renderSystemMessage={renderSystemMessage}

    />
  

  //   <GiftedChat
  //   messages={messages}
  //   onSend={handleSend}
  //   user={{ _id: currentUser.uid }}
  //   placeholder='Type your message here...'
  //   alwaysShowSend
  //   showUserAvatar
  //   scrollToBottom
  //   renderBubble={renderBubble}
  //   renderLoading={renderLoading}
  //   renderSend={renderSend}
  //   scrollToBottomComponent={scrollToBottomComponent}
  //   // renderSystemMessage={renderSystemMessage}
  // />
  );
}

const styles = StyleSheet.create({
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center'
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