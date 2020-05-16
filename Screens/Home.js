import React, { Component, useState, useEffect } from "react";
import Header from "../Components/header";
import firebase from "../firebase/firebase";
import {
  ActivityIndicator,
  Text,
  Image,
  SafeAreaView,
  Share,
  ScrollView,
  TouchableHighlight,
  ActionSheetIOS
} from "react-native";

const Posts = (props) => {
  let postz = [];
  let ordered = [];
  const [posts, setPosts] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  const onShare = async () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Do Something", "Reset"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          setResult(Math.floor(Math.random() * 100) + 1);
        } else if (buttonIndex === 2) {
          setResult("🔮");
        }
      }
    );
  };

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

  return (
    <SafeAreaView style={{ marginBottom: 110 }}>
      <ScrollView>
        {postLoading ? (
          <ActivityIndicator
            style={{ marginTop: "80%" }}
            size="large"
            color="#e93a50"
          />
        ) : posts.length > 0 ? (
          posts.map((post, i) => {
            return (
              <TouchableHighlight onPress={onShare} underlayColor="white" style={{backgroundColor: "white"}}>
                <Image
                  key={post.key}
                  onp={onShare}
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
