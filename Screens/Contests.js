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
  ActionSheetIOS,
} from "react-native";

const Contests = (props) => {
  const [loading, setLoading] = useState(false);
  const [contests, setContests] = useState([]);

  const getContests = async (mounted) => {
    let contestz = [];
    let ordered = [];
    await firebase
      .database()
      .ref("contests/")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          console.log(snapshot.val());
          contestz.push(snapshot.val());
          let keys = Object.keys(contestz[0]);
          let result = Object.keys(contestz[0]).map(function(key) {
            return [Number(key), contestz[0][key]];
          });
          result.forEach(function(child, i) {
            ordered.push({
              index: i,
              key: keys[i],
              endDate: child[1].endDate,
              title: child[1].title,
              coverImage: child[1].coverImage,
              category: child[1].category,
              description: child[1].description,
              details: child[1].details,
            });
          });
          setLoading(false);
        }
      });

    if (mounted) {
      setContests(ordered);
    }
    return ordered;
  };

  // const onShare = async () => {
  //   ActionSheetIOS.showActionSheetWithOptions(
  //     {
  //       options: ["Cancel", "Do Somethinggit ", "Reset"],
  //       destructiveButtonIndex: 2,
  //       cancelButtonIndex: 0,
  //     },
  //     (buttonIndex) => {
  //       if (buttonIndex === 0) {
  //         // cancel action
  //       } else if (buttonIndex === 1) {
  //         setResult(Math.floor(Math.random() * 100) + 1);
  //       } else if (buttonIndex === 2) {
  //         setResult("🔮");
  //       }
  //     }
  //   );
  // };

  useEffect(
    () => {
      let mounted = true;
      getContests(mounted);
      return () => (mounted = false);
    },
    // eslint-disable-next-line
    [contests]
  );

  return (
    <SafeAreaView style={{ marginBottom: 110 }}>
      <ScrollView>
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: "80%" }}
            size="large"
            color="#e93a50"
          />
        ) : contests.length > 0 ? (
          contests.map((post, i) => {
            return (
              <TouchableHighlight
                onPress={onShare}
                underlayColor="white"
                style={{ backgroundColor: "white" }}
              >
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
                    uri: contest.coverImage,
                  }}
                />
              </TouchableHighlight>
            );
          })
        ) : (
          <Text style={{margin: 25}}>There are no contests to display</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default class ContestsComponent extends Component {
  render() {
    return (
      <>
        <Header title={"Contests"} />
        {/* <Contests /> */}
      </>
    );
  }
}
