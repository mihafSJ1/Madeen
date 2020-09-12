import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { AppLoading } from "expo";

export default function CustomAlertComponent() {
  let [fontsLoaded] = useFonts({
    "Bahij_TheSansArabic-Bold": require("./assets/fonts/Bahij_TheSansArabic-Bold.ttf"),
    "Bahij_TheSansArabic-Light": require("./assets/fonts/Bahij_TheSansArabic-Light.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.mainContainer}>
      {/*---------------------------------------------------*/}
      <View style={styles.topPart}>
        <LinearGradient
          colors={["#EEF2ED", "#FFFFFF"]}
          style={{
            padding: 17,
            marginTop: -25,
            alignItems: "center",
            borderRadius: 33,
          }}
        >
          <Ionicons name="md-checkmark" size={40} color="#7DC779" solid />
        </LinearGradient>
      </View>
      {/*---------------------------------------------------*/}
      <View style={styles.middlePart}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontFamily: "Bahij_TheSansArabic-Light",
          }}
        >
          تم ارسال رابط استعادة كلمة المرور على بريدك الالكتروني، لُطفًا تفقده!
        </Text>
      </View>
      {/*---------------------------------------------------*/}
      <View style={styles.bottomPart}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#CBCA9E" }]}
        >
          <Text style={styles.buttonText}> حسنًا </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    height: "25%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 4,
  },
  middlePart: {
    flex: 1,
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 4,
    fontSize: 16,
    marginVertical: 2,
  },
  bottomPart: {
    flex: 0.5,
    width: "100%",
    flexDirection: "row",
    padding: 4,
    justifyContent: "space-evenly",
  },
  button: {
    alignItems: "center",
    width: 100,
    height: 30,
    padding: 5,
    marginTop: -8,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Bahij_TheSansArabic-Bold",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 30,
  },
});
