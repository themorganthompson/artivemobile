import React, { Component, useState, useEffect, useRef } from "react";
import Header from "../Components/header";
import Moment from "moment";
import firebase from "../firebase/firebase";
import Collapse from "../assets/static/collapse";
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Actions,
  TouchableHighlight,
  Animated,
} from "react-native";

var styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 124095,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    marginTop: 66,
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: "#007AFF",
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    height: 650,
  },
});

const Posts = (props) => {
  let postz = [];
  let ordered = [];
  const [posts, setPosts] = useState([]);
  const [ratePost, setRatePost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const bounceValue = useRef(new Animated.Value(0)).current;
  const [toValue, setToValue] = useState(0);
  const [buttonText, setButtonText] = useState("Show Subview");
  const [hidden, setHidden] = useState(true);
  let preFetchTasks = [];

  const getPosts = async (mounted) => {
    await firebase
      .database()
      .ref("posts/")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          postz.push(snapshot.val());
          let keys = Object.keys(postz[0]);
          var result = Object.keys(postz[0]).map(function(key) {
            return [Number(key), postz[0][key]];
          });
          result.forEach(function(child, i) {
            ordered.push({
              index: i,
              key: keys[i],
              submitted: child[1].submitted,
              imageLink: child[1].imageLink,
              aperture: child[1].aperture,
              lens: child[1].lens,
              camera: child[1].camera,
              category: child[1].category,
              caption: child[1].caption,
              oneStar: child[1].oneStar,
              twoStars: child[1].twoStars,
              threeStars: child[1].threeStars,
              fourStars: child[1].fourStars,
              fiveStars: child[1].fiveStars,
              editorspick: child[1].editorspick,
              total: child[1].total,
              average:
                (5 * child[1].fiveStars +
                  4 * child[1].fourStars +
                  3 * child[1].threeStars +
                  2 * child[1].twoStars +
                  1 * child[1].oneStar) /
                (child[1].fiveStars +
                  child[1].fourStars +
                  child[1].threeStars +
                  child[1].twoStars +
                  child[1].oneStar),
            });
          });
          setPostLoading(false);
        }
      });

    if (mounted) {
      setPosts(ordered);
    }
    return ordered;
  };

  useEffect(
    () => {
      let mounted = true;
      getPosts(mounted);
      return () => (mounted = false);
    },
    // eslint-disable-next-line
    [posts]
  );

  const toggleSubview = (post) => {
    setHidden(!hidden);
    setRatePost(post);
    if (!hidden) {
      setToValue(0);
    } else {
      setToValue(650);
    }

    Animated.spring(bounceValue, {
      velocity: 3,
      tension: 2,
      friction: 8,
      toValue: toValue,
      useNativeDriver: true,
    }).start(() => {});
  };

  return (
    <>
      <SafeAreaView style={{ marginBottom: 140, zIndex: 1 }}>
        <ScrollView style={{ zIndex: 1 }}>
          {postLoading ? (
            <ActivityIndicator
              style={{ marginTop: "80%" }}
              size="large"
              color="#e93a50"
            />
          ) : posts.length > 0 ? (
            posts.map((post, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  underlayColor="#f0f0f0"
                  onPress={() => toggleSubview(post)}
                >
                  <Image
                    key={post.key}
                    style={{
                      height: 300,
                      width: "90%",
                      margin: 20,
                      borderRadius: 4,
                    }}
                    source={{
                      uri: post.imageLink,
                    }}
                  />
                </TouchableHighlight>
              );
            })
          ) : (
            <Text>There are no posts to display</Text>
          )}
        </ScrollView>
      </SafeAreaView>
      {!hidden ? (
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.subView,
              { transform: [{ translateY: bounceValue }] },
            ]}
          >
            <TouchableHighlight
              underlayColor="white"
              style={styles.button}
              onPress={() => {
                toggleSubview();
              }}
            >
              <>
                <Collapse fill="#f8504d" width={28} style={{ marginLeft: 8 }} />
                <Text
                  style={{
                    position: "absolute",
                    width: 100,
                    color: "#f8504d",
                    fontSize: 18,
                    top: 8,
                    marginLeft: "44%",
                    marginRight: "auto",
                  }}
                >
                  Critique
                </Text>
              </>
            </TouchableHighlight>
            <Text
              style={{
                marginLeft: 20,
                marginTop: 10,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {ratePost ? ratePost.caption : "A Caption Would Go Here"}
            </Text>
            <Text style={{ marginLeft: 20, fontSize: 11 }}>
              {ratePost
                ? Moment(new Date(ratePost.submitted)).format("MMMM D, YYYY")
                : null}{" "}
            </Text>
            {ratePost ? (
              <Image
                style={{
                  position: "absolute",
                  width: 132,
                  top: 58,
                  right: 20,
                  height: 88,
                }}
                source={{
                  uri: ratePost.imageLink,
                }}
              />
            ) : null}
          </Animated.View>
        </View>
      ) : null}
    </>
  );
};

export default class HomeComponent extends Component {
  render() {
    return (
      <>
        <Header title={"Home"} />
        <Posts />
      </>
    );
  }
}
