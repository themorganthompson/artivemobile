import * as React from "react";
import Svg, { Path } from "react-native-svg";

function collapse(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={props.fill}
      width="48px"
      height="48px"
      {...props}
    >
      <Path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      <Path d="M0 0h24v24H0z" fill="none" />
    </Svg>
  );
}
export default collapse;
