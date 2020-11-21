
// import { GiftedChat, Bubble, Send ,  SystemMessage} from 'react-native-gifted-chat';
// import { IconButton } from 'react-native-paper';
// import { ActivityIndicator, View, StyleSheet } from 'react-native';
// import * as firebase from 'firebase';
// import 'firebase/firestore';
// import React, { useState, useContext, useEffect } from 'react';
// import { render } from 'react-dom';



// //export default function Room({ route, navigation, props, sID }) {
//   export default class Room extends React.Component {

  


//   // helper method that is sends a message
//   // function handleSend(newMessage = []) {
//   //   setMessages(GiftedChat.append(messages, newMessage));
//   // }

//    renderBubble(props) {
//     return (
//       // Step 3: return the component
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             // Here is the color change
//             backgroundColor: '#d9ae94'
//           }
//         }}
//         textStyle={{
//           right: {
//             color: '#fff'
//           }
//         }}
//       />
//     );
//   }
  
//    renderSend(props) {
//     return (
//       <Send {...props}>
//         <View style={styles.sendingContainer}>
//           <IconButton icon='send-circle' size={32} color='#986979' />
//         </View>
//       </Send>
//     );
//   }
//    scrollToBottomComponent(props) {
//     return (
//         <Send {...props}>
//       <View style={styles.bottomComponentContainer}>
//         <IconButton icon='send-circle' size={536} color='#986979' />
//       </View>
//       </Send>
//     );
//   }//ما تشتغل الكلبة

//    renderLoading() {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size='large' color='#6646ee' />
//       </View>
//     );
//   }

// //عدنا
//   async  handleSend(messages) {
//     const text = messages[0].text;

   

//     firebase.firestore()
//       .collection('THREADS')
//       .doc(currentUser.uid)
//       .collection('allChat')
//     .doc(sID2)
//       .collection('MESSAGES')
//       .add({
//         text,
//         createdAt: new Date().getTime(),
//         user: {
//           _id: currentUser.uid,
//           email: currentUser.email
//         }
//       });

//     await firebase.firestore()
//       .collection('THREADS')
//       .doc(currentUser.uid)
//       .collection('allChat')
//     .doc(sID2)
//       .collection('MESSAGES')
//       .add(
//         {
//           latestMessage: {
//             text,
//             createdAt: new Date().getTime()
//           }
//         },
//         { merge: true }
//       );
//   };

//   useEffect(() => {
//     const {messagesListener} = firebase.firestore()
//       .collection('THREADS')
//       .doc(currentUser.uid)
//       .collection('allChat')
//     .doc(sID)
//       .collection('MESSAGES')
//       .orderBy('createdAt', 'desc')
//       .onSnapshot(querySnapshot => {
//         const messages = querySnapshot.docs.map(doc => {
//           const firebaseData = doc.data();

//           const data = {
//             _id: doc.id,
//             text: '',
//             createdAt: new Date().getTime(),
//             ...firebaseData
//           };

//           if (!firebaseData.system) {
//             data.user = {
//               ...firebaseData.user,
//               name: firebaseData.user.email
//             };
//           }

//           return data;
//         });

//         setMessages(messages);
//       });



      
//     // Stop listening for updates whenever the component unmounts
//     return () => messagesListener();
//   }, []);

//    renderSystemMessage(props) {
//     return (
//       <SystemMessage
//         {...props}
//         wrapperStyle={styles.systemMessageWrapper}
//         textStyle={styles.systemMessageText}
//       />
//     );
//   }
  


// render(){
  
//   const [messages, setMessages] = useState([]);
//  const { sID2 } = sID;
//   const { currentUser } = firebase.auth();
//   return (
//     <GiftedChat
//       messages={messages}
//       onSend={handleSend}
//       user={{ _id: currentUser.uid }}
//       renderBubble={renderBubble}
//       placeholder='Type your message here...'
//       showUserAvatar
//       alwaysShowSend
//       // Step 4: add the prop
//       renderSend={renderSend}
//       scrollToBottomComponent={scrollToBottomComponent}
//       renderLoading={renderLoading}
//       renderSystemMessage={renderSystemMessage}

//     />
  

//   );//end return
// }

// }//end class

// const styles = StyleSheet.create({
//     sendingContainer: {
//       justifyContent: 'center',
//       alignItems: 'center'
//     },

//     bottomComponentContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         left:40,
//         bottom:50,
//         backgroundColor:'red',
//         zIndex:3,
//       },

//       systemMessageText: {
//         fontSize: 14,
//         color: '#fff',
//         fontWeight: 'bold'
//       }
//   });




/////////// Room as function 
import { GiftedChat, Bubble, Send ,  SystemMessage} from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
import React, { useState, useContext, useEffect,alert } from 'react';



export default function Room({ route, navigation }) {
  const [messages, setMessages] = useState([]);
  const [messages2, setMessages2] = useState([]);
  const { sID } = route.params;
  const { rID } = route.params;
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


  async function handleSend(messages, messages2) {
    const text = messages[0].text;
   // const text2 = messages[0].text;
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

   

      //دبلكيت 
       //text = messages2[0].text;
      console.log("handle 2 here");
      // firebase.firestore()
      // .collection('THREADS')
      // .doc(sID)
      // .collection('allChat')
      // .doc(rID)
      //   .collection('MESSAGES')
      //   .add({
      //     text,
      //     createdAt: new Date().getTime(),
      //     user: {
      //       _id: currentUser.uid,
      //       email: currentUser.email
      //     }
      //   });
  
      //يبدا الاويت
      // await firebase.firestore()
      // .collection('THREADS')
      // .doc(sID)
      // .collection('allChat')
      // .doc(rID)
      //   .collection('MESSAGES')
      //   .add(
      //     {
      //       latestMessage: {
      //         text,
      //         createdAt: new Date().getTime()
      //       }
      //     },
      //     { merge: true }
      //   );
      //   console.log("قبل اويت كرنت يوزر");
      //   await firebase.firestore()
      // .collection('THREADS')
      // .doc(currentUser.uid)
      // .collection('allChat')
      // .doc(rID)
      //   .collection('MESSAGES')
      //   .add(
      //     {
      //       latestMessage: {
      //         text,
      //         createdAt: new Date().getTime()
      //       }
      //     },
      //     { merge: true }
      //   );
  };
  // async function handleSend2(messages2) {
  //   const text = messages2[0].text;
  //   console.log("handle 2 here");
  //   firebase.firestore()
  //   .collection('THREADS')
  //   .doc(sID)
  //   .collection('allChat')
  //   .doc(rID)
  //     .collection('MESSAGES')
  //     .add({
  //       text,
  //       createdAt: new Date().getTime(),
  //       user: {
  //         _id: currentUser.uid,
  //         email: currentUser.email
  //       }
  //     });

  //   await firebase.firestore()
  //   .collection('THREADS')
  //   .doc(sID)
  //   .collection('allChat')
  //   .doc(rID)
  //     .collection('MESSAGES')
  //     .add(
  //       {
  //         latestMessage: {
  //           text,
  //           createdAt: new Date().getTime()
  //         }
  //       },
  //       { merge: true }
  //     );
  // };
  

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
// ذبلكيت مسج
console.log("يا كلب اضبط ريحني ")
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


      
    // Stop listening for updates whenever the component unmounts
    // return () => messagesListener();
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
      messages2={messages2}
      onSend={handleSend}

    
      // onSend={handleSend2}
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