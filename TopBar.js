import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import "@firebase/auth";
import { SimpleLineIcons } from "@expo/vector-icons";
import Svg, { Defs, G, Path } from "react-native-svg";

export default function TopBar() {
  return (
    <View style={styles.container}>
      <View style={styles.rightItems}>
        <TouchableOpacity style={styles.logoutButton}>
          <SimpleLineIcons
            name="logout"
            size={35}
            color="#9B9B7A"
            solid
          ></SimpleLineIcons>
        </TouchableOpacity>
        <Text style={styles.topBarText}>مرحبًا رغد!</Text>
        <Image
          source={require("./assets/UserProfileImage.png")}
          style={styles.profileImage}
        ></Image>
      </View>
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
    marginBottom: 90,
  },

  rightItems: {
    backgroundColor: "#fff",
    marginBottom: 10,
    width: "100%",
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
    width: 73.19,
    height: 73.2,
  },

  topBarText: {
    color: "#404040",
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "right",
    fontSize: 20,
    marginTop: 20,
    marginRight: 10,
  },

  logoutButton: {
    marginTop: 20,
    marginRight: 170,
  },
});
