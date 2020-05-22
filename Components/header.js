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
  useWindowDimensions,
} from "react-native";
import { Creators } from "../Components/redux";
import Menu from "../assets/static/menu";
import Logo from "../assets/static/logo";
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
  const height = useWindowDimensions().height;

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
      <StatusBar backgroundColor="#FBC02D" barStyle="light-content" />
      <View
        style={{
          height: height < 812 ? 70 : 110,
          color: "white",
          backgroundColor: "#FBC02D",
          justifyContent: "center",
          overflow: "hidden",
          paddingBottom: 0,
        }}
      >
        <View
          style={{
            color: "white",
            marginBottom: 0,
            marginTop: height < 812 ? 22 : 62,
            width: 85,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Logo fill="white" {...props} />
        </View>
        </View>
        {user ? (
          <TouchableOpacity
            onPress={() => toggleModal(!isModalVisible)}
            style={{ position: "absolute",height:50, width:100, 
            top: height < 812 ? 38 : 76, 
            right: -58, zIndex: 1240}}
          >
            <Menu fill={"white"} onPress={() => toggleModal(!isModalVisible)} />
          </TouchableOpacity>
        ) : null}
      <Modal
        coverScreen={true}
        isVisible={isModalVisible}
        hasBackdrop={true}
        deviceWidth={window.width}
        style={{ margin: 0}}
      >
        <View
          style={{
            height: 600,
            borderRadius: 12,
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
            }}
          >
            <Collapse
              fill="#FBC02D"
              width={28}
              style={{ marginLeft: 12.5 }}
              onPress={() => toggleModal(!isModalVisible)}
            />
          </View>
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            {user ? user.phoneNumber : ""}
            <Text style={{color: "blue"}}>{height}</Text>
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
