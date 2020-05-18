import React, { Component } from "react";
import Moment from "moment";
import Collapse from "../assets/static/collapse";
import {
  useSpring,
  animated as An,
} from "react-spring/native";
import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
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
});

const RateSheet = (props) => {
  const contentProps = useSpring({
    to: async (next, cancel) => {
      await next({
        opacity: props.greetingStatus ? 0 : 1,
        bottom: props.greetingStatus ? 150 : 0,
      });
    },
    from: {
      opacity: 0,
      position: "absolute",
      left: 0,
      zIndex: 501298,
      right: 0,
      backgroundColor: "white",
      height: 650,
      bottom: -650,
      opacity:0,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <An.View style={contentProps}>
          <TouchableHighlight
            underlayColor="white"
            style={styles.button}
            onPress={() => {
              // props.togglePost({});
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
            {props.ratePost ? props.ratePost.caption : "A Caption Would Go Here"}
          </Text>
          <Text style={{ marginLeft: 20, fontSize: 11 }}>
            {props.ratePost
              ? Moment(new Date(props.ratePost.submitted)).format("MMMM D, YYYY")
              : null}{" "}
          </Text>
          {props.ratePost ? (
            <Image
              style={{
                position: "absolute",
                width: 132,
                top: 58,
                right: 20,
                height: 88,
              }}
              source={{
                uri: props.ratePost.imageLink,
              }}
            />
          ) : null}
        </An.View>
      </View>
    </>
  );
};

export default class RateSheetComponent extends Component {
  render() {
    return (
      <>
        <RateSheet {...this.props} />
      </>
    );
  }
}
