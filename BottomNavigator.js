import React, { Component } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Text, Alert, Dimensions } from 'react-native';
import { AntDesign,MaterialIcons,Feather } from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SvgComponent from "./Svgnav";
import SvgComponent2 from "./Svg2";

export default function BottomNavigator() {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation();
        return (
            
            <View style={styles.container}>
                
                {/*addButton*/}
                 
                
                    
                 {/*end addButton*/}

                 {/*navstart*/}
                
                <View style={styles.navbar}>
                <TouchableOpacity  style={styles.addButton} onPress={() =>{ Alert.alert('add') }}>
                    <AntDesign name="plus" style={styles.addicon}size={43} color="black" mergen={20}/>
                    </TouchableOpacity >
                
                        <TouchableOpacity onPress={() =>{  Alert.alert("chat")}}>
                        <MaterialIcons name="person-outline" style={styles.icons1} size={30} color="#9B9B7A" zIndex={10}onPress={() => navigation.navigate("Profile")}/>
                        
                        </TouchableOpacity>
                       
                 
                    
                  
                        
                        <TouchableOpacity onPress={() => { Alert.alert("chat") }}>
                          <MaterialIcons  name="chat-bubble-outline" style={styles.icons2}  size={27} color="#9B9B7A"  />
                       
                        </TouchableOpacity>
                    
                        
                    
                            <TouchableOpacity
                                onPress={() => { Alert.alert("click") }} >
                           <MaterialIcons name="notifications-none" style={styles.icons3} size={32} color="#9B9B7A" marginStart={40}/>
                            </TouchableOpacity>
                            
                    
                           
                            <TouchableOpacity>
                                <Feather name="home" style={styles.icons4} size={27} color="#9B9B7A"   onPress={() => navigation.navigate("squares")}/>
                              
                            </TouchableOpacity>
                            
                           
                            </View>

                   
                            <SvgComponent style={styles.navbar2}/>
            </View>
        );
    

    
}  
const styles = StyleSheet.create({
    
    container: { 
        flexDirection: 'row', 
        flex: 1,  
        justifyContent: 'center',  
       alignItems: 'center' ,
        position:"absolute",
        width:Dimensions.get('window').width,
       zIndex:10,
       bottom:0,
     },
    navbar2:
    {
    // right:10,
     bottom:-9, //Here is the trick
     position:"absolute",
     width:Dimensions.get('window').width,
    
     
     zIndex:1, 
     shadowOpacity: 1,
     shadowColor:"#707070",
     shadowRadius: 4,
     
     shadowOffset: {
 
         height: 3, width: 2
     }, 
    },
navbar:{
  
   alignItems:"center",
   //flexDirection: ('row'),
  // 
  //padding:10,
    position: 'absolute',
    //backgroundColor: '#FFFFFF',
    borderTopRightRadius:180,
    borderTopLeftRadius:30,
   zIndex:10,
    justifyContent: 'center',
    bottom: 0,
    width: 375,
    height: 63.26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 25
  
},

addButton:{

    alignItems: 'center' ,
  
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#9B9B7A',
    justifyContent: 'center',
    width: 60,
    height: 60,
   //borderBottomWidth:50,
    borderRadius: 50,
  
    //flexDirection: 'row',
    right:153,
    bottom:32,
    zIndex: 10,
    shadowOpacity: 0.50 ,
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
 
  left:9,
  right:10,
  bottom:6,
},
    icons2:{
       // flexGrow: 5,
     right:30,
     
     
    },

    icons3:{
        // flexGrow: 5,
      left:30,
     },
 icons1:{
    // right:44,
 },
 

});


