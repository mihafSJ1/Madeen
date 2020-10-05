import React from "react";
import { Header } from "react-navigation";
import { View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default function Logout({ navigation }) {
<TouchableOpacity
style={styles.logoutButton}
onPress={() =>

}
>
<SimpleLineIcons
  name="logout"
  size={27}
  color="#9B9B7A"
  solid
></SimpleLineIcons>
</TouchableOpacity>