

import React, { useState } from 'react';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

export default function addRoom() {
  const [messages, setMessages] = useState([
    /**
     * Mock message data
     */
    // example of system message
    {
      _id: 0,
      text: 'New room created.',
      createdAt: new Date().getTime(),
      system: true
    },
    // example of chat message
    {
      _id: 1,
      text: 'Henlo!',
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: 'Test User'
      }
    }
  ]);

  // helper method that is sends a message
  function handleSend(newMessage = []) {
    setMessages(GiftedChat.append(messages, newMessage));
  }

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
  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => handleSend(newMessage)}
      user={{ _id: 1, name: 'User Test' }}
      renderBubble={renderBubble}
      placeholder='Type your message here...'
      showUserAvatar
      alwaysShowSend
      // Step 4: add the prop
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}


    />
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
      }
  });