

import React,{Component} from 'react'
import {View,Text} from 'react-native'

import { createAppContainer } from 'react-navigation';

import { createBottomTabNavigator } from 'react-navigation-tabs';


import screen1 from './src/Screens/Screen'
import Home from './src/Screens/Home'
import InfromationScreen from './src/Screens/InformationScreen'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

 export const BottomTabNavigator = createBottomTabNavigator({
    Home:{screen:Home,
      navigationOptions:{
        tabBarIcon:({tintColor})=>(
          <View>
            <FontAwesome   name={'home'} color={'white'} size={22}/>
            <Text style={{color:tintColor,textAlign:'center',fontSize:14,fontWeight:'bold'}}>.</Text>

           </View>
        )
      }
     
},
InfromationScreen:{screen:InfromationScreen,
  navigationOptions:{
    tabBarIcon:({tintColor})=>(
      <View>
        <FontAwesome   name={'info-circle'} color={'white'} size={22}/>
        <Text style={{color:tintColor,textAlign:'center',fontSize:14,fontWeight:'bold'}}>.</Text>

       </View>
    )
  }
  },

    screen1:{screen:screen1,
      navigationOptions:{
        tabBarIcon:({tintColor})=>(
          <View>
            <FontAwesome   name={'user-circle-o'} color={'white'} size={22}/>
            <Text style={{color:tintColor,textAlign:'center',fontSize:14,fontWeight:'bold'}}>.</Text>
           </View>
        )
      }
    
 
 }
},{
   initialRouteName:'Home',
   tabBarLabel:() => {return null},

   tabBarOptions: {
    showLabel :false,
    activeTintColor: 'green',
    inactiveTintColor: 'black',
    style: {
     height: 65,
     backgroundColor: 'black'
    }
  }
 })
    
  



export default createAppContainer(BottomTabNavigator);
