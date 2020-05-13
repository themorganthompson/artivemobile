import React, {Component} from 'react'
import {View,Text,SafeAreaView,TextInput,TouchableOpacity,StyleSheet} from 'react-native'



import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import Header from '../Components/header'
import Logo from '../Components/logo'

export default class Screen extends Component{
 
   state={
          email:'',
          verificationcode:'',
          backgroundColor:'gray',
          phonecolor:'black',
          verificationcodecolor:'gray'
        }


    onFocus = () => { this.setState({backgroundColor: 'blue',phonecolor:'blue', })  };
    onBlur = () => {this.setState({backgroundColor: 'gray', phonecolor:'black', })  };
    onFocus1 = () => {this.setState({verificationcodecolor: 'blue',}) };
    onBlur1 = () => {this.setState({verificationcodecolor: 'gray', })  };


    render(){
       return(
            
            <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
               <Header/>
               <Logo/>
               

                <View style={styles.emailcontainer}>

                    <View style={styles.emailuppertextbox}>
                        <View style={styles.emailicon}>
                            <FontAwesome name={'mobile-phone'} size={14} color={'black'} />
                        </View>
                        <View style={styles.emailupperboxtextcontainer}>
                            <Text style={{color:this.state.phonecolor}}>Phone</Text>
                        </View>
                    </View>

                    <View  style={{ height: 60, borderColor:this.state.backgroundColor, borderWidth: 1,justifyContent:'center' }}>
                    <TextInput   style={{marginLeft:10,fontSize:16,color:'gray'}}   onChangeText={email => this.setState({email})}
                                 value={this.state.email}  placeholder={'Enter number or Email address'}
                                 placeholderTextColor={'gray'}  onFocus={ () => this.onFocus() }    onBlur={ () => this.onBlur() }
                     />
                    </View>
                </View>


                <View style={styles.verificationcodecontainer}>
                   <View style={styles.verificationcodelabel}>
                        <View style={styles.verificationcodelabelIcon}>
                            <MaterialIcons  name={'verified-user'} size={14} color={'black'}/>
                        </View>
                        <View style={styles.verificationcodecontainertext}>
                            <Text style={{color:this.state.verificationcodecolor}}>Verification code</Text>
                        </View>
                    </View>
                    <View  style={{ height: 60, borderColor:this.state.verificationcodecolor, borderWidth: 1 ,justifyContent:'center'}}>
                    <TextInput style={{marginLeft:10,fontSize:16,color:'gray'}} onChangeText={verificationcode => this.setState({verificationcode})}
                               value={this.state.verificationcode}   placeholder={'Enter Verification Code'}
                               placeholderTextColor={'gray'}  onFocus={ () => this.onFocus1() } onBlur={ () => this.onBlur1() }
                    />
                    </View>
                </View>


                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textstyle}>Login</Text>
                </TouchableOpacity>


                


                

            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create(
    {
            emailcontainer:{marginTop:5,height:90,marginHorizontal:20},
            emailuppertextbox:{backgroundColor:'white',width:60,height:30,top:15,marginLeft:20,flexDirection:'row',zIndex:10},
            emailicon:{alignItems:'center',justifyContent:'center'},
            emailupperboxtextcontainer:{marginLeft:5,display:'flex',alignItems:'center',justifyContent:'center'},
            verificationcodecontainer:{marginTop:10,height:100,marginHorizontal:20,},
            verificationcodelabel:{backgroundColor:'white',width:140,height:30,top:15,marginLeft:20,flexDirection:'row',zIndex:10},
            verificationcodelabelIcon:{alignItems:'center',justifyContent:'center'},
            verificationcodecontainertext:{marginLeft:5,display:'flex',alignItems:'center',justifyContent:'center'},
            button:{marginHorizontal:120,marginTop:10,height:70,width:150,backgroundColor:'red',display:'flex',alignItems:'center',justifyContent:'center'},
            textstyle:{fontSize:14,color:'white'}
    }
)