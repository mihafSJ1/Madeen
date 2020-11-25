

// ////صفحة الهوم عنده 

import { List, Divider } from 'react-native-paper';
import * as firebase from 'firebase';
import 'firebase/firestore';
import Loading from './Loading'; 
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet , Button, FlatList, TouchableOpacity,  Dimensions,} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Title } from 'react-native-paper';
// import { AuthContext } from '../navigation/AuthProvider';
// import FormButton from '../components/FormButton';
import { IconButton } from 'react-native-paper';
import { AuthContext } from './AuthProvider';
import { Right } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import BackgroundComponent from "./BackgroundComponent";

import { MaterialIcons } from '@expo/vector-icons'; 
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
      
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            title:documentSnapshot.data().title,
            // name: '',
            latestMessage: {
               text: ''
             },
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

    return () => unsubscribe();



  }, []);

  if (loading) {
    return <Loading />;
  }

  return (


    <View style={styles.container}>
               <LinearGradient
          colors={[
            "rgba(217,174,148,0.36)",
            "rgba(241,220,167,0.43)",
            "#EEF2ED",
          ]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0.5, y: 0 }}
          useAngle
          angle={180}
          style={{
            borderRadius:
              Math.round(
                Dimensions.get("window").width + Dimensions.get("window").height
              ) / 2,
            width: Dimensions.get("window").width * 2.1,
            height: Dimensions.get("window").width * 3.1,
            right: -660,
            top: -630,
            position: "absolute",
          }}
        ></LinearGradient>
    
      <View style={styles.RoomList}>
  
      <FlatList
      textalign
        data={threads}
       
        keyExtractor={item => item._id}
        // ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          < View>
           
          <TouchableOpacity
style={styles.chatTouch}
          onPress={() => navigation.navigate('Room', {sID:item.latestMessage.to, rID:item._id, Created:item.latestMessage.createdBy}, { thread: 'item' })}
          >
  <MaterialIcons style={styles.chat}  name="chat-bubble" size={30} color="#C79578" />
{/* <Ionicons  style={styles.chat} name="md-chatboxes" size={34} color="#D9AE94" /> */}
               {/* <Ionicons   style={styles.chat} name="ios-chatboxes" size={44} color="#D9AE94" /> */}
            <List.Item
  
                style={styles.card}
              title={item.name}
              // description='Item description'
              description={item.latestMessage.text}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
           
            />
         
          </TouchableOpacity>
          </View>
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
bottom:10,
    top:30,

  },

  listDescription: {
    fontSize: 16,
    width: 380,
    textAlign:'right',
    zIndex:6,
    fontFamily: "Bahij_TheSansArabic-Light",
   right:16,
  },

  chatIcon:{
    top:80,
    left:170,
  },
  RoomList:{
    top:70,
marginBottom:10,
    zIndex:3,
    height:1000,
   
  },
  listTitle: {
textAlign:'right',
// backgroundColor:'red',
width: 380,
    fontSize: 19,
    zIndex:5,
    fontFamily: "Bahij_TheSansArabic-Bold",
    color:'#CBCA9E',
    right:10
  },

  card: {
    // top:30,
    borderRadius:6,
    textAlign:'right',
    backgroundColor: "#fff",
    marginBottom: 10,
    width: 400,
    height:80,
    borderColor:'#746356',
    borderWidth:0.15,
    
    shadowColor: "#746356",
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    flexDirection: "row",
    // zIndex:-3,
    left:5,
    // justifyContent: "flex-end",
  },

chat:{
  top:60,
left:35,
zIndex:3,

// backgroundColor:'red'
},

chatTouch:{
marginBottom:-35,
}

});
