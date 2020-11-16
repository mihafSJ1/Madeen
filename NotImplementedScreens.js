// import { StatusBar } from "expo-status-bar";
// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   TouchableHighlight,
// } from "react-native";
// import { useFonts } from "expo-font";
// import { AppLoading } from "expo";
// import { LinearGradient } from "expo-linear-gradient";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import * as firebase from "firebase";
// import "@firebase/auth";
// import FirebaseKeys from "./FirebaseKeys";
// import TopBar from "./TopBar";
// const firebaseConfig = {
//   apiKey: "AIzaSyALc3LJdCzNeP3fbeV2MvTLYDbH8dP-Q-8",
//   authDomain: "madeendb2.firebaseapp.com",
//   databaseURL: "https://madeendb2.firebaseio.com",
//   projectId: "madeendb2",
//   storageBucket: "madeendb2.appspot.com",
//   messagingSenderId: "814154412010",
//   appId: "1:814154412010:web:435cac99ae40206a1ecc93",
//   measurementId: "G-SXS9Z8NESC",
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export default function NotImplementedScreens({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <Text style={{ fontSize: 20 }}>Not Implemented Yet... </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// ////صفحة الهوم عنده 

import { List, Divider } from 'react-native-paper';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Loading from './Loading'; 
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet , Button, FlatList} from 'react-native';
import { Title } from 'react-native-paper';
// import { AuthContext } from '../navigation/AuthProvider';
// import FormButton from '../components/FormButton';

export default function HomeScreen({ navigation }) {
//   const { user, logout } = useContext(AuthContext);
const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection('THREADS')
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
  <FlatList
    data={threads}
    keyExtractor={item => item._id}
    ItemSeparatorComponent={() => <Divider />}
    renderItem={({ item }) => (
      <List.Item
        title={item.name}
        description='Item description'
        titleNumberOfLines={1}
        titleStyle={styles.listTitle}
        descriptionStyle={styles.listDescription}
        descriptionNumberOfLines={1}
      />
    )}
  />
</View>
// </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1
  },
  listTitle: {
    fontSize: 22
  },
  listDescription: {
    fontSize: 16
  }
});