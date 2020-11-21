

// ////صفحة الهوم عنده 

import { List, Divider } from 'react-native-paper';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Loading from './Loading'; 
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet , Button, FlatList, TouchableOpacity} from 'react-native';
import { Title } from 'react-native-paper';
// import { AuthContext } from '../navigation/AuthProvider';
// import FormButton from '../components/FormButton';
import { IconButton } from 'react-native-paper';
import { AuthContext } from './AuthProvider';




export default function HomeScreen({ navigation }) {
  const { currentUser } = firebase.auth();
  firebase
    .database()
    .ref("users/" + currentUser.uid)
    .on("value", (snapshot) => {
      // this.setName(snapshot.val().fullName);
      //   this.setEmail(snapshot.val().email),
      //   this.setPic(snapshot.val().UserImage);
      // emailf=snapshot.val().email;
      // pic=snapshot.val().UserImage;
    });
  const { user, logout } = useContext(AuthContext);

const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('THREADS')
      .doc(currentUser.uid)
      .collection('allChat')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            ...documentSnapshot.data()
          };
        });

        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

      // firebase.firestore()
      // .collection('THREADS')
      // .doc(sID)
      // .collection('allChat')
      // .onSnapshot(querySnapshot => {
      //   const threads = querySnapshot.docs.map(documentSnapshot => {
      //     return {
      //       _id: documentSnapshot.id,
      //       // give defaults
      //       name: '',
      //       ...documentSnapshot.data()
      //     };
      //   });

      //   setThreads(threads);

      //   if (loading) {
      //     setLoading(false);
      //   }
      // });
    /**
     * unsubscribe listener
     */
    return () => unsubscribe();



  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    //  <View>
    //   <Title>Home Screen</Title>
    //   <Title>All chat rooms will be listed here</Title>
    //   {/* <Title>{user.uid}</Title> */}
    //   <Button
    //     modeValue='contained'
    //     title='Logout'
    //     onPress={() => logout()}
    //   />
    //   <Button
    //     modeValue='contained'
    //     title='Add Room'
    //     onPress={() => navigation.navigate('addRoom')}
    //   />
    
  

    <View style={styles.container}>
          <Title> {currentUser.uid}</Title>
      {/* <IconButton
       style={styles.chatIcon}
        icon='message-plus'
        size={38}
        color='#f1dca7'
        onPress={() => navigation.navigate('addRoom')}
      /> */}
      <View style={styles.RoomList}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity

          onPress={() => navigation.navigate('Room', {sID:item.latestMessage.to, rID:item._id, Created:item.latestMessage.createdBy})}
          >
            <List.Item
              title={item.name}
              description='Item description'
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />










  </View>
</View>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    bottom:-100,
    top:30,

  },

  listDescription: {
    fontSize: 16
  },

  chatIcon:{
    top:80,
    left:170,
  },
  RoomList:{
    top:60,
    bottom:100,
  },
  listTitle: {

    fontSize: 22
  },
});
