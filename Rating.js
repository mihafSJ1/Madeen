import React, {Component,useState} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity,Modal} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';
import { useFonts } from "expo-font";
import * as Font from "expo-font";

export default function rate() {
  const [rating,setRating] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);
  const ratingCompleted = (rating) => {
setRating(rating)
        console.log("Rating is: " + rating)
      
      }
    return(
      
        <View>
            
        <AirbnbRating />
        <AirbnbRating />
            <Modal
       
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.ratingcenteredView}>
          <View style={styles.RatingmodalView}>
          <Text style={styles.RatingmodalText}> كيف كانت تجربتك؟</Text>
          <AirbnbRating 
          reviewSize = {22}

        reviewColor = {'#CBCA9E'}
              
 type='custom'
  count={5}
  ratingBackgroundColor={'green'}
  ratingColor='#3498db'
  ratingBackgroundColor='#c8c7c8'
  reviews={['سيئة','جيدة','متوسطة','ممتازة','رائعة']}
  defaultRating={5}
  onFinishRating={ratingCompleted}

  ratingColor={'#3498db'}
  ratingBackgroundColor={'red'}
  ratingText= {{
    fontSize: 2,
    textAlign: 'center',
    
   
  }}
  
 
  size={20}

/>
           

            <TouchableOpacity
       style={[styles.button, { backgroundColor: "#D4CEC9" }]}
              onPress={() => {
             setModalVisible(!modalVisible)
          

              }}
            >
              <Text style={styles.buttonText}>إرسال</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableOpacity>
      



</View>
   );
}
const styles = StyleSheet.create({
  ratingcenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  RatingmodalView: {
    height:240,
    width:300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
    buttonText: {
  fontFamily: "Bahij_TheSansArabic-Light",
  textAlign: "center",
},
  Ratingbutton: {
    alignItems: "center",
    width: 170,
    height: 30,
    marginTop: 50,
    padding: 5,
    borderRadius: 15,
    marginLeft: 10,
    bottom: 20,
    backgroundColor: "#fff",

  },
  buttonText: {
    fontFamily: "Bahij_TheSansArabic-Light",
    textAlign: "center",
  },
  RatingmodalText: {
    fontFamily: "Bahij_TheSansArabic-Light",
    fontSize:20,
    marginBottom: 0,
    textAlign: "center"
  }
});