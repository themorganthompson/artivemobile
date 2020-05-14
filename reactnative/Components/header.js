import React, { Component } from "react";
import { StatusBar, View } from "react-native";

export default class header extends Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor="#212121" barStyle="light-content" />
        <View
          style={{
            height: 30,
            color: "white",
            backgroundColor: "#212121",
            justifyContent: "center",
            overflow: "hidden",
          }}
        />
      </>
    );
  }
}
