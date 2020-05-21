import React, { Component, useState, useEffect, useRef } from "react";
import Header from "../Components/header";
import Moment from "moment";
import firebase from "../firebase/firebase";
import RateSheetComponent from "./RateSheet";
import { AirbnbRating } from 'react-native-ratings';
import FastImage from "react-native-fast-image";
import Collapse from "../assets/static/collapse";
import { Chip } from 'react-native-paper';
import Camera from "../assets/static/camera";
import HeartEmpty from "../assets/static/heart-empty";
import HeartFill from "../assets/static/heart-fill";
import Aperture from "../assets/static/apertureSVG";
import Label from "../assets/static/label";
import Lens from "../assets/static/lens";
import Check from "../assets/static/check";
import Modal from "react-native-modal";
import {
  ActivityIndicator,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TouchableHighlight,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AlignCenter } from "react-feather";

const Posts = (props) => {
  let postz = [];
  const [rating, setRating] = useState(0);
  const [alreadyCritiqued, setAlreadyCritiqued] = useState(false);
  let ordered = [];
  let chips = [
    "Lighting",
    "Color",
    "Composition",
    "Emotion",
    "Focus",
    "Concept",
    "Crop",
    "Perspective"];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [critique, setCritique] = useState({});
  const [postLoading, setPostLoading] = useState(true);
  const [chipsTouched, setChipsTouched] = useState([]);

  const selectChip = (chip) => {
    chipsTouched.push(chip);
    setChipsTouched(chipsTouched);
  }

  const deSelectChip = (chip) => {
    setChipsTouched(chipsTouched.filter(e => e !== chip));
  }

  const getPosts = async (mounted) => {
    setPostLoading(true);
    await firebase
      .database()
      .ref("posts/")
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          postz.push(snapshot.val());
          let keys = Object.keys(postz[0]);
          var result = Object.keys(postz[0]).map(function (key) {
            return [Number(key), postz[0][key]];
          });
          result.forEach(function (child, i) {
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
              author: child[1].author,
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

  async function submitCritique() {
    if (props.user) {
      var ref = firebase.database().ref("post-critiques/");
      ref.push({
        uid: props.user.uid,
        post: critique.key,
        Perspective: chipsTouched.filter(c => c === 'Perspective').length > 0 ? 1 : 0,
        Composition: chipsTouched.filter(c => c === 'Composition').length > 0 ? 1 : 0,
        Concept: chipsTouched.filter(c => c === 'Concept').length > 0 ? 1 : 0,
        Crop: chipsTouched.filter(c => c === 'Crop').length > 0 ? 1 : 0,
        Emotion: chipsTouched.filter(c => c === 'Emotion').length > 0 ? 1 : 0,
        Focus: chipsTouched.filter(c => c === 'Focus').length > 0 ? 1 : 0,
        Lighting: chipsTouched.filter(c => c === 'Lighting').length > 0 ? 1 : 0,
        Rating: rating,
        submitted: Moment().format('YYYY-MM-DD hh:mm:ss a')
      }).then(() => {
        setChipsTouched([]);
        setCritique({});
        setRating(0);
        setIsModalVisible(false);
      });
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
    var ref = firebase.database().ref("post-critiques/");
    await setCritique(post);
    if (props.user && !isModalVisible) {
      await ref.orderByChild("post").equalTo(post.key).once("value", (snapshot) => {
        if (snapshot.val()) {
          let critiques = [];
          critiques.push(snapshot.val());
          var critRes = Object.keys(critiques[0]).map(function (key) {
            return [Number(key), critiques[0][key]];
          });
          if (critRes.filter(x => x[1].uid === props.user.uid).length > 0) {
            setAlreadyCritiqued(true);
            return;
          };
        } else {
          return;
        }
      });
     
      setIsModalVisible(!isModalVisible);
      return;
    } else {
      setAlreadyCritiqued(false);
      setIsModalVisible(!isModalVisible);
    }
  }

  const ratingCompleted = (r) => {
    setRating(r);
  }

  const styles = StyleSheet.create({
    button: {
      marginLeft: "auto",
      marginRight: "auto",
      paddingBottom: 5,
      paddingTop: 10,
      height: 45,
      width: "85%",
      borderRadius: 6,
      display: "flex",
      marginTop: 1,
      marginBottom: 20,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <>
      <SafeAreaView style={{ marginBottom: 100, zIndex: 1 }}>
        <ScrollView style={{ zIndex: 1 }}>
          {postLoading ? (
            <ActivityIndicator
              style={{ marginTop: "70%", height: 35 }}
              size="large"
              underlayColor="#f0f0f0"
              color="#FBC02D"
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
              height: !alreadyCritiqued ? 900 : 400,
              backgroundColor: "white",
              width: "100%",
              marginTop: 780,
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
                  fill="#FBC02D"
                  width={28}
                  style={{ marginLeft: 8 }}
                  onPress={() => toggleCritique({})}
                />
                <Text
                  style={{
                    position: "absolute",
                    width: 100,
                    color: "#FBC02D",
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
              <View style={{
                height: 120,
                borderBottomColor: "#d7d7d7",
                borderBottomWidth: !alreadyCritiqued ? 0.7 : 0,
              }}>
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

                <View style={{ marginTop: 8, marginLeft: 20, fontSize: 11, width: 100, height: 20, paddingTop: 2, overflow: "visible" }}>
                  <Text style={{ display: "flex", width: 100, fontSize: 11, paddingBottom: 5, overflow: "visible" }}>
                    <Camera fill={"rgb(142,142,142)"} width={15} />{" "}
                    {critique.camera}
                  </Text>
                </View>
                <View style={{ marginLeft: 20, marginTop: 5, fontSize: 11, width: 100, height: 20, paddingTop: 2 }}>
                  <Text style={{ display: "flex", width: 100, fontSize: 11, paddingBottom: 7 }}>
                    <Lens fill={"rgb(142,142,142)"} width={15} />{" "}
                    {critique.lens}
                  </Text>
                </View>
                <View style={{ marginLeft: 100, marginTop: -43, fontSize: 11, width: 100, height: 20, paddingTop: 2 }}>
                  <Text style={{ display: "flex", width: 100, fontSize: 11, paddingBottom: 7 }}>
                    <Aperture fill={"rgb(142,142,142)"} width={15} />{" "}
                    {critique.aperture}
                  </Text>
                </View>
                <View style={{ marginLeft: 100, marginTop: 3, fontSize: 11, width: 100, height: 20, paddingTop: 2 }}>
                  <Text style={{ display: "flex", width: 100, fontSize: 11, paddingBottom: 7 }}>
                    <Label fill={"rgb(142,142,142)"} width={15} style={{ marginBottom: -7 }} />{" "}
                    {critique.category}
                  </Text>
                </View>
              </View>
              {!alreadyCritiqued ?
                <View style={{ marginTop: 10, marginBottom: 0 }}>
                  <AirbnbRating
                    useNativeDriver={true}
                    count={5}
                    showRating={false}
                    defaultRating={0}
                    size={25}
                    onFinishRating={(count) => ratingCompleted(count)}
                  />
                </View> : null}
              <View style={{ display: 'flex', height: 220, marginBottom: 0, marginTop: 0 }}>
                {!alreadyCritiqued ?
                  <View style={{ margin: 20, marginLeft: 60, flexWrap: 'wrap', alignItems: 'center', display: 'flex' }} >
                    {chips.map(chipy => {
                      return (
                        <Chip mode="outlined"
                          key={chipy}
                          textStyle={{ color: chipsTouched.filter(c => c === chipy).length > 0 ? '#FBC02D' : 'black', fontWeight: chipsTouched.filter(c => c === chipy).length > 0 ? '500' : 'normal' }}
                          style={{
                            margin: 5, height: 35, backgroundColor: 'white',
                            borderColor: chipsTouched.filter(c => c === chipy).length > 0 ? '#FBC02D' : 'rgb(186, 186, 186)', borderWidth: 1.2
                          }} onPress={() => {
                            chipsTouched.filter(c => c === chipy).length > 0 ? deSelectChip(chipy) : selectChip(chipy)
                          }}>{chipy}
                          {chipsTouched.filter(c => c === chipy).length === 0 ?
                            <HeartEmpty
                              fill={'rgb(186, 186, 186)'}
                              width={10} style={{ position: 'relative', marginLeft: 18, width: 15 }} /> :
                            <HeartFill
                              fill={'#FBC02D'}
                              width={10} style={{ position: 'relative', marginLeft: 18, width: 15 }} />}
                        </Chip>
                      )
                    })}
                  </View> : null}
              </View>
              {!alreadyCritiqued ? <TouchableOpacity
                disabled={chipsTouched.length == 0 || rating === 0}
                style={{
                  backgroundColor:
                    chipsTouched.length == 0 || rating === 0
                      ? "#8e8e8e"
                      : "#FBC02D",
                  ...styles.button,
                }}
                id="submit-account"
                onPress={() => submitCritique()}
              >
                <Text style={styles.textstyle}>
                  <Check fill="black" style={{ marginTop: 25 }} width={25} />
                </Text>
              </TouchableOpacity> : null}
              {critique ? (
                <FastImage
                  key={critique.key}
                  style={{
                    position: "absolute",
                    width: 132,
                    top: 55,
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
        <Posts user={this.props.user} {...this.props} />
      </>
    );
  }
}
