import React from 'react';

import { StyleSheet,TextInput} from 'react-native';

export default function RegisterTextInput() {
    return (
        <TextInput style={styles.TextInput}/>
    )};
    const styles = StyleSheet.create({
        TextInput:{
            //  marginTop:15,
             marginLeft:30,
             alignItems:'center',
             borderColor:'#CBCA9E',
             width:320,
             backgroundColor:'#fff',
             height:40,
             borderRadius:15,
             borderWidth:2,

         },
    })