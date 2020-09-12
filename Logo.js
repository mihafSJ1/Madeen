import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Image} from 'react-native';
 
export default function Logo() {

    return (
        <Image style={styles.logo}
        source={require('./assets/logo.png')}
        />
    )};

const styles = StyleSheet.create({
    logo:{
        alignItems:'center',
<<<<<<< HEAD
        marginLeft:100,
        marginTop:100,
        marginBottom:-40,
        zIndex:2,
    }
})
=======
        marginLeft:70,
        marginTop:100,
        marginBottom:-40,
        zIndex:2,
     
      },
});
>>>>>>> login front end
