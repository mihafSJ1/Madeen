import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
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
  const [modalVisible, setModalVisible] = useState(false);
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

      <ScrollView style={{ width: "100%" }}>
        {/* -------------------------------------- CARDS*/}
        <TouchableOpacity
          style={styles.profileImage}
          onPress={() => navigation.navigate("ResetPassword")}
        >
          <Image source={require("./assets/UserImagePlaceholder.png")}></Image>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            setModalVisible(true);
          }}
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
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/*--------------------------------------------- View request */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <AntDesign
                style={styles.close}
                name="close"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Text style={styles.header}>تفاصيل الطلب </Text>
            <Text style={styles.textInputTitle}>
              {" "}
              اسم الدائن | <Text style={styles.textData}> رهام الخديدي</Text>
            </Text>
            <Text style={styles.textInputTitle}>
              نوع التسديد | <Text style={styles.textData}> دفعة كاملة </Text>
            </Text>
            <Text style={styles.textInputTitle}>
              {" "}
              المبلغ|<Text style={styles.textData}> ٣٠٠٠ ريال </Text>{" "}
            </Text>

            <Text style={styles.textInputTitle}>
              {" "}
              التاريخ النهائي المتوقع لإكمال التسديد|{" "}
              <Text style={styles.textData}> ٢٠-٩-٢٠٢٠ </Text>{" "}
            </Text>
            <Text style={styles.textInputTitle}>
              {" "}
               السبب | <Text style={styles.textData}> شراء سيارة </Text>{" "}
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#D4CEC9" }]}
              >
                <Text style={styles.buttonText}> رفض </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#CBCA9E" }]}
              >
                <Text style={styles.buttonText}> قبول </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: -50,
    width: "100%",
    flexDirection: "column-reverse",
    shadowColor: "#000",
    shadowOpacity: 0.11,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },

  profileImage: {
    zIndex: 2,
    top: 90,
    left: 340,
  },

  rightItems: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
    right: 60,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    borderTopRightRadius: 70,
    borderTopLeftRadius: 70,
    height: 550,
    // margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 100,
  },

  modalText: {
    marginBottom: 15,
    // textAlign: "center"
  },
  button: {
    alignItems: "center",
    width: 170,
    height: 30,
    marginTop: 10,
    padding: 5,
    borderRadius: 15,
    marginLeft: 10,
    backgroundColor: "#fff",
  },
  buttonText: {
    // fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginLeft: 25,
    fontSize: 30,
  },
  header: {
    // fontFamily: "Bahij_TheSansArabic-Light",
    color: "#404040",
    fontSize: 30,
    margin: 20,
    top: 30,
    textAlign: "center",
    justifyContent: "center",
    marginBottom: 60,
  },
  textInputTitle: {
    // fontFamily: "Bahij_TheSansArabic-Light",
    fontSize: 18,
    marginTop: 5,
    marginBottom: 5,
    color: "#57694C",
    textAlign: "right",

    marginRight: 35,
  },
  close: {
    marginLeft: 20,
  },
});
