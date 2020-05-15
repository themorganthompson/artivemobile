/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StatusBar, View, Text} from 'react-native';
import Menu from '../assets/static/menu';

export default class header extends Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor="#212121" barStyle="light-content" />
        <View
          style={{
            height: 110,
            color: 'white',
            backgroundColor: '#f8504d',
            justifyContent: 'center',
            overflow: 'hidden',
            paddingBottom: 0,
          }}>
          <Menu
            fill="white"
            style={{
              width: 28,
              height: 28,
              position: 'absolute',
              marginRight: 10,
              right: 10,
              color: '#212121',
            }}
          />
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              paddingLeft: 20,
              color: 'white',
              marginBottom: 0,
              marginTop: 58,
            }}>
            {this.props.title}
          </Text>
        </View>
      </>
    );
  }
}