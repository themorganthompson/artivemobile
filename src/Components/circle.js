import React, { Component } from "react";
import { View, Image } from "react-native";
import logo from "../../assets/static/nav.png";

export default class circle extends Component {
  render() {
    return (
      <View
        style={{
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
           width: "100%",
          borderRadius: "50%",
          display: "flex",
        }}
      >
			<Image
          style={{
            width: 80,
            height: 80,
            marginLeft: "auto",
            marginRight: "auto",
            alignContent: "center",
            borderRadius: 50,
            marginTop: 150,
            marginBottom: 30
          }}
          source={logo}
        />
      </View>
    );
  }
}
