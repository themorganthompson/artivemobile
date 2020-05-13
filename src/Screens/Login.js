import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Header from "../Components/header";
import Circle from "../Components/circle";

export default class Screen extends Component {
  state = {
    email: "",
    verificationcode: "",
    backgroundColor: "#212121",
    phonecolor: "#212121",
    verificationcodecolor: "#212121",
  };

  onFocus = () => {
    this.setState({ backgroundColor: "blue", phonecolor: "blue" });
  };
  onBlur = () => {
    this.setState({ backgroundColor: "gray", phonecolor: "black" });
  };
  onFocus1 = () => {
    this.setState({ verificationcodecolor: "blue" });
  };
  onBlur1 = () => {
    this.setState({ verificationcodecolor: "gray" });
  };

  render() {
    return (
      <>
        <Header />
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <Circle />
          <View
            style={{
              height: 50,
              width: "70%",
              borderColor: this.state.backgroundColor,
              borderWidth: 1,
              borderRadius: 3,
              marginLeft: "auto",
              marginBottom: 20,
              marginRight: "auto",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{ marginLeft: 10, fontSize: 16, color: "gray" }}
              onChangeText={(phone) => this.setState({ phone })}
              value={this.state.phone}
              placeholder={"Phone"}
              keyboardType="phone-pad"
              placeholderTextColor={"gray"}
              onFocus={() => this.onFocus()}
              onBlur={() => this.onBlur()}
            />
          </View>
          <View
            style={{
              height: 50,
              width: "70%",
              marginTop: 0,
              marginBottom: 20,
              borderColor: this.state.verificationcodecolor,
              borderWidth: 1,
              borderRadius: 3,
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={{ marginLeft: 10, fontSize: 16, color: "gray" }}
              onChangeText={(verificationcode) =>
                this.setState({ verificationcode })
              }
              value={this.state.verificationcode}
              placeholder={"Verification Code"}
              placeholderTextColor={"gray"}
              onFocus={() => this.onFocus1()}
              onBlur={() => this.onBlur1()}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textstyle}>LOGIN</Text>
          </TouchableOpacity>
        </SafeAreaView>
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
    backgroundColor: "white",
    width: 70,
    height: 25,
    top: 15,
    marginLeft: 20,
    flexDirection: "row",
    zIndex: 10,
  },
  emailicon: { alignItems: "center", justifyContent: "center" },
  emailupperboxtextcontainer: {
    marginLeft: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  verificationcodecontainer: {
    marginTop: 0,
    height: 100,
    marginHorizontal: 20,
  },
  verificationcodelabel: {
    backgroundColor: "white",
    width: 140,
    height: 30,
    top: 15,
    marginLeft: 20,
    flexDirection: "row",
    zIndex: 10,
  },
  verificationcodelabelIcon: { alignItems: "center", justifyContent: "center" },
  verificationcodecontainertext: {
    marginLeft: 5,
    display: "flex",
    marginTop: 0,
    alignItems: "center",
    borderRadius: 3,
    justifyContent: "center",
  },
  button: {
    marginLeft: "auto",
    marginRight: "auto",
    height: 50,
    width: "70%",
    backgroundColor: "#f8504d",
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textstyle: { fontSize: 14, color: "white", fontWeight: "bold" },
});
