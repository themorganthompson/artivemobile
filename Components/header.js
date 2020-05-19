/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import { StatusBar, View, Text, Image } from "react-native";
import Menu from "../assets/static/menu";

export default class header extends Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor="#DD5A5A" barStyle="light-content" />
        <View
          style={{
            height: 110,
            color: "white",
            backgroundColor: "#DD5A5A",
            justifyContent: "center",
            overflow: "hidden",
            paddingBottom: 0,
          }}
        >
          <Text
            style={{
              fontSize: 27,
              fontWeight: "400",
              // paddingLeft: 20,
              color: "white",
              marginBottom: 0,
              textAlign: 'center',
              marginTop: 64,
            }}
          >
            {this.props.user ? this.props.user.phoneNumber : "Logged Out"}
          </Text>
          <Menu fill={"white"} style={{position: 'absolute', right: 22, zIndex: 1240, top: 76}} />
        </View>
      </>
    );
  }
}
