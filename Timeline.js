import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import "@firebase/auth";
import { Ionicons } from "@expo/vector-icons";

const firebaseConfig = {
  apiKey: "AIzaSyAmXanlf80n5Sd_mEQiV9O9hEj4Z3i4B1g",
  authDomain: "madeen-46af8.firebaseapp.com",
  databaseURL: "https://madeen-46af8.firebaseio.com",
  projectId: "madeen-46af8",
  storageBucket: "madeen-46af8.appspot.com",
  messagingSenderId: "289377001222",
  appId: "1:289377001222:web:9aba3ddf0baa5ef74b0887",
  measurementId: "G-KWKWGXNQRN",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Timeline({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(217,174,148,0.36)", "rgba(241,220,167,0.43)", "#EEF2ED"]}
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

      {/* -------------------------------------- CARD 1*/}
      <ScrollView>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("FirstPage")}
        >
          <View style={styles.rightItems}>
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color="#9B9B7A"
              solid
              style={{ marginTop: 30, marginRight: 45 }}
            />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />

            <View style={styles.textContainer}>
              <Text style={styles.textLabel}>
                الإسم |<Text style={styles.textData}> رهام الخديدي</Text>
              </Text>
              <Text style={styles.textLabel}>
                المبلغ |<Text style={styles.textData}> ٣٠٠٠ ريال سعودي </Text>
              </Text>
              <Text style={styles.textLabel}>
                السبب |<Text style={styles.textData}> شراء... </Text>
              </Text>
            </View>
            <Image
              source={require("./assets/UserImagePlaceholder.png")}
            ></Image>
          </View>
        </TouchableOpacity>

        {/* -------------------------------------- CARD 2*/}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("FirstPage")}
        >
          <View style={styles.rightItems}>
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color="#9B9B7A"
              solid
              style={{ marginTop: 30, marginRight: 45 }}
            />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />

            <View style={styles.textContainer}>
              <Text style={styles.textLabel}>
                الإسم |<Text style={styles.textData}> رهام الخديدي</Text>
              </Text>
              <Text style={styles.textLabel}>
                المبلغ |<Text style={styles.textData}> ٣٠٠٠ ريال سعودي </Text>
              </Text>
              <Text style={styles.textLabel}>
                السبب |<Text style={styles.textData}> شراء... </Text>
              </Text>
            </View>
            <Image
              source={require("./assets/UserImagePlaceholder.png")}
            ></Image>
          </View>
        </TouchableOpacity>

        {/* -------------------------------------- CARD 3*/}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("FirstPage")}
        >
          <View style={styles.rightItems}>
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color="#9B9B7A"
              solid
              style={{ marginTop: 30, marginRight: 45 }}
            />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />

            <View style={styles.textContainer}>
              <Text style={styles.textLabel}>
                الإسم |<Text style={styles.textData}> رهام الخديدي</Text>
              </Text>
              <Text style={styles.textLabel}>
                المبلغ |<Text style={styles.textData}> ٣٠٠٠ ريال سعودي </Text>
              </Text>
              <Text style={styles.textLabel}>
                السبب |<Text style={styles.textData}> شراء... </Text>
              </Text>
            </View>
            <Image
              source={require("./assets/UserImagePlaceholder.png")}
            ></Image>
          </View>
        </TouchableOpacity>

        {/* -------------------------------------- CARD 4*/}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("FirstPage")}
        >
          <View style={styles.rightItems}>
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color="#9B9B7A"
              solid
              style={{ marginTop: 30, marginRight: 45 }}
            />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />

            <View style={styles.textContainer}>
              <Text style={styles.textLabel}>
                الإسم |<Text style={styles.textData}> رهام الخديدي</Text>
              </Text>
              <Text style={styles.textLabel}>
                المبلغ |<Text style={styles.textData}> ٣٠٠٠ ريال سعودي </Text>
              </Text>
              <Text style={styles.textLabel}>
                السبب |<Text style={styles.textData}> شراء... </Text>
              </Text>
            </View>
            <Image
              source={require("./assets/UserImagePlaceholder.png")}
            ></Image>
          </View>
        </TouchableOpacity>

        {/* -------------------------------------- CARD 5*/}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("FirstPage")}
        >
          <View style={styles.rightItems}>
            <Ionicons
              name="ios-arrow-back"
              size={25}
              color="#9B9B7A"
              solid
              style={{ marginTop: 30, marginRight: 45 }}
            />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />
            <Ionicons name="ios-star" size={17} color="#ECD246" solid />

            <View style={styles.textContainer}>
              <Text style={styles.textLabel}>
                الإسم |<Text style={styles.textData}> رهام الخديدي</Text>
              </Text>
              <Text style={styles.textLabel}>
                المبلغ |<Text style={styles.textData}> ٣٠٠٠ ريال سعودي </Text>
              </Text>
              <Text style={styles.textLabel}>
                السبب |<Text style={styles.textData}> شراء... </Text>
              </Text>
            </View>
            <Image
              source={require("./assets/UserImagePlaceholder.png")}
            ></Image>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F8F4",
  },

  card: {
    backgroundColor: "#fff",
    marginBottom: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.11,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  rightItems: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },

  textContainer: {
    marginRight: 10,
  },

  textLabel: {
    color: "#404040",
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "right",
    fontSize: 16,
  },

  textData: {
    color: "#CBCA9E",
    fontFamily: "Bahij_TheSansArabic-Bold",
  },
});
