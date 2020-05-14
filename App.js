import React, { Component } from "react";
import { View, Text } from "react-native";

import { createAppContainer } from "react-navigation";

import { createBottomTabNavigator } from "react-navigation-tabs";

import login from "./src/Screens/Login";
import Home from "./src/Screens/Home";
import Information from "./src/Screens/Information";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const BottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <FontAwesome name={"home"} color={"white"} size={22} />
            <Text
              style={{
                color: tintColor,
                textAlign: "center",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              .
            </Text>
          </View>
        ),
      },
    },
    InfromationScreen: {
      screen: Information,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <FontAwesome name={"info-circle"} color={"white"} size={22} />
            <Text
              style={{
                color: tintColor,
                textAlign: "center",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              .
            </Text>
          </View>
        ),
      },
    },

    screen1: {
      screen: login,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View>
            <FontAwesome name={"user-circle-o"} color={"white"} size={19} />
            <Text
              style={{
                color: tintColor,
                textAlign: "center",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              .
            </Text>
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: "Home",
    tabBarLabel: () => {
      return null;
    },

    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#61dbfb",
      inactiveTintColor: "#212121",
      style: {
        height: 60,
        paddingTop: 10,
        backgroundColor: "#212121",
      },
    },
  }
);

export default createAppContainer(BottomTabNavigator);
