import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import  Register from './Register';
import login  from './login';
import ResetPassword  from './ResetPassword';
import Home from './Home';



 


const Stack = createStackNavigator();

function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown:false}} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown:false}} />
         
          <Stack.Screen name="login" component={login} options={{ headerShown:false}} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  export default App;
  

