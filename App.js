import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Register from "./Register";
import login from "./login";
import ResetPassword from "./ResetPassword";
import Home from "./Home";
import FirstPage from "./FirstPage";
import Timeline from "./Timeline";
import squares from "./squares";
import request from "./Request";
import Alert from "./Alert";
import CustomAlertComponent from "./CustomAlertComponent";
import * as firebase from "firebase";

const Stack = createStackNavigator();

export default function App() {
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
              name="FirstPage"
              component={FirstPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Timeline"
              component={Timeline}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="squares"
              component={squares}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="request"
              component={request}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//
