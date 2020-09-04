/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { connect } from "react-redux";
import Login from "./Screens/Login";
import Post from "./Screens/Post";
import SplashScreen from 'react-native-splash-screen';
import HomeComponent from "./Screens/Home";
import { View, Text, TouchableOpacity, Button, useWindowDimensions } from "react-native";
import Trophy from "./assets/static/trophy";
import Camera from "./assets/static/camera";
import Home from "./assets/static/home";
import ContestsComponent from "./Screens/Contests";
import { Creators } from "./Components/redux";

const Tab = createBottomTabNavigator();

function MyTabs(props) {
  const { dispatch } = props;
  const [greetingStatus, setGreetingStatus] = useState(false);
  const [ratePost, setRatePost] = useState({});
  const [currentRoute, setCurrentRoute] = useState();
  const [nextRoute, setNextRoute] = useState();
  const [navigation, setNavigation] = useState();
  const [gestureName, setGestureName] = useState("none");
  const [user, setUser] = useState({});
  const height = useWindowDimensions().height;

  const togglePost = (post) => {
    setRatePost(post);
    setGreetingStatus(!greetingStatus);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onAuthStateChanged = (requestUser) => {
    if (requestUser) {
      setUser(requestUser);
    } else {
      if (!user.uid) {
        setGreetingStatus(true);
      } else {
        setGreetingStatus(false);
      }
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    // eslint-disable-next-line no-shadow
    if (!user.uid) {
      setGreetingStatus(true);
    } else {
      setGreetingStatus(false);
    }
    auth().onAuthStateChanged((thisuser) => {
      onAuthStateChanged(thisuser);
    });
  }, [onAuthStateChanged, user]);

  function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: "row" }}>
        {state.routes.map((route, index) => {
          setNavigation(navigation);
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          if (isFocused) setCurrentRoute(route.name);

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
            route.name !== "Login" ?
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
                  height: height < 812 ? 40 : 60,
                  width: 100,
                  paddingLeft: 50,
                  paddingTop: 20,
                  marginTop: 0,
                  marginBottom: height < 812 ? 0 : 20,
                  paddingRight: 50,
                  textAlign: "center",
                  alignItems: "center",
                  paddingBottom: height < 812 ? 40 : 50,
                }}
              >
                <View style={{ display: !greetingStatus ? "flex" : "none", marginTop: 0 }}>
                  {route.name === "Home" ? (
                    <Home fill={isFocused ? "#FBC02D" : "#222"} />
                  ) : route.name === "Post" ? (
                    <Camera fill={isFocused ? "#FBC02D" : "#222"} />
                  ) : route.name === "Contests" ? (
                    <Trophy fill={isFocused ? "#FBC02D" : "#222"} />
                  ) : null}
                </View>
              </TouchableOpacity> : null
          );
        })}
      </View>
    );
  }

  function HomeScreen() {
    return (
      <>
        <HomeComponent
          navigation={navigation}
          togglePost={(post) => togglePost(post)}
          user={user}
          {...props}
        />
      </>
    );
  }

  function PostScreen() {
    return (
      <>
        <Post {...props} />
      </>
    );
  }

  function ContestsScreen() {
    return (
      <>
        <ContestsComponent {...props} />
      </>
    );
  }

  function LoginScreen() {
    return (
      <>
        <Login height={height} {...props} />
      </>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>

        {!user.uid ?
          <Tab.Screen name="Login" component={LoginScreen} /> :
          <Tab.Screen name="Home" component={HomeScreen} />}
        <Tab.Screen name="Post" component={PostScreen} />
        <Tab.Screen name="Contests" component={ContestsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MyTabs;