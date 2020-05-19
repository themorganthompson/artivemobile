/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
  Link,
} from "react-native";

import Menu from "../assets/static/menu";
import Collapse from "../assets/static/collapse";
/* eslint-disable react-native/no-inline-styles */
import auth from "@react-native-firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Modal from "react-native-modal";

const Tab = createBottomTabNavigator();
const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

function Head(props) {
  const { dispatch } = props;
  const [dimensions, setDimensions] = useState({ window, screen });
  const [greetingStatus, displayGreeting] = useState(false);
  const [ratePost, setRatePost] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setUser] = useState(props.user);

  const togglePost = (post) => {
    setRatePost(post);
    displayGreeting(!greetingStatus);
  };

  const Logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log("we out");
      })
      .catch((error) => {});
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

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
            textAlign: "center",
            marginTop: 64,
          }}
        >
          Artive
        </Text>

        <Menu
          onPress={() => toggleModal()}
          fill={"white"}
          style={{ position: "absolute", right: 22, zIndex: 1240, top: 76 }}
        />
      </View>
      <Modal
        coverScreen={true}
        isVisible={isModalVisible}
        hasBackdrop={false}
        deviceWidth={window.width}
        style={{ margin: 0 }}
      >
        <View
          style={{
            height: 600,
            backgroundColor: "white",
            width: "100%",
            marginTop: 880,
          }}
        >
          <View
            onPress={toggleModal}
            style={{
              height: 45,
              width: "100%",
              borderBottomColor: "#d7d7d7",
              borderBottomWidth: 0.7,
            }}
          >
            <Collapse
              fill="#f8504d"
              width={28}
              style={{ marginLeft: 12.5 }}
              onPress={toggleModal}
            />
          </View>
          <Text style={{ textAlign: "center", marginTop: 20}}>
              {props.user ? props.user.phoneNumber : "Logged Out"}
            </Text>
          <Button title="Logout" onPress={() => Logout()} />
        </View>
      </Modal>
    </>
  );
}

export default class header extends Component {
  render() {
    return (
      <>
        <Head {...this.props} />
      </>
    );
  }
}
