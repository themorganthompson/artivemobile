import React,{Component} from 'react'
import {View,Text,Image} from 'react-native'
import ImportedImages from '../Theme/Images'


export default class logo extends Component {
    render(){
        return(
            <View style={{marginTop:20,alignItems:'center',justifyContent:'center',display:'flex'}}>
            <Image  source={ImportedImages[2]}/>
        </View>

        )
    }
}