/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import Login from "./Screens/Login";
import Post from "./Screens/Post";
import HomeComponent from "./Screens/Home";
import { View, Text, TouchableOpacity } from "react-native";
import Trophy from "./assets/static/trophy";
import Camera from "./assets/static/camera";
import Home from "./assets/static/home";
import ContestsComponent from "./Screens/Contests";
import { Creators } from "./Components/redux";

const Tab = createBottomTabNavigator();

function MyTabs(props) {
  const { dispatch } = props;
  const [greetingStatus, displayGreeting] = useState(false);
  const [ratePost, setRatePost] = useState({});
  const [user, setUser] = useState(props.user);

  const togglePost = (post) => {
    setRatePost(post);
    displayGreeting(!greetingStatus);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onAuthStateChanged = (requestUser) => {
    if (requestUser) {
      dispatch(Creators.success(requestUser));
      setUser(requestUser);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-shadow
    auth().onAuthStateChanged((thisuser) => {
      onAuthStateChanged(thisuser);
    });
  }, [onAuthStateChanged, props.user, user]);

  function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: "row" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ["selected"] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                height: 60,
                width: 100,
                paddingLeft: 50,
                paddingTop: 20,
                marginBottom: 20,
                paddingRight: 50,
                textAlign: "center",
                alignItems: "center",
                paddingBottom: 50,
              }}
            >
              <View  style={{display: !greetingStatus ? "flex" : "none"}}>
                {route.name === "Home" || route.name === "Login" ? (
                  <Home fill={isFocused ? "#f8504d" : "#222"} />
                ) : route.name === "Post" ? (
                  <Camera fill={isFocused ? "#f8504d" : "#222"} />
                ) : route.name === "Contests" ? (
                  <Trophy fill={isFocused ? "#f8504d" : "#222"} />
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  function HomeScreen() {
    return (
      <>
        <HomeComponent togglePost={(post) => togglePost(post)} user={user}/>
      </>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Post" component={Post} />
          <Tab.Screen name="Contests" component={ContestsComponent} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator tabBar={(props) => <View />}>
          <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

function mapStateToProps(state) {
  return {
    user: state,
    fetching: state.fetching,
    error: state.error,
  };
}

export default connect(mapStateToProps)(MyTabs);
