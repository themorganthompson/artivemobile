import React, { Component, useState, useEffect, useRef } from "react";
import Header from "../Components/header";
import Moment from "moment";
import firebase from "../firebase/firebase";
import RateSheetComponent from "./RateSheet";
import FastImage from "react-native-fast-image";
import Collapse from "../assets/static/collapse";
import Modal from "react-native-modal";
import {
  ActivityIndicator,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableHighlight,
  AsyncStorage,
} from "react-native";

const Posts = (props) => {
  let postz = [];
  let ordered = [];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [critique, setCritique] = useState({});
  const [postLoading, setPostLoading] = useState(true);

  const getPosts = async (mounted) => {
    setPostLoading(true);
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
      setLocalPosts(ordered);
    }
    return ordered;
  };

  async function getLocalPosts(mounted) {
    const value = JSON.parse(await AsyncStorage.getItem("posts"));
    if (value && value.length > 0) {
      setPosts(value);
      setTimeout(() => {
        setPostLoading(false);
      }, 500);
    } else {
      getPosts(mounted);
    }
  }

  async function setLocalPosts(list) {
    setPosts(list);
    setPostLoading(false);
    await AsyncStorage.setItem("posts", JSON.stringify(list));
  }

  useEffect(
    () => {
      let mounted = true;
      getLocalPosts(mounted);
      return () => (mounted = false);
    },
    // eslint-disable-next-line
    [posts]
  );

  async function toggleCritique(post) {
    await setCritique(post);
    setIsModalVisible(!isModalVisible);
  }

  return (
    <>
      <SafeAreaView style={{ marginBottom: 100, zIndex: 1 }}>
        <ScrollView style={{ zIndex: 1 }}>
          {postLoading ? (
            <ActivityIndicator
              style={{ marginTop: "70%", height: 35 }}
              size="large"
              underlayColor="#f0f0f0"
              color="#e93a50"
            />
          ) : posts.length > 0 ? (
            posts.map((post, i) => {
              return (
                <TouchableHighlight
                  key={i}
                  underlayColor="#f0f0f0"
                  onPress={() => toggleCritique(post)}
                >
                  <FastImage
                    key={post.key}
                    style={{
                      height: 300,
                      width: "90%",
                      margin: 20,
                      borderRadius: 5,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri: post.imageLink,
                      priority: FastImage.priority.normal,
                    }}
                  />
                </TouchableHighlight>
              );
            })
          ) : (
            <View underlayColor="#f0f0f0">
              <Text>There are no posts to display</Text>
            </View>
          )}
        </ScrollView>
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
            <>
              <View
                style={{
                  height: 40,
                  paddingBottom: 2,
                  borderBottomColor: "#d7d7d7",
                  borderBottomWidth: 0.7,
                }}
              >
                <Collapse
                  fill="#f8504d"
                  width={28}
                  style={{ marginLeft: 8 }}
                  onPress={() => toggleCritique({})}
                />
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
                  onPress={() => toggleCritique({})}
                >
                  Critique
                </Text>
              </View>
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: 10,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                {critique ? critique.caption : "A Caption Would Go Here"}
              </Text>
              <Text style={{ marginLeft: 20, fontSize: 11 }}>
                {critique
                  ? Moment(new Date(critique.submitted)).format("MMMM D, YYYY")
                  : null}{" "}
              </Text>
              {critique ? (
                <FastImage
                  key={critique.key}
                  style={{
                    position: "absolute",
                    width: 132,
                    top: 58,
                    right: 20,
                    height: 88,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: critique.imageLink,
                    priority: FastImage.priority.normal,
                  }}
                />
              ) : null}
            </>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};

export default class HomeComponent extends Component {
  render() {
    return (
      <>
        <Header title={"Home"} user={this.props.user} {...this.props} />
        <Posts {...this.props} />
      </>
    );
  }
}
