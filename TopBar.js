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

export default function TopBar({ navigation }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const { currentUser } = firebase.auth();
    setCurrentUser({ currentUser });
    firebase
      .database()
      .ref("users/" + currentUser.uid)
      .on("value", (snapshot) => {
        setUserName(snapshot.val().fullName);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.rightItems}>
        <Text style={styles.topBarText}>مرحبًا {userName}!</Text>
        <Image
          source={require("./assets/UserProfileImage.png")}
          style={styles.profileImage}
        ></Image>
      </View>
      <TouchableOpacity
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
      </TouchableOpacity>
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
  },

  topBarText: {
    color: "#404040",
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "right",
    fontSize: 18,
    marginTop: 10,
    marginRight: 10,
  },

  logoutButton: {
    justifyContent: "flex-start",
    zIndex: 2,
    top: -60,
    right: 170,
  },
});
