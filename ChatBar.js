import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as firebase from "firebase";
import "@firebase/auth";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";




export default function TopBar({ route, navigation }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  // const { sID } = route.params;
  // const { rID } = route.params;
  // const { Created } = route.params;
  //  const { sID } = route.params;
  // const { rID } = route.params;
  useEffect(() => {
    const { currentUser } = firebase.auth();
    setCurrentUser({ currentUser });
    firebase
      .database()
      .ref("users/" + currentUser.uid)
      .on("value", (snapshot) => {
        setUserName(snapshot.val().fullName);
        setUserImage(snapshot.val().UserImage);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rightItems}>
  <Text style={styles.topBarText}>محادثة</Text>
        {/* <Image source={{ uri: userImage }} style={styles.profileImage}></Image> */}
      </View>
      
      <TouchableOpacity            
         onPress={() => navigation.navigate("ChatScreen")}
>
      <AntDesign style={styles.logoutButton} name="back" size={29} color="#9B9B7B" />
      </TouchableOpacity>

      {/* {navigation.navigate('Room', {sID:sID, rID:rID, Created:Created})} */}
      
      {/* <TouchableOpacity
        style={styles.logoutButton}
        onPress={() =>
          Alert.alert(
            "تنبيه!",
            "هل أنت متأكد من تسجيل الخروج؟",
            [
              {
                text: "إلغاء",
                onPress: () => {
                  return;
                },
                style: "cancel",
              },
              {
                text: "موافق",
                onPress: () =>
                  firebase
                    .auth()
                    .signOut()
                    .then(
                      () => console.log("successfully logged out"),
                      navigation.navigate("Home")
                    ),
              },
            ],
            { cancelable: false }
          )
        }
      >
        <SimpleLineIcons
          name="logout"
          size={27}
          color="#9B9B7A"
          solid
        ></SimpleLineIcons>
      </TouchableOpacity> */}



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
    height: 85,
  },

  rightItems: {
    backgroundColor: "#fff",
    marginBottom: 10,
    width: "100%",
    height: 85,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: "#000",
    shadowOpacity: 0.11,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },

  profileImage: {
    resizeMode: "stretch",
    width: 52.19,
    height: 52.2,
    borderRadius: 100,
    borderColor: "#CBCA9E",
    borderWidth: 1,
  },

  topBarText: {
    color: "#986979",
    fontFamily: "Bahij_TheSansArabic-Bold",
    // textAlign: "center",
    fontSize: 24,
    marginTop: 10,
    marginRight: 111,
left:-40,
  },

  logoutButton: {
    justifyContent: "flex-start",
    zIndex: 2,
    top: -60,
    right: 170,
  },
});
