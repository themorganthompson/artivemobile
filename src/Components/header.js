import React,{Component} from 'react'
import {View,Text,Image} from 'react-native'
import ImportedImages from '../Theme/Images'


export default class header extends Component {
    render(){
        return(
            <View style={{height:50,backgroundColor:'black',justifyContent:'center'}}>
            <Image style={{marginLeft:10}} source={ImportedImages[1]} />
        </View>

        )
    }
}