import React, { Component, useState, useEffect, useRef } from "react";
import Header from "../Components/header";
import ImagePicker from 'react-native-image-picker';
import CameraRoll from "@react-native-community/cameraroll";
import Logo from "../assets/static/upload";
import Arrow from "../assets/static/arrow";
import BackArrow from "../assets/static/back-arrow";
import {
  ActivityIndicator,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableHighlight,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

const PostView = (props) => {
  const [caption, setCaption] = useState("");
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = (p) => {
    console.log(p.node.image.uri);
    setPhoto(p);
  }

  useEffect(() => {
    handleButtonPress();
  });

  const handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then(r => {
        setPhotos(r.edges);
      })
      .catch((err) => {
        //Error Loading Images
      });
  };

  return (
    <>
      <View style={{ display: 'flex', height: 80, marginBottom: 0, marginTop: 0 }}>
        {/* Step One ---------------------------------------------  */}
        {step === 1 ? (<>
          <View style={{ height: 420, textAlign: 'center', margin: 20, marginLeft: 28, flexWrap: 'wrap', alignItems: 'center', display: 'flex', width: "85%" }} >
            <ScrollView style={{ width: "100%" }}>
              {photos ? photos.map((p, i) => {
                return (
                  <TouchableOpacity onPress={() => handleChoosePhoto(p)}>
                    <Image
                      key={i}
                      style={{
                        width: '100%',
                        height: 200,
                        marginBottom: 20,
                        borderWidth:  photo && photo.node.image.uri === p.node.image.uri ? 2 : 0,
                        borderColor: photo && photo.node.image.uri === p.node.image.uri ? '#FBC02D' : 'none'
                      }}

                      source={{ uri: p.node.image.uri }}
                    />
                  </TouchableOpacity>
                );
              }) : null}
            </ScrollView>
          </View>
          <TextInput
            style={{
              height: 40,
              marginTop: 260,
              marginLeft: 28,
              borderColor: 'lightgray',
              borderWidth: 1,
              borderRadius: 6,
              width: "85%",
              backgroundColor: 'white',
              padding: 10
            }}
            placeholder={"Caption"}
            onChangeText={text => { setCaption(text); }}
            value={caption}
          /></>) :
          <View style={{ textAlign: 'center', margin: 20, marginLeft: 28, flexWrap: 'wrap', alignItems: 'center', display: 'flex', width: "85%" }} >
            <Text>Step 2</Text>
          </View>}
        {/* Step One ---------------------------------------------  */}
        <TouchableOpacity
          style={{
            backgroundColor:
              photo === null
                ? "#8e8e8e"
                : "#FBC02D",
            marginLeft: "auto",
            marginRight: "auto",
            paddingBottom: 5,
            paddingTop: 10,
            height: 50,
            width: "85%",
            borderRadius: 6,
            position: 'absolute',
            top: 440,
            left: 28,
            display: "flex",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          disabled={photo === null}
          onPress={() => setStep(2)}
          id="submit-account"
        >
          <Text >
            {caption === "" || photo === null ? (
              <Arrow fill="black" style={{ marginTop: 25 }} />
            ) : (
                <Arrow fill="white" style={{ marginTop: 25 }} />
              )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ width: 50, color: 'white', marginTop: 25, position: 'absolute', top: -59, left: 25, fontSize: 20, display: step > 1 ? 'flex' : 'none' }}
          onPress={() => setStep(step === 2 ? 1 : 1)}
        > 
          <BackArrow style={{ marginTop: 45, fontSize: 20 }} fill="white" {...props} onPress={() => handleChoosePhoto()} /> 
        </TouchableOpacity>
      </View>
    </>
  );
}

export default class Post extends Component {
  render() {
    return (
      <>
        <Header title={"Create"} user={this.props.user} {...this.props} />
        <PostView user={this.props.user} {...this.props} />
      </>
    );
  }
}
