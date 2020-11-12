import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-elements';

export default function rate() {
    const ratingCompleted = (rating) => {

        console.log("Rating is: " + rating)
      }
    return(
        <View>
        
<AirbnbRating />

<AirbnbRating
  count={11}
  reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
  defaultRating={11}
  size={20}
/>
<AirbnbRating />

{/* <Rating
  showRating
  onFinishRating={ratingCompleted}
  style={{ paddingVertical: 10 }}
/> */}

 {/* <Rating
  type='heart'
  ratingCount={3}
  imageSize={60}
  showRating
  onFinishRating={ratingCompleted}
/> */}


{/* <Rating
  type='custom'
//   ratingImage={WATER_IMAGE}
  ratingColor='#3498db'
  ratingBackgroundColor='#c8c7c8'
  ratingCount={10}
  imageSize={30}
  onFinishRating={ratingCompleted}
  style={{ paddingVertical: 10 }}
/>  */}
</View>
   );
}