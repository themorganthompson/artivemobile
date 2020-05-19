/* eslint-disable react-native/no-inline-styles */
import React, { Component } from "react";
import auth from "@react-native-firebase/auth";
import validator from "validator";
import { connect } from "react-redux";
import { Creators } from "../Components/redux";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Link,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import Arrow from "../assets/static/arrow";
import Dot from "../assets/static/dot";
import VerificationCodeComponent from "./VerificationCode.js";
import Header from "../Components/header";
import Circle from "../Components/circle";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    phone: "",
    verificationcode: "",
    backgroundColor: "white",
    phonecolor: "#8e8e8e",
    verificationcodecolor: "white",
    loading: false,
    verificationSent: false,
    confirmCode: null,
    error: false,
    appVerifier: null,
    apiError: null,
    initializing: true,
    user: {},
    ref: {},
  };

  onAuthStateChanged(user) {
    this.setState({ user: user });
    if (this.state.user) {
      Creators.success(user);
      this.setState({ initializing: false });
    }
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      this.onAuthStateChanged(user);
    });
  }

  componentDidUpdate() {
    if (this.state.user) {
      Creators.success(this.state.user);
    }
  }

  onFocus = () => {
    this.setState({ backgroundColor: "white", phonecolor: "#f8504d" });
  };
  onBlur = () => {
    this.setState({ backgroundColor: "white", phonecolor: "#f8504d" });
  };
  onFocus1 = () => {
    this.setState({ verificationcodecolor: "white" });
  };
  onBlur1 = () => {
    this.setState({ verificationcodecolor: "white" });
  };

  validatePhone = (phone) => {
    this.setState({ phone: phone });
    if (validator.isMobilePhone(phone) && phone.length === 10) {
      this.setState({ error: false });
      this.setState({ apiError: null });
    } else {
      this.setState({ error: true });
    }
  };

  async handleSubmit() {
    let phone = "+1" + this.state.phone;
    const confirmation = await auth().signInWithPhoneNumber(phone);
    this.setState({ confirmCode: confirmation });
  }

  async confirmCode() {
    try {
      await this.state.confirmCode.confirm(this.state.verificationcode);
    } catch (error) {
      this.setState({ error: true });
      alert(error);
      this.setState({ verificationcodecolor: "#f8504d" });
    }
  }

  render() {
    return (
      <>
        <Header title={"Get Started"} />
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
          style={{ backgroundColor: "white" }}
        >
          <SafeAreaView
            style={{ flex: 1 }}
            style={{ backgroundColor: "white", height: 1800 }}
          >
            <Circle />
            {!this.state.confirmCode ? (
              <>
                <Text
                  style={{
                    fontSize: 18,
                    margin: 0,
                    padding: 0,
                    textAlign: "center",
                  }}
                >
                  Enjoy a <Text style={{ fontWeight: "700" }}>no-bullshit</Text>{" "}
                  creative
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 20,
                    padding: 0,
                    textAlign: "center",
                  }}
                >
                  experience today!
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={{
                    fontSize: 18,
                    margin: 0,
                    padding: 0,
                    textAlign: "center",
                  }}
                >
                  Enter the{" "}
                  <Text style={{ fontWeight: "700" }}>6 digit code</Text> sent
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    marginBottom: 0,
                    padding: 0,
                    textAlign: "center",
                  }}
                >
                  to your mobile phone.
                </Text>
              </>
            )}

            {!this.state.confirmCode ? (
              <View
                style={{
                  height: 50,
                  width: "85%",
                  backgroundColor: "white",
                  borderColor: this.state.phonecolor,
                  borderWidth: 1,
                  color: "black",
                  borderRadius: 3,
                  marginTop: 5,
                  marginLeft: "auto",
                  marginBottom: 10,
                  marginRight: "auto",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    width: 24,
                    height: 23,
                    left: 10,
                    top: 22.5,
                    fontSize: 18,
                    fontWeight: "700",
                    position: "relative",
                    marginRight: 15,
                    color: "#DD5A5A",
                  }}
                >
                  + 1{" "}
                </Text>
                <TextInput
                  style={{
                    marginLeft: 10,
                    fontSize: 18,
                    color: "black",
                    paddingLeft: 34,
                    paddingBottom: 20,
                  }}
                  onChangeText={(phone) => this.validatePhone(phone)}
                  value={this.state.phone}
                  placeholder="Mobile Phone Number"
                  keyboardType="number-pad"
                  placeholderTextColor={"black"}
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
                  width: "70%",
                  marginTop: 0,
                  marginBottom: 20,
                  color: "black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  justifyContent: "center",
                }}
              >
                <VerificationCodeComponent
                  onChangeText={(value) => {
                    this.setState({ verificationcode: value });
                  }}
                  {...this.props}
                />
              </View>
            ) : (
              <View />
            )}
            <TouchableOpacity
              style={{
                backgroundColor:
                  this.state.error || this.state.phone === ""
                    ? "#8e8e8e"
                    : "#DD5A5A",
                ...styles.button,
              }}
              disabled={this.state.error || this.state.phone === ""}
              onPress={() =>
                this.state.confirmCode
                  ? this.confirmCode()
                  : this.handleSubmit()
              }
              id="submit-account"
            >
              <Text style={styles.textstyle}>
                {this.state.confirmCode ? (
                  <Arrow fill="white" style={{ marginTop: 25 }} />
                ) : this.state.error || this.state.phone === "" ? (
                  <Arrow fill="black" style={{ marginTop: 25 }} />
                ) : (
                  <Arrow fill="white" style={{ marginTop: 25 }} />
                )}
              </Text>
            </TouchableOpacity>
            <Text style={styles.condition}>
              By signing up, you agree to our{" "}
              <Text style={styles.link}>Terms & Conditions</Text>.
            </Text>
            <View style={styles.dots}>
              <Dot fill={!this.state.confirmCode ? "#DD5A5A" : "#eba4a5"} />
              <Dot
                style={styles.dotRight}
                fill={this.state.confirmCode ? "#DD5A5A" : "#eba4a5"}
              />
            </View>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    fetching: state.fetching,
    error: state.error,
  };
}

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
  dots: {
    display: "flex",
    marginLeft: "auto",
    padding: 5,
    marginRight: "auto",
    paddingLeft:6,
    width: 40,
  },
  dotRight: {
    marginLeft: 14,
    marginTop: -10,
  },
  link: {
    color: "#DD5A5A",
    fontWeight: "500",
  },
  condition: {
    padding: 10,
    fontSize: 12,
    marginTop: 15,
    textAlign: "center",
  },
  emailcontainer: {
    marginTop: 25,
    height: 90,
    marginHorizontal: 20,
    marginBottom: 0,
    padding: 0,
  },
  emailuppertextbox: {
    backgroundColor: "#ebebeb",
    width: 80,
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
    paddingBottom: 5,
    paddingTop: 10,
    height: 50,
    width: "85%",
    borderRadius: 6,
    display: "flex",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textstyle: { fontSize: 14, color: "white", fontWeight: "bold" },
});
