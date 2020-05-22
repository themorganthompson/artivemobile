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
import { View, Text, TouchableOpacity, Button } from "react-native";
import Trophy from "./assets/static/trophy";
import Camera from "./assets/static/camera";
import Home from "./assets/static/home";
import ContestsComponent from "./Screens/Contests";
import GestureRecognizer, {
  swipeDirections,
} from "./assets/static/gestures";
import { Creators } from "./Components/redux";

const Tab = createBottomTabNavigator();

function MyTabs(props) {
  const { dispatch } = props;
  const [greetingStatus, displayGreeting] = useState(false);
  const [ratePost, setRatePost] = useState({});
  const [currentRoute, setCurrentRoute] = useState();
  const [nextRoute, setNextRoute] = useState();
  const [navigation, setNavigation] = useState();
  const [gestureName, setGestureName] = useState("none");
  const [user, setUser] = useState({});

  const togglePost = (post) => {
    setRatePost(post);
    displayGreeting(!greetingStatus);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onAuthStateChanged = (requestUser) => {
    if (requestUser) {
      setUser(requestUser);
    } else {
    }
  };

  const onSwipe = (gestureName) => {
    if (gestureName === 'SWIPE_LEFT') {
      if (currentRoute == "Home") {
        navigation.navigate("Post");
      }
      if (currentRoute == "Post") {
        navigation.navigate("Contests");
      }
    }
    if (gestureName === 'SWIPE_RIGHT') {
      if (currentRoute == "Contests") {
        navigation.navigate("Post");
      }
      if (currentRoute == "Post") {
        navigation.navigate("Home");
      }
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    // eslint-disable-next-line no-shadow
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
              <View style={{ display: !greetingStatus ? "flex" : "none" }}>
                {route.name === "Home" || route.name === "Login" ? (
                  <Home fill={isFocused ? "#FBC02D" : "#222"} />
                ) : route.name === "Post" ? (
                  <Camera fill={isFocused ? "#FBC02D" : "#222"} />
                ) : route.name === "Contests" ? (
                  <Trophy fill={isFocused ? "#FBC02D" : "#222"} />
                ) : null}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 10,
  };

  function HomeScreen() {
    return (
      <>
        <GestureRecognizer
          onSwipe={(direction) => onSwipe(direction)}
          config={config}
          style={{
            flex: 1,
          }}
        >
          <HomeComponent
            togglePost={(post) => togglePost(post)}
            user={user}
            {...props}
          />
        </GestureRecognizer>
      </>
    );
  }

  function PostScreen() {
    return (
      <>
        <GestureRecognizer
          onSwipe={(direction) => onSwipe(direction)}
          config={config}
          style={{
            flex: 1,
          }}
        >
          <Post {...props} />
        </GestureRecognizer>
      </>
    );
  }

  function ContestsScreen() {
    return (
      <>
        <GestureRecognizer
          onSwipe={(direction) => onSwipe(direction)}
          config={config}
          style={{
            flex: 1,
          }}
        >
          <ContestsComponent {...props} />
        </GestureRecognizer>
      </>
    );
  }

  return (
    <NavigationContainer>
     {user.uid !== undefined ? (
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Post" component={PostScreen} />
          <Tab.Screen name="Contests" component={ContestsScreen} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator tabBar={(props) => <View />}>
            <Tab.Screen name="Login" component={Login} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}


export default MyTabs;
