/* eslint-disable react-native/no-inline-styles */
import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
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
import { Creators } from "../Components/redux";
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
        setUser(null);
        props.user = null;
        Creators.failure(null);
        toggleModal();
      })
      .catch((error) => {
        setUser(null);
        props.user = null;
        Creators.failure(null);
        alert(error);
      });
  };

  const toggleModal = (flag) => {
    setIsModalVisible(flag);
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
            color: "white",
            marginBottom: 0,
            textAlign: "center",
            marginTop: 64,
          }}
        >
          {props.title ? props.title : "Artive" }
        </Text>
        </View>
        {user ? (
          <TouchableOpacity
            onPress={() => toggleModal(!isModalVisible)}
            style={{ position: "absolute",height:50, width:100, top: 76, right: -58, zIndex: 1240}}
          >
            <Menu fill={"white"} onPress={() => toggleModal(!isModalVisible)} />
          </TouchableOpacity>
        ) : null}
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
              onPress={() => toggleModal(!isModalVisible)}
            />
          </View>
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            {user ? user.phoneNumber : ""}
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
