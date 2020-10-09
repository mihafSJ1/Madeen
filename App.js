import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Register from "./Register";
import login from "./login";
import ResetPassword from "./ResetPassword";
import Home from "./Home";
import { Button } from "react-native";

import Timeline from "./Timeline";
import squares from "./squares";
import request from "./Request";
import TopBar from "./TopBar";
import Alert from "./Alert";
import FirstPage from "./FirstPage";
import CustomAlertComponent from "./CustomAlertComponent";
import Profile from "./Profile";
import * as firebase from "firebase";

// const Logout = () => {
//   Alert.alert(
//     "تنبيه!",
//     "هل أنت متأكد من تسجيل الخروج؟",
//     [
//       {
//         text: "إلغاء",
//         onPress: () => {
//           return;
//         },
//         style: "cancel",
//       },
//       {
//         text: "موافق",
//         onPress: () =>
//           firebase
//             .auth()
//             .signOut()
//             .then(
//               () => console.log("successfully logged out"),
//               navigation.navigate("Home")
//             ),
//       },
//     ],
//     { cancelable: false }
//   );
// };

//import Testnav from "./testnav";
const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // if (loading) {
  //   return (
  //     <></>
  //   )
  // }

  // useEffect(() => {
  //   // const usersRef = firebase.firestore().collection('users');
  //   // firebase.auth().onAuthStateChanged(user => {
  //   //   if (user) {
  //   //     usersRef
  //   //       .doc(user.uid)
  //   //       .get()
  //   //       .then((document) => {
  //   //         const userData = document.data()
  //   //         setLoading(false)
  //   //         setUser(userData)
  //   //       })
  //   //       .catch((error) => {
  //   //         setLoading(false)
  //   //       });
  //   //   } else {
  //   //     setLoading(false)
  //   //   }
  //   // });

  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home">
            {(props) => <Home {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login"
              component={login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CustomAlertComponent"
              component={CustomAlertComponent}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Timeline"
              component={Timeline}
              options={{
                headerShown: true,
                navigation: { navigation },
                header: (props) => <TopBar {...props} />,
                headerLeft: () => <Button onPress={() => Logout()} />,
              }}
            />
            <Stack.Screen
              name="squares"
              component={squares}
              options={{
                headerShown: true,
                navigation: { navigation },
                // headerStyle: {
                //   backgroundColor: "transparent",
                // },
                header: (props) => <TopBar {...props} />,
              }}
            />
            <Stack.Screen
              name="TopBar"
              component={TopBar}
              options={{ headerShown: false, navigation: { navigation } }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                headerShown: true,
                navigation: { navigation },
                header: (props) => <TopBar {...props} />,
                headerLeft: () => <Button onPress={() => Logout()} />,
              }}
            />

            <Stack.Screen
              name="request"
              component={request}
              options={{
                headerShown: false,
                navigation: { navigation },
              }}
            />
            <Stack.Screen
              name="FirstPage"
              component={FirstPage}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//
