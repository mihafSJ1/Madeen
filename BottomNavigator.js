import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert } from 'react-native';
import { AntDesign,MaterialIcons,Feather } from '@expo/vector-icons';

export default function BottomNavigator() {

   

 
        return (
            <View>

                {/*addButton*/}
                    <TouchableOpacity  style={styles.addButton} onPress={() =>{ Alert.alert('add') }}>
                    <AntDesign name="plus" style={styles.addicon}size={43} color="black" />
                    </TouchableOpacity >
                 {/*end addButton*/}

                 {/*navstart*/}
                <View style={styles.navbar}>

                    
                        <TouchableOpacity onPress={() =>{ Alert.alert('profile') }}>
                      
                        <MaterialIcons name="person-outline" style={styles.icons} size={30} color="#9B9B7A" />
                        
                        </TouchableOpacity>
                       
                 
                    
                  

                        <TouchableOpacity
                            onPress={() => { Alert.alert("click") }}>
                          <MaterialIcons  name="chat-bubble-outline" style={styles.icons}  size={27} color="#9B9B7A" />
                       
                        </TouchableOpacity>
                    

                            <TouchableOpacity
                                onPress={() => { Alert.alert("click") }} >
                           <MaterialIcons name="notifications-none" style={styles.icons} size={32} color="#9B9B7A" />
                            </TouchableOpacity>
                            
                    
                       
                            <TouchableOpacity
                                onPress={() => { Alert.alert("click") }}>
                                <Feather name="home" style={styles.icons} size={27} color="#9B9B7A" />
                              
                            </TouchableOpacity>
                            
                           


                   
                </View>{/*navend*/}
            </View>
        );
    

    
}


const styles = StyleSheet.create({
navbar:{
  
    alignItems:"center",
   flexDirection: ('row'),
  // padding:10,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius:30,
    borderTopLeftRadius:30,
    shadowOpacity: 1,
    shadowColor:"#707070",
    shadowRadius: 4,
    shadowOffset: {

        height: 3, width: 2
    },
    
    bottom: 0,
    width: 375,
    height: 63.26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 25


},
addButton:{
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#9B9B7A',
    justifyContent: 'center',
    width: 66,
    height: 66,
   //borderBottomWidth:50,
    borderRadius: 50,
  
    //flexDirection: 'row',

    bottom:40 ,
    zIndex: 1,
    shadowOpacity: 1,
    shadowColor:"#707070",
    shadowRadius: 4,
 
    shadowOffset: {

        height: 3, width: 2
    },
},
addicon:{
    resizeMode: 'contain',
    flexDirection: 'row',
position:"absolute",
  color:"white",
 
  left:12,
  //right:3,
  bottom:9,
},
    icons:{
       // flexGrow: 5,
        marginTop: 3,
        marginStart:2 ,
    }


 


});

