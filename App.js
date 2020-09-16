

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
 
import  Register from './Register';
import login  from './login';
import ResetPassword  from './ResetPassword';
import Home from './Home';
import Alert from './Alert';
import CustomAlertComponent from './CustomAlertComponent'


 


const Stack = createStackNavigator();

export default function App() {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
  
    return (
        <NavigationContainer>
        <Stack.Navigator>
          { user ? (
            <Stack.Screen name="Home">
              {props => <Home {...props} extraData={user} />}
            </Stack.Screen>
          ) : (
            <>
                <Stack.Screen name="Home" component={Home} options={{ headerShown:false}} />
               <Stack.Screen name="login" component={login} options={{ headerShown:false}} />
              <Stack.Screen name="Register" component={Register} options={{ headerShown:false}} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown:false}} />
              <Stack.Screen name="CustomAlertComponent" component={CustomAlertComponent} options={{ headerShown:false}} />
              
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
// 

 



