import React, {Component} from 'react';
import auth from '@react-native-firebase/auth';
import validator from 'validator';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import Phone from '../assets/static/phone';
import Security from '../assets/static/security';
import Header from '../Components/header';
import Circle from '../Components/circle';

export default class Screen extends Component {
  state = {
    phone: '',
    verificationcode: '',
    backgroundColor: '"#212121',
    phonecolor: '"#212121',
    verificationcodecolor: '"#212121',
    loading: false,
    verificationSent: false,
    confirmCode: null,
    error: false,
    appVerifier: null,
    apiError: null,
    initializing: true,
    user: null,
  };

  onAuthStateChanged(user) {
    this.setState({ user: user });
    if (this.state.user) {
      this.props.navigation.navigate('Home');
      this.setState({initializing: false});
    }
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      this.onAuthStateChanged(user);
   });
  }

  onFocus = () => {
    this.setState({backgroundColor: '#61dbfb', phonecolor: 'blue'});
  };
  onBlur = () => {
    this.setState({backgroundColor: 'gray', phonecolor: 'black'});
  };
  onFocus1 = () => {
    this.setState({verificationcodecolor: '#61dbfb'});
  };
  onBlur1 = () => {
    this.setState({verificationcodecolor: 'gray'});
  };

  validatePhone = phone => {
    this.setState({phone: phone});
    if (validator.isMobilePhone(phone) && phone.length === 10) {
      this.setState({error: false});
      this.setState({backgroundColor: 'gray'});
      this.setState({apiError: null});
    } else {
      this.setState({backgroundColor: '#f8504d'});
      this.setState({error: true});
    }
  };

  async handleSubmit() {
    let phone = '+1' + this.state.phone;
    const confirmation = await auth().signInWithPhoneNumber(phone);
    this.setState({confirmCode: confirmation});
  };

  async confirmCode() {
    try {
      await this.state.confirmCode.confirm(this.state.verificationcode);
    } catch (error) {
      this.setState({error: true });
      this.setState({verificationcodecolor: '#f8504d'});
    }
  }

  render() {
    return (
      <>
        <Header title={'Login'} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Circle />
            {!this.state.confirmCode ? (
              <View
                style={{
                  height: 50,
                  width: '70%',
                  borderColor: this.state.backgroundColor,
                  borderWidth: 1,
                  borderRadius: 3,
                  marginTop: 0,
                  marginLeft: 'auto',
                  marginBottom: 10,
                  marginRight: 'auto',
                  justifyContent: 'center',
                }}>
                <Phone
                  style={{
                    width: 20,
                    height: 23,
                    left: 10,
                    top: 20,
                    position: 'relative',
                    marginRight: 15,
                    color: "#212121"
                  }}
                />
                <TextInput
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    color: '#212121',
                    paddingLeft: 28,
                    paddingBottom: 20,
                  }}
                  onChangeText={phone => this.validatePhone(phone)}
                  value={this.state.phone}
                  placeholder={'Mobile Phone Number'}
                  keyboardType="number-pad"
                  placeholderTextColor={'gray'}
                  onFocus={() => this.onFocus()}
                  onBlur={() => this.onBlur()}
                />
              </View>
            ) : (
              <View />
            )}
            {this.state.confirmCode ? (
              <View
                style={{
                  height: 50,
                  width: '70%',
                  marginTop: 0,
                  marginBottom: 20,
                  borderColor: this.state.verificationcodecolor,
                  borderWidth: 1,
                  borderRadius: 3,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  justifyContent: 'center',
                }}>
                <Security
                  style={{
                    width: 20,
                    height: 23,
                    left: 13,
                    top: 18,
                    position: 'relative',
                    marginRight: 15,
                  }}
                />
                <TextInput
                  style={{
                    marginLeft: 10,
                    fontSize: 16,
                    color: 'gray',
                    paddingLeft: 28,
                    paddingBottom: 15,
                  }}
                  onChangeText={verificationcode =>
                    this.setState({verificationcode})
                  }
                  value={this.state.verificationcode}
                  placeholder={'Verification Code'}
                  keyboardType="number-pad"
                  placeholderTextColor={'gray'}
                  onFocus={() => this.onFocus1()}
                  onBlur={() => this.onBlur1()}
                />
              </View>
            ) : (
              <View />
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.state.confirmCode
                  ? this.confirmCode()
                  : this.handleSubmit()
              }
              id="submit-account">
              <Text style={styles.textstyle}>
                {this.state.confirmCode ? 'VERIFY' : this.state.error ? 'INVALID PHONE' : 'LOGIN'}
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

const styles = StyleSheet.create({
  emailcontainer: {
    marginTop: 5,
    height: 90,
    marginHorizontal: 20,
    marginBottom: 0,
    padding: 0,
  },
  emailuppertextbox: {
    backgroundColor: 'white',
    width: 70,
    height: 25,
    top: 15,
    marginLeft: 20,
    flexDirection: 'row',
    zIndex: 10,
  },
  emailicon: {alignItems: 'center', justifyContent: 'center'},
  emailupperboxtextcontainer: {
    marginLeft: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationcodecontainer: {
    marginTop: 0,
    height: 100,
    marginHorizontal: 20,
  },
  verificationcodelabel: {
    backgroundColor: 'white',
    width: 140,
    height: 30,
    top: 15,
    marginLeft: 20,
    flexDirection: 'row',
    zIndex: 10,
  },
  verificationcodelabelIcon: {alignItems: 'center', justifyContent: 'center'},
  verificationcodecontainertext: {
    marginLeft: 5,
    display: 'flex',
    marginTop: 0,
    alignItems: 'center',
    borderRadius: 3,
    justifyContent: 'center',
  },
  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 50,
    width: '70%',
    backgroundColor: '#f8504d',
    borderRadius: 3,
    display: 'flex',
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textstyle: {fontSize: 14, color: 'white', fontWeight: 'bold'},
});
