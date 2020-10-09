import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Register from "./Register";
import login from "./login";
import ResetPassword from "./ResetPassword";
import Home from "./Home";
import { AntDesign,MaterialIcons,Feather } from '@expo/vector-icons';
import SvgComponent from './Svgnav';
import SvgComponent2 from './TabbarSVG'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Timeline from "./Timeline";
import squares from "./squares";
import Request from "./Request";
import TopBar from "./TopBar";
import Alert from "./Alert";
import FirstPage from "./FirstPage";
import CustomAlertComponent from "./CustomAlertComponent";
import Profile from "./Profile"
// import * as firebase from "firebase";
import { color } from "react-native-reanimated";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function squaresScreens(){
  return(
    <Stack.Navigator>
      
      <Stack.Screen

  name="squares"
  component={squares}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="Timeline"
  component={Timeline}
  options={{ headerShown: false }}
/>
</Stack.Navigator>
  );
}


function Homenav(){
  
  return(
   
    <Tab.Navigator
  
    initialRouteName="squers"
    tabBarOptions={{
      activeTintColor: '#746356', 
      inactiveTintColor: '#9B9B7A', 
      
    style:{
      
       showIcon: true,
       
       // justifyContent: 'center',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        shadowOpacity: 0.50 ,
        shadowColor:"#707070",
        shadowRadius: 5,
        
        shadowOffset: {
    
            height: 3, width: 2
        },
        //height:60,
        justifyContent: 'center',
      }}
      
    }
    
  >
  
   <Tab.Screen
    name="squares"
    component={squares}
    options={{
      tabBarLabel: '',
      tabBarIcon: ({ color, size }) => (
          <Feather name="home" size={27}  color={ color } style={{ textAlignVertical: 'center' }}/>
      ),
    }}
  />
<Tab.Screen
    name="TopBar"
    component={TopBar}
    options={{
      tabBarLabel: '',
      tabBarIcon: ({ color, size }) => (
        <MaterialIcons name="notifications-none"  size={32} color={ color } style={{ textAlignVertical: 'center' }}/>
      ),
    }}
  />
   <Tab.Screen
    name="Request"
    component={Request}
    options={{
      tabBarLabel: '',
      tabBarIcon: ({ color, size }) => (
        <SvgComponent bottom={10} shadowOpacity= {0.50} shadowColor="#707070"
        shadowRadius={4}
       
         />
      ),
    }} 
  />
  <Tab.Screen
    name="Timeline"
    component={squaresScreens}
    options={{
      tabBarLabel: '',
      tabBarIcon: ({ color, size }) => (
       <MaterialIcons  name="chat-bubble-outline"  size={27} color={ color } style={{ textAlignVertical: 'center' }} />
      ),
    }}
  />
 
   
   <Tab.Screen
    name="Profile"
    component={Profile}
    options={{
      tabBarLabel: '',
      tabBarIcon: ({ color, size }) => (
       
          <MaterialIcons    name="person-outline"  size={30} color={ color } zIndex={10}/>
      ),
 
    }}
  />
  
     </Tab.Navigator>
     
  );
}

     


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
          name="squares"
          component={Homenav}
          options={{ headerShown: false }}
        />
   </>
    )}
  </Stack.Navigator>
  
    </NavigationContainer>
  );
}
//
