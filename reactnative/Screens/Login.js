import React, { Component } from "react";
import validator from "validator";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Header from "../Components/header";
import Circle from "../Components/circle";

export default class Screen extends Component {
  state = {
    phone: "",
    verificationcode: "",
    backgroundColor: "#212121",
    phonecolor: "#212121",
    verificationcodecolor: "#212121",
    loading: false,
    error: false,
    apiError: null
  };

  onFocus = () => {
    this.setState({ backgroundColor: "#61dbfb", phonecolor: "blue" });
  };
  onBlur = () => {
    this.setState({ backgroundColor: "gray", phonecolor: "black" });
  };
  onFocus1 = () => {
    this.setState({ verificationcodecolor: "#61dbfb" });
  };
  onBlur1 = () => {
    this.setState({ verificationcodecolor: "gray" });
  };

  validatePhone = (phone) => {
    this.setState({ phone: phone });
    if (validator.isMobilePhone(phone) && !phone.includes("+") === false) {
      this.setState({ error: false });
      this.setState({ apiError: null });
    } else {
      this.setState({ error: true });
    }
  };


  handleSubmit = () => {
    if (this.state.verificationcode) {
      this.setState({ loading: "true" });
      const credential = firebase.auth.PhoneAuthProvider.credential(
        confirmationResult,
        verificationCode
      );
      myFirebase
        .auth()
        .signInWithCredential(credential)
        .then(function (result) {
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          setApiError(error.code);
        });
    } else {
      setLoading(true);
      setError(false);
      if (validator.isMobilePhone(phone)) {
        myFirebase
          .auth()
          .signInWithPhoneNumber(phone, appVerifier)
          .then(function (confirmationResult) {
            setVerifyCodeFlag(true);
            setLoading(false);
            setError(false);
            setConfirmationResult(confirmationResult.verificationId);
          })
          .catch(function (error) {
            setLoading(false);
            setApiError(error.code);
          });
      }
    }
  };

  render() {
    return (
      <>
        <Header />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                marginBottom: 10,
                marginRight: "auto",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={{ marginLeft: 10, fontSize: 16, color: "gray" }}
                onChangeText={(phone) => validatePhone(phone)}
                value={this.state.phone}
                placeholder={"Phone"}
                keyboardType="numeric"
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
                keyboardType="phone-pad"
                placeholderTextColor={"gray"}
                onFocus={() => this.onFocus1()}
                onBlur={() => this.onBlur1()}
              />
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textstyle}>LOGIN</Text>
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
